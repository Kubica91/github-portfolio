import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import HorizontalSplitter from "../components/HorizontalSplitter";
import { buildSpatialTree, getElementProperties, IfcPropertyMap, IfcTreeNode } from "./IfcTreeUtils";
import {
    clearHighlight,
    createClippingPlaneFromMouse,
    disposeIfcViewer,
    fitCameraToAll,
    highlightItems,
    IfcViewerHandle,
    initializeIfcViewer,
    loadIfcModel,
    LoadStage,
    raycastModel,
    removeAllClippingPlanes,
    removeAllModels,
    removeModel,
    setClipperEnabled,
    setItemsVisibility,
    showAll,
} from "./IfcViewerThreeJsUtils";
import IfcViewerContent from "./components/IfcViewerContent";
import { ModelEntry } from "./components/ModelTree";

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

const IfcViewerMainPage = () => {
    const { t } = useTranslation();

    const containerRef = useRef<HTMLDivElement>(null);
    const viewerRef = useRef<IfcViewerHandle | null>(null);
    const clipperActiveRef = useRef(false);
    const draggedRef = useRef(false);
    const mouseDownPosRef = useRef<{ x: number; y: number } | null>(null);

    const [progress, setProgress] = useState<LoadingProgress | null>(null);
    const [models, setModels] = useState<ModelEntry[]>([]);
    const [hiddenIds, setHiddenIds] = useState<Map<string, Set<number>>>(new Map());
    const [clipperActive, setClipperActive] = useState(false);
    const [selected, setSelected] = useState<SelectedElement | null>(null);

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
                        newEntries.push({ modelId: model.modelId, fileName: file.name, tree });
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

    const handleMouseDown = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        mouseDownPosRef.current = { x: event.clientX, y: event.clientY };
        draggedRef.current = false;
    }, []);

    const handleMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        const start = mouseDownPosRef.current;
        if (!start) return;

        const dx = event.clientX - start.x;
        const dy = event.clientY - start.y;

        if (dx * dx + dy * dy > 16) draggedRef.current = true;
    }, []);

    const handleCanvasClick = useCallback(async (event: React.MouseEvent<HTMLDivElement>) => {
        if (draggedRef.current) {
            draggedRef.current = false;
            return;
        }

        if (!viewerRef.current || viewerRef.current.models.size === 0) return;

        if (clipperActiveRef.current) {
            await createClippingPlaneFromMouse(viewerRef.current);
            return;
        }

        const hit = await raycastModel(viewerRef.current, event);
        if (!hit) {
            await clearHighlight(viewerRef.current);
            setSelected(null);
            return;
        }

        await highlightItems(viewerRef.current, hit.modelId, [hit.localId]);

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
    }, []);

    const handleToggleClipper = useCallback(() => {
        if (!viewerRef.current) return;

        const next = !clipperActiveRef.current;
        clipperActiveRef.current = next;

        setClipperEnabled(viewerRef.current, next);
        setClipperActive(next);
    }, []);

    const handleRemoveClippingPlanes = useCallback(() => {
        if (!viewerRef.current) return;
        removeAllClippingPlanes(viewerRef.current);
    }, []);

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

    const handleSelectNode = useCallback(async (modelId: string, node: IfcTreeNode) => {
        if (!viewerRef.current) return;
        const model = viewerRef.current.models.get(modelId);
        if (!model) return;

        if (node.localId === null) {
            await highlightItems(viewerRef.current, modelId, node.expressIDs);
            setSelected(null);
            return;
        }

        await highlightItems(viewerRef.current, modelId, [node.localId]);

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
    }, []);

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

    return (
        <HorizontalSplitter
            startWidth={70}
            minWidth={30}
            maxWidth={90}
            onResize={handleResize}
        >
            <div
                ref={containerRef}
                className="w-full h-full overflow-hidden"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onClick={handleCanvasClick}
            />

            <IfcViewerContent
                progress={progress}
                models={models}
                hiddenIds={hiddenIds}
                clipperActive={clipperActive}
                selected={selected}
                onFilesSelected={handleFilesSelected}
                onToggleClipper={handleToggleClipper}
                onRemoveClippingPlanes={handleRemoveClippingPlanes}
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

