import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { LuChevronDown, LuChevronRight, LuSearch, LuX } from "react-icons/lu";
import { collectVisibleNodeIds, IfcTreeNode } from "../IfcTreeUtils";
import ModelTreeNodeView from "./ModelTreeNodeView";

export interface ModelEntry {
    modelId: string;
    fileName: string;
    tree: IfcTreeNode;
    categories: Map<string, number[]>;
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
    const [query, setQuery] = useState("");

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

    const filterPerModel = useMemo(() => {
        if (!query.trim()) return null;

        const map = new Map<string, { visible: Set<string>; expanded: Set<string> }>();
        for (const m of models) {
            map.set(m.modelId, collectVisibleNodeIds(m.tree, query.trim()));
        }

        return map;
    }, [models, query]);

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

            <div className="relative mb-2">
                <LuSearch className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />

                <input
                    type="text"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder={t("IfcViewer.Tree.SearchPlaceholder") ?? ""}
                    className="w-full bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-500 rounded-md py-1.5 pl-8 pr-8 text-sm
                        focus:outline-none focus:border-sky-500"
                />

                {query && (
                    <button
                        type="button"
                        onClick={() => setQuery("")}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-200"
                    >
                        <LuX className="w-4 h-4" />
                    </button>
                )}
            </div>

            <div className="overflow-y-auto -mx-2">
                {models.length === 0 ? (
                    <p className="text-sm text-slate-500 px-2">{t("IfcViewer.Tree.Empty")}</p>
                ) : (
                    <ul>
                        {models.map((entry) => {
                            const isOpen = openModels.has(entry.modelId);
                            const hidden = hiddenIds.get(entry.modelId) ?? new Set<number>();
                            const filter = filterPerModel?.get(entry.modelId) ?? null;

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
                                                    filter={filter}
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

