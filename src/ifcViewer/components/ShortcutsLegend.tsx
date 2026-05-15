import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { LuX } from "react-icons/lu";

interface ShortcutsLegendProps {
    onClose: () => void;
}

const ShortcutsLegend = ({ onClose }: ShortcutsLegendProps) => {
    const { t } = useTranslation();

    useEffect(() => {
        const onKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
        };

        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [onClose]);

    const rows: Array<{ keys: string; label: string }> = [
        { keys: "R", label: t("IfcViewer.Shortcuts.ResetCamera") },
        { keys: "F", label: t("IfcViewer.Shortcuts.FocusAtCursor") },
        { keys: "Esc", label: t("IfcViewer.Shortcuts.ShowAll") },
        { keys: "H", label: t("IfcViewer.Shortcuts.HideAtCursor") },
        { keys: "M", label: t("IfcViewer.Shortcuts.ToggleMeasure") },
        { keys: "C", label: t("IfcViewer.Shortcuts.ToggleColorByCategory") },
        { keys: "Del", label: t("IfcViewer.Shortcuts.Delete") },
        { keys: t("IfcViewer.Shortcuts.RightClickKey"), label: t("IfcViewer.Shortcuts.RightClick") },
        { keys: t("IfcViewer.Shortcuts.RightDragKey"), label: t("IfcViewer.Shortcuts.RightDrag") },
        { keys: t("IfcViewer.Shortcuts.WheelKey"), label: t("IfcViewer.Shortcuts.Wheel") },
    ];

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
            onClick={onClose}
        >
            <div
                className="bg-slate-800 border border-slate-700 rounded-lg shadow-2xl w-full max-w-md mx-4 text-slate-100"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700">
                    <h3 className="text-sm font-semibold">{t("IfcViewer.Shortcuts.Title")}</h3>

                    <button
                        type="button"
                        onClick={onClose}
                        className="p-1 text-slate-400 hover:text-slate-100"
                        aria-label={t("IfcViewer.Shortcuts.Close") ?? ""}
                    >
                        <LuX className="w-4 h-4" />
                    </button>
                </div>

                <ul className="p-4 space-y-2 text-sm">
                    {rows.map((row) => (
                        <li
                            key={row.label}
                            className="flex items-center justify-between gap-4"
                        >
                            <span className="text-slate-300">{row.label}</span>

                            <kbd className="px-2 py-0.5 rounded bg-slate-700 border border-slate-600 text-xs font-mono text-slate-100">
                                {row.keys}
                            </kbd>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ShortcutsLegend;

