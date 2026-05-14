import { useTranslation } from "react-i18next";
import { LuEye, LuFocus, LuLayers, LuScissorsLineDashed, LuTrash2 } from "react-icons/lu";

interface ToolPanelProps {
    disabled: boolean;
    clipperActive: boolean;
    onToggleClipper: () => void;
    onRemoveClippingPlanes: () => void;
    onResetCamera: () => void;
    onShowAll: () => void;
    onRemoveAllModels: () => void;
}

const ToolPanel = ({
    disabled,
    clipperActive,
    onToggleClipper,
    onRemoveClippingPlanes,
    onResetCamera,
    onShowAll,
    onRemoveAllModels,
}: ToolPanelProps) => {
    const { t } = useTranslation();

    const buttonClass =
        "w-full flex items-center gap-2 py-1.5 px-3 rounded-md text-sm transition-colors disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed";

    return (
        <section className="p-4 border-b border-slate-800 space-y-2">
            <h3 className="text-xs uppercase tracking-wider text-slate-500 mb-2">{t("IfcViewer.Tools.Title")}</h3>

            <button
                type="button"
                disabled={disabled}
                onClick={onToggleClipper}
                className={`${buttonClass}
                    ${clipperActive ? "bg-amber-500 hover:bg-amber-400 text-slate-900" : "bg-slate-700 hover:bg-slate-600 text-slate-100"}`}
            >
                <LuScissorsLineDashed className="w-4 h-4" />
                {t("IfcViewer.Tools.SectionPlane")}
            </button>

            <button
                type="button"
                disabled={disabled}
                onClick={onRemoveClippingPlanes}
                className={`${buttonClass} bg-slate-700 hover:bg-slate-600 text-slate-100`}
            >
                <LuTrash2 className="w-4 h-4" />
                {t("IfcViewer.Tools.RemovePlanes")}
            </button>

            <button
                type="button"
                disabled={disabled}
                onClick={onResetCamera}
                className={`${buttonClass} bg-slate-700 hover:bg-slate-600 text-slate-100`}
            >
                <LuFocus className="w-4 h-4" />
                {t("IfcViewer.Tools.ResetCamera")}
            </button>

            <button
                type="button"
                disabled={disabled}
                onClick={onShowAll}
                className={`${buttonClass} bg-slate-700 hover:bg-slate-600 text-slate-100`}
            >
                <LuEye className="w-4 h-4" />
                {t("IfcViewer.Tools.ShowAll")}
            </button>

            <button
                type="button"
                disabled={disabled}
                onClick={onRemoveAllModels}
                className={`${buttonClass} bg-rose-700 hover:bg-rose-600 text-slate-100`}
            >
                <LuLayers className="w-4 h-4" />
                {t("IfcViewer.Tools.RemoveAllModels")}
            </button>
        </section>
    );
};

export default ToolPanel;

