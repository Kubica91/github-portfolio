import * as FRAGS from "@thatopen/fragments";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import HorizontalSplitter from "../components/HorizontalSplitter";
import { buildSpatialTree, getElementProperties, IfcPropertyMap, IfcTreeNode } from "./IfcTreeUtils";
import {
    clearHighlight,
    createClippingPlaneFromMouse,
    disposeIfcViewer,
    fitCameraToModel,
    highlightItems,
    IfcViewerHandle,
    initializeIfcViewer,
    loadIfcModel,
    raycastModel,
    removeAllClippingPlanes,
    setClipperEnabled,
    setItemsVisibility,
    showAll,
} from "./IfcViewerThreeJsUtils";
import IfcViewerContent from "./components/IfcViewerContent";

interface SelectedElement {
    modelId: string;
    localId: number;
    category: string | null;
    properties: IfcPropertyMap;
}

const IfcViewerMainPage = () => {
    const { t } = useTranslation();

    const containerRef = useRef<HTMLDivElement>(null);
    const viewerRef = useRef<IfcViewerHandle | null>(null);
    const activeModelRef = useRef<FRAGS.FragmentsModel | null>(null);
    const clipperActiveRef = useRef(false);
    const draggedRef = useRef(false);
    const mouseDownPosRef = useRef<{ x: number; y: number } | null>(null);

    const [fileName, setFileName] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [tree, setTree] = useState<IfcTreeNode | null>(null);
    const [hiddenIds, setHiddenIds] = useState<Set<number>>(new Set());
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

    const handleFileSelected = useCallback(
        async (file: File) => {
            if (!viewerRef.current) return;

            setLoading(true);
            try {
                if (activeModelRef.current) {
                    viewerRef.current.models.delete(activeModelRef.current.modelId);
                    activeModelRef.current = null;
                }

                const model = await loadIfcModel(viewerRef.current, file);
                activeModelRef.current = model;

                const spatial = await buildSpatialTree(model);

                setTree(spatial);
                setFileName(file.name);
                setHiddenIds(new Set());
                setSelected(null);
            } catch (error) {
                console.error("IFC load failed", error);
                toast.error(t("IfcViewer.LoadError"));
            } finally {
                setLoading(false);
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

        if (!viewerRef.current || !activeModelRef.current) return;

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

        try {
            const properties = await getElementProperties(activeModelRef.current, hit.localId);
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
        if (!viewerRef.current || !activeModelRef.current) return;

        await fitCameraToModel(viewerRef.current, activeModelRef.current);
    }, []);

    const handleShowAll = useCallback(async () => {
        if (!viewerRef.current) return;

        await showAll(viewerRef.current);
        setHiddenIds(new Set());
    }, []);

    const handleSelectNode = useCallback(async (node: IfcTreeNode) => {
        if (!viewerRef.current || !activeModelRef.current) return;
        if (node.localId === null) {
            await highlightItems(viewerRef.current, activeModelRef.current.modelId, node.expressIDs);
            setSelected(null);
            return;
        }

        await highlightItems(viewerRef.current, activeModelRef.current.modelId, [node.localId]);

        try {
            const properties = await getElementProperties(activeModelRef.current, node.localId);
            setSelected({
                modelId: activeModelRef.current.modelId,
                localId: node.localId,
                category: node.category || (typeof properties.category === "string" ? properties.category : null),
                properties,
            });
        } catch (error) {
            console.error("Failed to read element properties", error);
            setSelected({
                modelId: activeModelRef.current.modelId,
                localId: node.localId,
                category: node.category,
                properties: {},
            });
        }
    }, []);

    const handleToggleVisibility = useCallback(
        async (node: IfcTreeNode) => {
            if (!viewerRef.current || !activeModelRef.current) return;
            if (node.expressIDs.length === 0) return;

            const allHidden = node.expressIDs.every((id) => hiddenIds.has(id));
            const visible = allHidden;

            await setItemsVisibility(viewerRef.current, activeModelRef.current.modelId, node.expressIDs, visible);

            setHiddenIds((prev) => {
                const next = new Set(prev);
                if (visible) {
                    for (const id of node.expressIDs) next.delete(id);
                } else {
                    for (const id of node.expressIDs) next.add(id);
                }
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
                fileName={fileName}
                loading={loading}
                tree={tree}
                hiddenIds={hiddenIds}
                clipperActive={clipperActive}
                selected={selected}
                onFileSelected={handleFileSelected}
                onToggleClipper={handleToggleClipper}
                onRemoveClippingPlanes={handleRemoveClippingPlanes}
                onResetCamera={handleResetCamera}
                onShowAll={handleShowAll}
                onSelectNode={handleSelectNode}
                onToggleVisibility={handleToggleVisibility}
            />
        </HorizontalSplitter>
    );
};

export default IfcViewerMainPage;

