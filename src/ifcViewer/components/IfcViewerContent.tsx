import { IfcPropertyMap, IfcTreeNode } from "../IfcTreeUtils";
import { LoadStage } from "../IfcViewerThreeJsUtils";
import ElementInfo from "./ElementInfo";
import IfcFileInput from "./IfcFileInput";
import LoadingProgress from "./LoadingProgress";
import ModelTree, { ModelEntry } from "./ModelTree";
import ToolPanel from "./ToolPanel";

interface ProgressState {
    current: number;
    total: number;
    fileName: string;
    progress: number;
    stage: LoadStage | null;
}

interface IfcViewerContentProps {
    progress: ProgressState | null;
    models: ModelEntry[];
    hiddenIds: Map<string, Set<number>>;
    clipperActive: boolean;
    selected: {
        modelId: string;
        localId: number;
        category: string | null;
        properties: IfcPropertyMap;
    } | null;
    onFilesSelected: (files: File[]) => void;
    onToggleClipper: () => void;
    onRemoveClippingPlanes: () => void;
    onResetCamera: () => void;
    onShowAll: () => void;
    onRemoveAllModels: () => void;
    onRemoveModel: (modelId: string) => void;
    onSelectNode: (modelId: string, node: IfcTreeNode) => void;
    onToggleVisibility: (modelId: string, node: IfcTreeNode) => void;
}

const IfcViewerContent = ({
    progress,
    models,
    hiddenIds,
    clipperActive,
    selected,
    onFilesSelected,
    onToggleClipper,
    onRemoveClippingPlanes,
    onResetCamera,
    onShowAll,
    onRemoveAllModels,
    onRemoveModel,
    onSelectNode,
    onToggleVisibility,
}: IfcViewerContentProps) => {
    const noModel = models.length === 0;
    const loading = progress !== null;

    return (
        <div className="w-full h-full flex flex-col bg-slate-900 text-slate-100 overflow-y-auto">
            <IfcFileInput
                loading={loading}
                onFilesSelected={onFilesSelected}
            />

            {progress && (
                <LoadingProgress
                    current={progress.current}
                    total={progress.total}
                    fileName={progress.fileName}
                    progress={progress.progress}
                    stage={progress.stage}
                />
            )}

            <ToolPanel
                disabled={noModel}
                clipperActive={clipperActive}
                onToggleClipper={onToggleClipper}
                onRemoveClippingPlanes={onRemoveClippingPlanes}
                onResetCamera={onResetCamera}
                onShowAll={onShowAll}
                onRemoveAllModels={onRemoveAllModels}
            />

            <ModelTree
                models={models}
                hiddenIds={hiddenIds}
                selectedModelId={selected?.modelId ?? null}
                selectedLocalId={selected?.localId ?? null}
                onSelectNode={onSelectNode}
                onToggleVisibility={onToggleVisibility}
                onRemoveModel={onRemoveModel}
            />

            <ElementInfo selected={selected} />
        </div>
    );
};

export default IfcViewerContent;

