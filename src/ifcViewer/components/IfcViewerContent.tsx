import { IfcPropertyMap, IfcTreeNode } from "../IfcTreeUtils";
import ElementInfo from "./ElementInfo";
import IfcFileInput from "./IfcFileInput";
import ModelTree from "./ModelTree";
import ToolPanel from "./ToolPanel";

interface IfcViewerContentProps {
    fileName: string | null;
    loading: boolean;
    tree: IfcTreeNode | null;
    hiddenIds: Set<number>;
    clipperActive: boolean;
    selected: {
        localId: number;
        category: string | null;
        properties: IfcPropertyMap;
    } | null;
    onFileSelected: (file: File) => void;
    onToggleClipper: () => void;
    onRemoveClippingPlanes: () => void;
    onResetCamera: () => void;
    onShowAll: () => void;
    onSelectNode: (node: IfcTreeNode) => void;
    onToggleVisibility: (node: IfcTreeNode) => void;
}

const IfcViewerContent = ({
    fileName,
    loading,
    tree,
    hiddenIds,
    clipperActive,
    selected,
    onFileSelected,
    onToggleClipper,
    onRemoveClippingPlanes,
    onResetCamera,
    onShowAll,
    onSelectNode,
    onToggleVisibility,
}: IfcViewerContentProps) => {
    const noModel = tree === null;

    return (
        <div className="w-full h-full flex flex-col bg-slate-900 text-slate-100 overflow-y-auto">
            <IfcFileInput
                fileName={fileName}
                loading={loading}
                onFileSelected={onFileSelected}
            />

            <ToolPanel
                disabled={noModel}
                clipperActive={clipperActive}
                onToggleClipper={onToggleClipper}
                onRemoveClippingPlanes={onRemoveClippingPlanes}
                onResetCamera={onResetCamera}
                onShowAll={onShowAll}
            />

            <ModelTree
                tree={tree}
                hiddenIds={hiddenIds}
                selectedId={selected?.localId ?? null}
                onSelectNode={onSelectNode}
                onToggleVisibility={onToggleVisibility}
            />

            <ElementInfo selected={selected} />
        </div>
    );
};

export default IfcViewerContent;

