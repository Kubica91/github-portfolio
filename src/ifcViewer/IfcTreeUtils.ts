import { FragmentsModel, ItemAttribute, SpatialTreeItem } from "@thatopen/fragments";

export interface IfcTreeNode {
    id: string;
    label: string;
    category: string;
    localId: number | null;
    children: IfcTreeNode[];
    expressIDs: number[];
}

export type IfcPropertyMap = Record<string, string | number | boolean | null>;

const formatLabel = (category: string | null, localId: number | null) => {
    if (category && localId !== null) return `${category} (${localId})`;

    if (category) return category;

    if (localId !== null) return `#${localId}`;

    return "?";
};

const convertNode = (raw: SpatialTreeItem, path: string): IfcTreeNode => {
    const id = `${path}/${raw.category ?? "?"}-${raw.localId ?? "n"}`;
    const children = (raw.children ?? []).map((child, index) => convertNode(child, `${id}-${index}`));

    const expressIDs: number[] = [];
    if (raw.localId !== null && raw.localId !== undefined) expressIDs.push(raw.localId);
    for (const child of children) expressIDs.push(...child.expressIDs);

    return {
        id,
        label: formatLabel(raw.category, raw.localId ?? null),
        category: raw.category ?? "",
        localId: raw.localId ?? null,
        children,
        expressIDs,
    };
};

export const buildSpatialTree = async (model: FragmentsModel): Promise<IfcTreeNode> => {
    const raw = await model.getSpatialStructure();
    return convertNode(raw, "root");
};

export const buildCategoryMap = async (model: FragmentsModel): Promise<Map<string, number[]>> => {
    const categories = await model.getCategories();
    const result = new Map<string, number[]>();
    if (categories.length === 0) return result;

    const patterns = categories.map((c) => new RegExp(`^${c.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`));
    const items = await model.getItemsOfCategories(patterns);

    for (const [category, localIds] of Object.entries(items)) {
        if (localIds.length > 0) result.set(category, localIds);
    }
    return result;
};

export const collectByCategory = (node: IfcTreeNode): Map<string, number[]> => {
    const result = new Map<string, number[]>();

    const visit = (n: IfcTreeNode) => {
        if (n.localId !== null && n.category) {
            const list = result.get(n.category) ?? [];
            list.push(n.localId);
            result.set(n.category, list);
        }
        for (const child of n.children) visit(child);
    };

    visit(node);
    return result;
};

export const matchesNode = (node: IfcTreeNode, query: string): boolean => {
    if (!query) return true;

    const q = query.toLowerCase();
    return node.label.toLowerCase().includes(q) || node.category.toLowerCase().includes(q);
};

export interface TreeFilterResult {
    visible: Set<string>;
    expanded: Set<string>;
}

export const collectVisibleNodeIds = (root: IfcTreeNode, query: string): TreeFilterResult => {
    const visible = new Set<string>();
    const expanded = new Set<string>();

    const visit = (node: IfcTreeNode): boolean => {
        const selfMatch = matchesNode(node, query);
        let childMatch = false;

        for (const child of node.children) {
            if (visit(child)) childMatch = true;
        }

        if (selfMatch || childMatch) visible.add(node.id);
        if (childMatch) expanded.add(node.id);

        return selfMatch || childMatch;
    };

    visit(root);
    return { visible, expanded };
};

export const getElementProperties = async (model: FragmentsModel, localId: number): Promise<IfcPropertyMap> => {
    const [data] = await model.getItemsData([localId], {
        attributesDefault: true,
    });

    const result: IfcPropertyMap = {};
    if (!data) return result;

    for (const [key, value] of Object.entries(data)) {
        if (Array.isArray(value)) continue;

        const attr = value as ItemAttribute;
        if (attr && typeof attr === "object" && "value" in attr) {
            const raw = attr.value;
            if (raw === null || raw === undefined) continue;

            if (typeof raw === "object") continue;

            result[key] = raw;
        }
    }

    return result;
};

