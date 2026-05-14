import * as FRAGS from "@thatopen/fragments";

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

const convertNode = (raw: FRAGS.SpatialTreeItem, path: string): IfcTreeNode => {
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

export const buildSpatialTree = async (model: FRAGS.FragmentsModel): Promise<IfcTreeNode> => {
    const raw = await model.getSpatialStructure();
    return convertNode(raw, "root");
};

export const getElementProperties = async (model: FRAGS.FragmentsModel, localId: number): Promise<IfcPropertyMap> => {
    const [data] = await model.getItemsData([localId], {
        attributesDefault: true,
    });

    const result: IfcPropertyMap = {};
    if (!data) return result;

    for (const [key, value] of Object.entries(data)) {
        if (Array.isArray(value)) continue;

        const attr = value as FRAGS.ItemAttribute;
        if (attr && typeof attr === "object" && "value" in attr) {
            const raw = attr.value;
            if (raw === null || raw === undefined) continue;

            if (typeof raw === "object") continue;

            result[key] = raw;
        }
    }

    return result;
};

