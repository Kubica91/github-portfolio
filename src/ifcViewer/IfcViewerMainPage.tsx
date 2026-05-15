import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import HorizontalSplitter from "../components/HorizontalSplitter";
import { buildCategoryMap, buildSpatialTree, getElementProperties, IfcPropertyMap, IfcTreeNode } from "./IfcTreeUtils";
import {
    addMeasurePoint,
    applyCategoryColoring,
    cancelMeasureInProgress,
    clearCategoryColoring,
    clearHighlight,
    clearMeasurements,
    ClippingPlaneHit,
    createClippingPlaneFromRaycast,
    deleteClippingPlane,
    disposeIfcViewer,
    fitCameraToAll,
    flipClippingPlane,
    focusOnItem,
    hasClippingPlanes,
    highlightItems,
    highlightSelectionOverBackground,
    IfcViewerHandle,
    initializeIfcViewer,
    loadIfcModel,
    LoadStage,
    raycastClippingPlane,
    raycastModel,
    raycastModelDetailed,
    removeAllClippingPlanes,
    removeAllModels,
    removeModel,
    setItemsVisibility,
    showAll,
    updateMeasurePreview,
} from "./IfcViewerThreeJsUtils";
import ContextMenu, { ContextMenuItem } from "./components/ContextMenu";
import IfcViewerContent from "./components/IfcViewerContent";
import { ModelEntry } from "./components/ModelTree";
import { useIfcKeyboardShortcuts } from "./hooks/useIfcKeyboardShortcuts";
import { useMeasurementSnap } from "./hooks/useMeasurementSnap";

interface SelectedElement {
    modelId: string;
    localId: number;
    category: string | null;
    properties: IfcPropertyMap;
}

interface LoadingProgress {
    current: number;
    total: number;
    fileName: string;
    progress: number;
    stage: LoadStage | null;
}

interface ContextMenuState {
    x: number;
    y: number;
    hit: { modelId: string; localId: number } | null;
    planeHit: ClippingPlaneHit | null;
    hasPlanes: boolean;
}

const DRAG_THRESHOLD_SQ = 16;

