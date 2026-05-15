import { useState } from "react";
import HorizontalSplitter from "../../components/HorizontalSplitter";
import { IfcPropertyMap, IfcTreeNode } from "../IfcTreeUtils";
import { LoadStage } from "../IfcViewerThreeJsUtils";
import { SnapResult } from "../MeasurementSnapUtils";
import CategoryLegend from "./CategoryLegend";
import ElementInfo from "./ElementInfo";
import IfcFileInput from "./IfcFileInput";
import LoadingProgress from "./LoadingProgress";
import ModelTree, { ModelEntry } from "./ModelTree";
import ShortcutsLegend from "./ShortcutsLegend";
import SnapIndicator from "./SnapIndicator";
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
    measureActive: boolean;
    colorByCategory: boolean;
    categoryCounts: Map<string, number>;
    selected: {
        modelId: string;
        localId: number;
        category: string | null;
        properties: IfcPropertyMap;
    } | null;
    snapResult: SnapResult | null;
    onFilesSelected: (files: File[]) => void;
    onToggleMeasure: () => void;
    onClearMeasurements: () => void;
    onToggleColorByCategory: () => void;
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
    measureActive,
    colorByCategory,
    categoryCounts,
    selected,
    snapResult,
    onFilesSelected,
    onToggleMeasure,
    onClearMeasurements,
    onToggleColorByCategory,
    onResetCamera,
    onShowAll,
    onRemoveAllModels,
    onRemoveModel,
    onSelectNode,
    onToggleVisibility,
}: IfcViewerContentProps) => {
    const [showShortcuts, setShowShortcuts] = useState(false);

    const noModel = models.length === 0;
    const loading = progress !== null;

    return (
        <>
            <HorizontalSplitter
                startWidth={45}
                minWidth={25}
                maxWidth={75}
            >
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
                        measureActive={measureActive}
                        colorByCategory={colorByCategory}
                        onToggleMeasure={onToggleMeasure}
                        onClearMeasurements={onClearMeasurements}
                        onToggleColorByCategory={onToggleColorByCategory}
                        onResetCamera={onResetCamera}
                        onShowAll={onShowAll}
                        onRemoveAllModels={onRemoveAllModels}
                        onShowShortcuts={() => setShowShortcuts(true)}
                    />

                    {colorByCategory && <CategoryLegend byCategory={categoryCounts} />}
                </div>

                <div className="w-full h-full flex flex-col bg-slate-900 text-slate-100 overflow-y-auto">
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
            </HorizontalSplitter>

            {showShortcuts && <ShortcutsLegend onClose={() => setShowShortcuts(false)} />}

            {measureActive && <SnapIndicator snap={snapResult} />}
        </>
    );
};

export default IfcViewerContent;

