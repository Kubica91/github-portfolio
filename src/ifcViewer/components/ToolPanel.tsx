import { useTranslation } from "react-i18next";
import { LuEye, LuFocus, LuKeyboard, LuLayers, LuPalette, LuRuler, LuTrash2 } from "react-icons/lu";

interface ToolPanelProps {
    disabled: boolean;
    measureActive: boolean;
    colorByCategory: boolean;
    onToggleMeasure: () => void;
    onClearMeasurements: () => void;
    onToggleColorByCategory: () => void;
    onResetCamera: () => void;
    onShowAll: () => void;
    onRemoveAllModels: () => void;
    onShowShortcuts: () => void;
}

const ToolPanel = ({
    disabled,
    measureActive,
    colorByCategory,
    onToggleMeasure,
    onClearMeasurements,
    onToggleColorByCategory,
    onResetCamera,
    onShowAll,
    onRemoveAllModels,
    onShowShortcuts,
}: ToolPanelProps) => {
    const { t } = useTranslation();

    const buttonClass =
        "w-full flex items-center justify-between gap-2 py-1.5 px-3 rounded-md text-sm transition-colors disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed";

    const shortcutClass = "text-xs text-slate-400 font-mono";

    const toggleClass = (active: boolean) =>
        active ? "bg-amber-500 hover:bg-amber-400 text-slate-900" : "bg-slate-700 hover:bg-slate-600 text-slate-100";

    return (
        <section className="p-4 border-b border-slate-800 space-y-2">
            <h3 className="text-xs uppercase tracking-wider text-slate-500 mb-2">{t("IfcViewer.Tools.Title")}</h3>

            <button
                type="button"
                disabled={disabled}
                onClick={onToggleMeasure}
                className={`${buttonClass} ${toggleClass(measureActive)}`}
            >
                <span className="flex items-center gap-2">
                    <LuRuler className="w-4 h-4" />
                    {t("IfcViewer.Tools.Measure")}
                </span>

                <span className={shortcutClass}>M</span>
            </button>

            <button
                type="button"
                disabled={disabled}
                onClick={onClearMeasurements}
                className={`${buttonClass} bg-slate-700 hover:bg-slate-600 text-slate-100`}
            >
                <span className="flex items-center gap-2">
                    <LuTrash2 className="w-4 h-4" />
                    {t("IfcViewer.Tools.ClearMeasure")}
                </span>
            </button>

            <button
                type="button"
                disabled={disabled}
                onClick={onToggleColorByCategory}
                className={`${buttonClass} ${toggleClass(colorByCategory)}`}
            >
                <span className="flex items-center gap-2">
                    <LuPalette className="w-4 h-4" />
                    {t("IfcViewer.Tools.ColorByCategory")}
                </span>

                <span className={shortcutClass}>C</span>
            </button>

            <button
                type="button"
                disabled={disabled}
                onClick={onResetCamera}
                className={`${buttonClass} bg-slate-700 hover:bg-slate-600 text-slate-100`}
            >
                <span className="flex items-center gap-2">
                    <LuFocus className="w-4 h-4" />
                    {t("IfcViewer.Tools.ResetCamera")}
                </span>

                <span className={shortcutClass}>R</span>
            </button>

            <button
                type="button"
                disabled={disabled}
                onClick={onShowAll}
                className={`${buttonClass} bg-slate-700 hover:bg-slate-600 text-slate-100`}
            >
                <span className="flex items-center gap-2">
                    <LuEye className="w-4 h-4" />
                    {t("IfcViewer.Tools.ShowAll")}
                </span>

                <span className={shortcutClass}>Esc</span>
            </button>

            <button
                type="button"
                disabled={disabled}
                onClick={onRemoveAllModels}
                className={`${buttonClass} bg-rose-700 hover:bg-rose-600 text-slate-100`}
            >
                <span className="flex items-center gap-2">
                    <LuLayers className="w-4 h-4" />
                    {t("IfcViewer.Tools.RemoveAllModels")}
                </span>
            </button>

            <button
                type="button"
                onClick={onShowShortcuts}
                className={`${buttonClass} bg-slate-700 hover:bg-slate-600 text-slate-100`}
            >
                <span className="flex items-center gap-2">
                    <LuKeyboard className="w-4 h-4" />
                    {t("IfcViewer.Tools.Shortcuts")}
                </span>
            </button>
        </section>
    );
};

export default ToolPanel;