const IfcViewerMainPage = () => {
    const { t } = useTranslation();

    const containerRef = useRef<HTMLDivElement>(null);
    const viewerRef = useRef<IfcViewerHandle | null>(null);
    const measureActiveRef = useRef(false);
    const colorByCategoryRef = useRef(false);
    const leftDraggedRef = useRef(false);
    const leftDownPosRef = useRef<{ x: number; y: number } | null>(null);
    const rightDraggedRef = useRef(false);
    const rightDownPosRef = useRef<{ x: number; y: number } | null>(null);
    const lastMousePosRef = useRef<{ x: number; y: number } | null>(null);

    const [progress, setProgress] = useState<LoadingProgress | null>(null);
    const [models, setModels] = useState<ModelEntry[]>([]);
    const [hiddenIds, setHiddenIds] = useState<Map<string, Set<number>>>(new Map());
    const [measureActive, setMeasureActive] = useState(false);
    const [colorByCategory, setColorByCategory] = useState(false);
    const [selected, setSelected] = useState<SelectedElement | null>(null);
    const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null);

    const { snapResult, handleSnapMouseMove, handleSnapMouseLeave, resolveClickPoint } = useMeasurementSnap(
        viewerRef,
        measureActive
    );

    useEffect(() => {
        if (!viewerRef.current) return;
        if (!measureActive || !snapResult) return;
        updateMeasurePreview(viewerRef.current, snapResult.point);
    }, [snapResult, measureActive]);

    const byCategoryByModel = useMemo(() => {
        const map = new Map<string, Map<string, number[]>>();
        for (const m of models) {
            map.set(m.modelId, m.categories);
        }
        return map;
    }, [models]);

    const categoryCounts = useMemo(() => {
        const counts = new Map<string, number>();
        for (const perModel of byCategoryByModel.values()) {
            for (const [category, ids] of perModel) {
                counts.set(category, (counts.get(category) ?? 0) + ids.length);
            }
        }

        return counts;
    }, [byCategoryByModel]);

    useEffect(() => {
        let cancelled = false;
        const init = async () => {
            if (!containerRef.current) return;

            const handle = await initializeIfcViewer(containerRef.current);
            if (cancelled) {
                disposeIfcViewer(handle);
                return;
            }

            viewerRef.current = handle;
        };

        init();

        return () => {
            cancelled = true;

            if (viewerRef.current) {
                disposeIfcViewer(viewerRef.current);
                viewerRef.current = null;
            }
        };
    }, []);

    const handleResize = useCallback(() => {
        if (!viewerRef.current?.world.renderer) return;

        viewerRef.current.world.renderer.resize();
        viewerRef.current.world.camera.updateAspect();
    }, []);

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [handleResize]);

    const restoreCategoryColoring = useCallback(async () => {
        if (!viewerRef.current) return;
        if (!colorByCategoryRef.current) return;

        const byModel = new Map<string, Map<string, number[]>>();
        for (const [modelId, perCategory] of byCategoryByModel) {
            byModel.set(modelId, perCategory);
        }

        await applyCategoryColoring(viewerRef.current, byModel);
    }, [byCategoryByModel]);

    const applySelection = useCallback(async (modelId: string, localIds: number[]) => {
        if (!viewerRef.current) return;

        if (colorByCategoryRef.current) {
            await highlightSelectionOverBackground(viewerRef.current, modelId, localIds);
        } else {
            await highlightItems(viewerRef.current, modelId, localIds);
        }
    }, []);

    const handleFilesSelected = useCallback(
        async (files: File[]) => {
            if (!viewerRef.current) return;

            const total = files.length;

            try {
                const newEntries: ModelEntry[] = [];

                for (let i = 0; i < files.length; i++) {
                    const file = files[i];
                    setProgress({ current: i + 1, total, fileName: file.name, progress: 0, stage: null });

                    try {
                        const model = await loadIfcModel(viewerRef.current, file, (p, stage) => {
                            setProgress({ current: i + 1, total, fileName: file.name, progress: p, stage });
                        });

                        const tree = await buildSpatialTree(model);
                        const categories = await buildCategoryMap(model);

                        newEntries.push({ modelId: model.modelId, fileName: file.name, tree, categories });
                    } catch (error) {
                        console.error(`IFC load failed for ${file.name}`, error);
                        toast.error(t("IfcViewer.LoadError", { name: file.name }));
                    }
                }

                if (newEntries.length > 0) {
                    setModels((prev) => [...prev, ...newEntries]);

                    await fitCameraToAll(viewerRef.current);
                }
            } finally {
                setProgress(null);
            }
        },
        [t]
    );

    useEffect(() => {
        if (!viewerRef.current) return;
        if (!colorByCategoryRef.current) return;

        void restoreCategoryColoring();
    }, [byCategoryByModel, restoreCategoryColoring]);

    const handleMouseDown = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        if (event.button === 0) {
            leftDownPosRef.current = { x: event.clientX, y: event.clientY };
            leftDraggedRef.current = false;

            setContextMenu(null);
        } else if (event.button === 2) {
            rightDownPosRef.current = { x: event.clientX, y: event.clientY };
            rightDraggedRef.current = false;
        }
    }, []);

    const handleMouseMove = useCallback(
        (event: React.MouseEvent<HTMLDivElement>) => {
            lastMousePosRef.current = { x: event.clientX, y: event.clientY };

            const left = leftDownPosRef.current;
            if (left) {
                const dx = event.clientX - left.x;
                const dy = event.clientY - left.y;
                if (dx * dx + dy * dy > DRAG_THRESHOLD_SQ) leftDraggedRef.current = true;
            }

            const right = rightDownPosRef.current;
            if (right) {
                const dx = event.clientX - right.x;
                const dy = event.clientY - right.y;
                if (dx * dx + dy * dy > DRAG_THRESHOLD_SQ) rightDraggedRef.current = true;
            }

            if (measureActiveRef.current) {
                handleSnapMouseMove({ clientX: event.clientX, clientY: event.clientY });
            }
        },
        [handleSnapMouseMove]
    );

    const handleMouseLeave = useCallback(() => {
        handleSnapMouseLeave();
    }, [handleSnapMouseLeave]);

    const handleCanvasClick = useCallback(
        async (event: React.MouseEvent<HTMLDivElement>) => {
            if (leftDraggedRef.current) {
                leftDraggedRef.current = false;
                return;
            }

            if (!viewerRef.current || viewerRef.current.models.size === 0) return;

            if (measureActiveRef.current) {
                const snapped = await resolveClickPoint({ clientX: event.clientX, clientY: event.clientY });
                if (snapped) {
                    addMeasurePoint(viewerRef.current, snapped);
                } else {
                    const hit = await raycastModelDetailed(viewerRef.current, event);
                    if (hit) addMeasurePoint(viewerRef.current, hit.point);
                }
                return;
            }

            const hit = await raycastModel(viewerRef.current, event);
            if (!hit) {
                await clearHighlight(viewerRef.current);

                if (colorByCategoryRef.current) await restoreCategoryColoring();
                setSelected(null);
                return;
            }

            await applySelection(hit.modelId, [hit.localId]);

            const model = viewerRef.current.models.get(hit.modelId);
            if (!model) return;

            try {
                const properties = await getElementProperties(model, hit.localId);
                setSelected({
                    modelId: hit.modelId,
                    localId: hit.localId,
                    category: typeof properties.category === "string" ? properties.category : null,
                    properties,
                });
            } catch (error) {
                console.error("Failed to read element properties", error);
                setSelected({
                    modelId: hit.modelId,
                    localId: hit.localId,
                    category: null,
                    properties: {},
                });
            }
        },
        [applySelection, restoreCategoryColoring, resolveClickPoint]
    );

    const handleToggleMeasure = useCallback(() => {
        if (!viewerRef.current) return;

        const next = !measureActiveRef.current;
        measureActiveRef.current = next;

        if (!next) cancelMeasureInProgress(viewerRef.current);

        setMeasureActive(next);
    }, []);

    const handleClearMeasurements = useCallback(() => {
        if (!viewerRef.current) return;

        clearMeasurements(viewerRef.current);
    }, []);

    const handleToggleColorByCategory = useCallback(async () => {
        if (!viewerRef.current) return;

        const next = !colorByCategoryRef.current;
        colorByCategoryRef.current = next;
        setColorByCategory(next);

        if (next) {
            await applyCategoryColoring(viewerRef.current, byCategoryByModel);
            if (selected) {
                await highlightSelectionOverBackground(viewerRef.current, selected.modelId, [selected.localId]);
            }
        } else {
            await clearCategoryColoring(viewerRef.current);
            if (selected) {
                await highlightItems(viewerRef.current, selected.modelId, [selected.localId]);
            }
        }
    }, [byCategoryByModel, selected]);

    const handleResetCamera = useCallback(async () => {
        if (!viewerRef.current) return;

        await fitCameraToAll(viewerRef.current);
    }, []);

    const handleShowAll = useCallback(async () => {
        if (!viewerRef.current) return;

        await showAll(viewerRef.current);
        setHiddenIds(new Map());
    }, []);

    const handleRemoveAllModels = useCallback(async () => {
        if (!viewerRef.current) return;

        await removeAllModels(viewerRef.current);
        setModels([]);
        setHiddenIds(new Map());
        setSelected(null);
        clearMeasurements(viewerRef.current);
    }, []);

    const handleRemoveModel = useCallback(async (modelId: string) => {
        if (!viewerRef.current) return;

        await removeModel(viewerRef.current, modelId);

        setModels((prev) => prev.filter((m) => m.modelId !== modelId));
        setHiddenIds((prev) => {
            const next = new Map(prev);
            next.delete(modelId);
            return next;
        });
        setSelected((prev) => (prev?.modelId === modelId ? null : prev));
    }, []);

    const handleSelectNode = useCallback(
        async (modelId: string, node: IfcTreeNode) => {
            if (!viewerRef.current) return;
            const model = viewerRef.current.models.get(modelId);
            if (!model) return;

            if (node.localId === null) {
                await applySelection(modelId, node.expressIDs);
                setSelected(null);
                return;
            }

            await applySelection(modelId, [node.localId]);

            try {
                const properties = await getElementProperties(model, node.localId);
                setSelected({
                    modelId,
                    localId: node.localId,
                    category: node.category || (typeof properties.category === "string" ? properties.category : null),
                    properties,
                });
            } catch (error) {
                console.error("Failed to read element properties", error);
                setSelected({
                    modelId,
                    localId: node.localId,
                    category: node.category,
                    properties: {},
                });
            }
        },
        [applySelection]
    );

    const handleToggleVisibility = useCallback(
        async (modelId: string, node: IfcTreeNode) => {
            if (!viewerRef.current) return;
            if (node.expressIDs.length === 0) return;

            const currentSet = hiddenIds.get(modelId) ?? new Set<number>();
            const allHidden = node.expressIDs.every((id) => currentSet.has(id));
            const visible = allHidden;

            await setItemsVisibility(viewerRef.current, modelId, node.expressIDs, visible);

            setHiddenIds((prev) => {
                const next = new Map(prev);
                const set = new Set(next.get(modelId) ?? []);

                if (visible) {
                    for (const id of node.expressIDs) set.delete(id);
                } else {
                    for (const id of node.expressIDs) set.add(id);
                }

                next.set(modelId, set);
                return next;
            });
        },
        [hiddenIds]
    );

    const handleFocusAtCursor = useCallback(async () => {
        if (!viewerRef.current || viewerRef.current.models.size === 0) return;

        const pos = lastMousePosRef.current;
        if (!pos) return;

        const hit = await raycastModel(viewerRef.current, { clientX: pos.x, clientY: pos.y });
        if (!hit) return;

        await focusOnItem(viewerRef.current, hit.modelId, hit.localId);
    }, []);

    const handleHideAtCursor = useCallback(async () => {
        if (!viewerRef.current || viewerRef.current.models.size === 0) return;

        const pos = lastMousePosRef.current;
        if (!pos) return;

        const hit = await raycastModel(viewerRef.current, { clientX: pos.x, clientY: pos.y });
        if (!hit) return;

        await setItemsVisibility(viewerRef.current, hit.modelId, [hit.localId], false);

        setHiddenIds((prev) => {
            const next = new Map(prev);
            const set = new Set(next.get(hit.modelId) ?? []);
            set.add(hit.localId);
            next.set(hit.modelId, set);
            return next;
        });
    }, []);

    const handlePanicClear = useCallback(async () => {
        if (!viewerRef.current) return;

        setContextMenu(null);

        if (measureActiveRef.current) {
            measureActiveRef.current = false;
            setMeasureActive(false);
        }
        cancelMeasureInProgress(viewerRef.current);
        clearMeasurements(viewerRef.current);

        removeAllClippingPlanes(viewerRef.current);

        await clearHighlight(viewerRef.current);
        if (colorByCategoryRef.current) await restoreCategoryColoring();
        setSelected(null);

        await showAll(viewerRef.current);
        setHiddenIds(new Map());
    }, [restoreCategoryColoring]);

    const handleDelete = useCallback(() => {
        if (!viewerRef.current) return;

        if (measureActiveRef.current) {
            clearMeasurements(viewerRef.current);
            return;
        }

        removeAllClippingPlanes(viewerRef.current);
        clearMeasurements(viewerRef.current);
    }, []);

    useIfcKeyboardShortcuts(
        {
            onResetCamera: () => void handleResetCamera(),
            onPanicClear: () => void handlePanicClear(),
            onFocusAtCursor: () => void handleFocusAtCursor(),
            onHideAtCursor: () => void handleHideAtCursor(),
            onToggleMeasure: handleToggleMeasure,
            onToggleColorByCategory: () => void handleToggleColorByCategory(),
            onDelete: handleDelete,
        },
        models.length > 0
    );

    const handleContextMenu = useCallback(async (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();

        if (rightDraggedRef.current) {
            rightDraggedRef.current = false;
            rightDownPosRef.current = null;
            return;
        }
        rightDownPosRef.current = null;

        if (!viewerRef.current || viewerRef.current.models.size === 0) return;

        const planeHit = raycastClippingPlane(viewerRef.current, event);
        const hit = planeHit ? null : await raycastModel(viewerRef.current, event);

        setContextMenu({
            x: event.clientX,
            y: event.clientY,
            hit,
            planeHit,
            hasPlanes: hasClippingPlanes(viewerRef.current),
        });
    }, []);

    const handleAddPlaneAt = useCallback(async (event: { clientX: number; clientY: number }) => {
        if (!viewerRef.current) return;

        await createClippingPlaneFromRaycast(viewerRef.current, event);
    }, []);

    const contextMenuItems = useMemo<ContextMenuItem[]>(() => {
        if (!contextMenu) return [];

        const items: ContextMenuItem[] = [];

        items.push({
            label: t("IfcViewer.ContextMenu.ShowAll"),
            shortcut: "Esc",
            onClick: () => void handlePanicClear(),
            separatorAfter: contextMenu.hit !== null || contextMenu.planeHit !== null || contextMenu.hasPlanes,
        });

        if (contextMenu.hit) {
            const hit = contextMenu.hit;

            items.push({
                label: t("IfcViewer.ContextMenu.FocusOnElement"),
                shortcut: "F",
                onClick: async () => {
                    if (!viewerRef.current) return;

                    await focusOnItem(viewerRef.current, hit.modelId, hit.localId);
                },
            });

            items.push({
                label: t("IfcViewer.ContextMenu.HideElement"),
                shortcut: "H",
                onClick: async () => {
                    if (!viewerRef.current) return;

                    await setItemsVisibility(viewerRef.current, hit.modelId, [hit.localId], false);
                    setHiddenIds((prev) => {
                        const next = new Map(prev);
                        const set = new Set(next.get(hit.modelId) ?? []);
                        set.add(hit.localId);
                        next.set(hit.modelId, set);
                        return next;
                    });
                },
                separatorAfter: true,
            });

            items.push({
                label: t("IfcViewer.ContextMenu.AddPlane"),
                onClick: () => void handleAddPlaneAt({ clientX: contextMenu.x, clientY: contextMenu.y }),
                separatorAfter: contextMenu.hasPlanes,
            });
        }

        if (contextMenu.planeHit) {
            const planeId = contextMenu.planeHit.planeId;

            items.push({
                label: t("IfcViewer.ContextMenu.FlipPlane"),
                onClick: () => {
                    if (!viewerRef.current) return;
                    flipClippingPlane(viewerRef.current, planeId);
                },
            });

            items.push({
                label: t("IfcViewer.ContextMenu.DeletePlane"),
                onClick: () => {
                    if (!viewerRef.current) return;
                    void deleteClippingPlane(viewerRef.current, planeId);
                },
                danger: true,
                separatorAfter: contextMenu.hasPlanes,
            });
        }

        if (contextMenu.hasPlanes) {
            items.push({
                label: t("IfcViewer.ContextMenu.DeleteAllPlanes"),
                onClick: () => {
                    if (!viewerRef.current) return;
                    removeAllClippingPlanes(viewerRef.current);
                },
                danger: true,
            });
        }

        return items;
    }, [contextMenu, t, handlePanicClear, handleAddPlaneAt]);

    return (
        <HorizontalSplitter
            startWidth={55}
            minWidth={25}
            maxWidth={85}
            onResize={handleResize}
        >
            <div
                ref={containerRef}
                className="w-full h-full overflow-hidden relative"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={handleCanvasClick}
                onContextMenu={handleContextMenu}
            >
                {contextMenu && (
                    <ContextMenu
                        x={contextMenu.x}
                        y={contextMenu.y}
                        items={contextMenuItems}
                        onClose={() => setContextMenu(null)}
                    />
                )}
            </div>

            <IfcViewerContent
                progress={progress}
                models={models}
                hiddenIds={hiddenIds}
                measureActive={measureActive}
                colorByCategory={colorByCategory}
                categoryCounts={categoryCounts}
                selected={selected}
                snapResult={snapResult}
                onFilesSelected={handleFilesSelected}
                onToggleMeasure={handleToggleMeasure}
                onClearMeasurements={handleClearMeasurements}
                onToggleColorByCategory={() => void handleToggleColorByCategory()}
                onResetCamera={handleResetCamera}
                onShowAll={handleShowAll}
                onRemoveAllModels={handleRemoveAllModels}
                onRemoveModel={handleRemoveModel}
                onSelectNode={handleSelectNode}
                onToggleVisibility={handleToggleVisibility}
            />
        </HorizontalSplitter>
    );
};

export default IfcViewerMainPage;

