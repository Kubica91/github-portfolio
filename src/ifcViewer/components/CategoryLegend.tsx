import { useTranslation } from "react-i18next";
import { categoryHexColor } from "../IfcViewerThreeJsUtils";

interface CategoryLegendProps {
    byCategory: Map<string, number>;
}

const CategoryLegend = ({ byCategory }: CategoryLegendProps) => {
    const { t } = useTranslation();

    if (byCategory.size === 0) return null;

    const hexToCss = (hex: number) => `#${hex.toString(16).padStart(6, "0")}`;

    const entries = Array.from(byCategory.entries()).sort((a, b) => b[1] - a[1]);

    return (
        <section className="p-4 border-b border-slate-800">
            <h3 className="text-xs uppercase tracking-wider text-slate-500 mb-2">{t("IfcViewer.Legend.Title")}</h3>

            <ul className="space-y-1 text-sm">
                {entries.map(([category, count]) => (
                    <li
                        key={category}
                        className="flex items-center gap-2"
                    >
                        <span
                            className="w-4 h-4 rounded-sm border border-slate-700 shrink-0"
                            style={{ backgroundColor: hexToCss(categoryHexColor(category)) }}
                        />

                        <span
                            className="flex-1 truncate text-slate-200"
                            title={category}
                        >
                            {category}
                        </span>

                        <span className="text-xs text-slate-500 font-mono">{count}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default CategoryLegend;

