import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { LuChevronDown, LuChevronRight, LuEye, LuEyeOff } from "react-icons/lu";
import { IfcTreeNode } from "../IfcTreeUtils";

interface ModelTreeProps {
    tree: IfcTreeNode | null;
    hiddenIds: Set<number>;
    selectedId: number | null;
    onSelectNode: (node: IfcTreeNode) => void;
    onToggleVisibility: (node: IfcTreeNode) => void;
}

interface TreeNodeViewProps {
    node: IfcTreeNode;
    depth: number;
    expanded: Set<string>;
    toggleExpanded: (id: string) => void;
    hiddenIds: Set<number>;
    selectedId: number | null;
    onSelectNode: (node: IfcTreeNode) => void;
    onToggleVisibility: (node: IfcTreeNode) => void;
}

const isNodeHidden = (node: IfcTreeNode, hiddenIds: Set<number>) => {
    if (node.expressIDs.length === 0) return false;

    return node.expressIDs.every((id) => hiddenIds.has(id));
};

const TreeNodeView = ({
    node,
    depth,
    expanded,
    toggleExpanded,
    hiddenIds,
    selectedId,
    onSelectNode,
    onToggleVisibility,
}: TreeNodeViewProps) => {
    const hasChildren = node.children.length > 0;
    const isOpen = expanded.has(node.id);
    const hidden = isNodeHidden(node, hiddenIds);
    const isSelected = selectedId !== null && node.localId === selectedId;

    return (
        <li>
            <div
                className={`flex items-center gap-1 py-1 pr-2 text-sm hover:bg-slate-800/60 rounded ${isSelected ? "bg-sky-900/60 text-sky-200" : ""}`}
                style={{ paddingLeft: `${depth * 12 + 4}px` }}
            >
                <button
                    type="button"
                    onClick={() => toggleExpanded(node.id)}
                    className={`p-0.5 text-slate-400 hover:text-slate-200 ${hasChildren ? "" : "invisible"}`}
                >
                    {isOpen ? <LuChevronDown className="w-4 h-4" /> : <LuChevronRight className="w-4 h-4" />}
                </button>

                <button
                    type="button"
                    onClick={() => onSelectNode(node)}
                    className={`flex-1 text-left truncate ${hidden ? "text-slate-500 line-through" : ""}`}
                    title={node.label}
                >
                    {node.label}
                </button>

                <button
                    type="button"
                    onClick={() => onToggleVisibility(node)}
                    className="p-0.5 text-slate-400 hover:text-slate-200"
                >
                    {hidden ? <LuEyeOff className="w-4 h-4" /> : <LuEye className="w-4 h-4" />}
                </button>
            </div>

            {hasChildren && isOpen && (
                <ul>
                    {node.children.map((child) => (
                        <TreeNodeView
                            key={child.id}
                            node={child}
                            depth={depth + 1}
                            expanded={expanded}
                            toggleExpanded={toggleExpanded}
                            hiddenIds={hiddenIds}
                            selectedId={selectedId}
                            onSelectNode={onSelectNode}
                            onToggleVisibility={onToggleVisibility}
                        />
                    ))}
                </ul>
            )}
        </li>
    );
};

const ModelTree = ({ tree, hiddenIds, selectedId, onSelectNode, onToggleVisibility }: ModelTreeProps) => {
    const { t } = useTranslation();

    const initiallyExpanded = useMemo(() => {
        const set = new Set<string>();
        if (tree) {
            set.add(tree.id);
            for (const child of tree.children) set.add(child.id);
        }
        return set;
    }, [tree]);

    const [expanded, setExpanded] = useState<Set<string>>(initiallyExpanded);

    const toggleExpanded = (id: string) => {
        setExpanded((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    return (
        <section className="p-4 border-b border-slate-800 flex flex-col min-h-0 flex-1">
            <h3 className="text-xs uppercase tracking-wider text-slate-500 mb-2">{t("IfcViewer.Tree.Title")}</h3>

            <div className="overflow-y-auto max-h-96 -mx-2">
                {tree ? (
                    <ul>
                        <TreeNodeView
                            node={tree}
                            depth={0}
                            expanded={expanded}
                            toggleExpanded={toggleExpanded}
                            hiddenIds={hiddenIds}
                            selectedId={selectedId}
                            onSelectNode={onSelectNode}
                            onToggleVisibility={onToggleVisibility}
                        />
                    </ul>
                ) : (
                    <p className="text-sm text-slate-500 px-2">{t("IfcViewer.Tree.Empty")}</p>
                )}
            </div>
        </section>
    );
};

export default ModelTree;

