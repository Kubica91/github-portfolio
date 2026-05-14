import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { LuChevronDown, LuChevronRight, LuX } from "react-icons/lu";
import { IfcTreeNode } from "../IfcTreeUtils";
import ModelTreeNodeView from "./ModelTreeNodeView";

export interface ModelEntry {
    modelId: string;
    fileName: string;
    tree: IfcTreeNode;
}

interface ModelTreeProps {
    models: ModelEntry[];
    hiddenIds: Map<string, Set<number>>;
    selectedModelId: string | null;
    selectedLocalId: number | null;
    onSelectNode: (modelId: string, node: IfcTreeNode) => void;
    onToggleVisibility: (modelId: string, node: IfcTreeNode) => void;
    onRemoveModel: (modelId: string) => void;
}

const ModelTree = ({
    models,
    hiddenIds,
    selectedModelId,
    selectedLocalId,
    onSelectNode,
    onToggleVisibility,
    onRemoveModel,
}: ModelTreeProps) => {
    const { t } = useTranslation();

    const [expanded, setExpanded] = useState<Set<string>>(new Set());
    const [openModels, setOpenModels] = useState<Set<string>>(new Set());

    useEffect(() => {
        setOpenModels((prev) => {
            const next = new Set(prev);
            for (const m of models) {
                if (!next.has(m.modelId)) next.add(m.modelId);
            }
            const currentIds = new Set(models.map((m) => m.modelId));
            for (const id of next) {
                if (!currentIds.has(id)) next.delete(id);
            }
            return next;
        });

        setExpanded((prev) => {
            const next = new Set(prev);
            for (const m of models) {
                next.add(m.tree.id);
                for (const child of m.tree.children) next.add(child.id);
            }
            return next;
        });
    }, [models]);

    const toggleExpanded = (id: string) => {
        setExpanded((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const toggleModelOpen = (modelId: string) => {
        setOpenModels((prev) => {
            const next = new Set(prev);
            if (next.has(modelId)) next.delete(modelId);
            else next.add(modelId);
            return next;
        });
    };

    return (
        <section className="p-4 border-b border-slate-800 flex flex-col min-h-0 flex-1">
            <h3 className="text-xs uppercase tracking-wider text-slate-500 mb-2">{t("IfcViewer.Tree.Title")}</h3>

            <div className="overflow-y-auto max-h-96 -mx-2">
                {models.length === 0 ? (
                    <p className="text-sm text-slate-500 px-2">{t("IfcViewer.Tree.Empty")}</p>
                ) : (
                    <ul>
                        {models.map((entry) => {
                            const isOpen = openModels.has(entry.modelId);
                            const hidden = hiddenIds.get(entry.modelId) ?? new Set<number>();

                            return (
                                <li key={entry.modelId}>
                                    <div
                                        className="flex items-center gap-1 py-1 pr-2 text-sm font-medium text-slate-200 bg-slate-800/40 rounded"
                                        style={{ paddingLeft: "4px" }}
                                    >
                                        <button
                                            type="button"
                                            onClick={() => toggleModelOpen(entry.modelId)}
                                            className="p-0.5 text-slate-400 hover:text-slate-200"
                                        >
                                            {isOpen ? (
                                                <LuChevronDown className="w-4 h-4" />
                                            ) : (
                                                <LuChevronRight className="w-4 h-4" />
                                            )}
                                        </button>

                                        <span
                                            className="flex-1 truncate"
                                            title={entry.fileName}
                                        >
                                            {entry.fileName}
                                        </span>

                                        <button
                                            type="button"
                                            onClick={() => onRemoveModel(entry.modelId)}
                                            className="p-0.5 text-rose-400 hover:text-rose-200"
                                            title={t("IfcViewer.Tree.RemoveModel") ?? ""}
                                        >
                                            <LuX className="w-4 h-4" />
                                        </button>
                                    </div>

                                    {isOpen && (
                                        <ul>
                                            {entry.tree.children.map((child) => (
                                                <ModelTreeNodeView
                                                    key={child.id}
                                                    modelId={entry.modelId}
                                                    node={child}
                                                    depth={1}
                                                    expanded={expanded}
                                                    toggleExpanded={toggleExpanded}
                                                    hidden={hidden}
                                                    selectedModelId={selectedModelId}
                                                    selectedLocalId={selectedLocalId}
                                                    onSelectNode={onSelectNode}
                                                    onToggleVisibility={onToggleVisibility}
                                                />
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </section>
    );
};

export default ModelTree;

