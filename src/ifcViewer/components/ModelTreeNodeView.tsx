import { LuChevronDown, LuChevronRight, LuEye, LuEyeOff } from "react-icons/lu";
import { IfcTreeNode } from "../IfcTreeUtils";

interface ModelTreeNodeViewProps {
    modelId: string;
    node: IfcTreeNode;
    depth: number;
    expanded: Set<string>;
    toggleExpanded: (id: string) => void;
    hidden: Set<number>;
    selectedModelId: string | null;
    selectedLocalId: number | null;
    onSelectNode: (modelId: string, node: IfcTreeNode) => void;
    onToggleVisibility: (modelId: string, node: IfcTreeNode) => void;
}

const ModelTreeNodeView = ({
    modelId,
    node,
    depth,
    expanded,
    toggleExpanded,
    hidden,
    selectedModelId,
    selectedLocalId,
    onSelectNode,
    onToggleVisibility,
}: ModelTreeNodeViewProps) => {
    const isNodeHidden = (node: IfcTreeNode, hidden: Set<number>) => {
        if (node.expressIDs.length === 0) return false;
        return node.expressIDs.every((id) => hidden.has(id));
    };

    const hasChildren = node.children.length > 0;
    const isOpen = expanded.has(node.id);
    const isHidden = isNodeHidden(node, hidden);
    const isSelected = selectedModelId === modelId && selectedLocalId !== null && node.localId === selectedLocalId;

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
                    onClick={() => onSelectNode(modelId, node)}
                    className={`flex-1 text-left truncate ${isHidden ? "text-slate-500 line-through" : ""}`}
                    title={node.label}
                >
                    {node.label}
                </button>

                <button
                    type="button"
                    onClick={() => onToggleVisibility(modelId, node)}
                    className="p-0.5 text-slate-400 hover:text-slate-200"
                >
                    {isHidden ? <LuEyeOff className="w-4 h-4" /> : <LuEye className="w-4 h-4" />}
                </button>
            </div>

            {hasChildren && isOpen && (
                <ul>
                    {node.children.map((child) => (
                        <ModelTreeNodeView
                            key={child.id}
                            modelId={modelId}
                            node={child}
                            depth={depth + 1}
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
};

export default ModelTreeNodeView;
