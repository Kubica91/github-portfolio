import { useTranslation } from "react-i18next";
import { LoadStage } from "../IfcViewerThreeJsUtils";

interface LoadingProgressProps {
    current: number;
    total: number;
    fileName: string;
    progress: number;
    stage: LoadStage | null;
}

const LoadingProgress = ({ current, total, fileName, progress, stage }: LoadingProgressProps) => {
    const { t } = useTranslation();

    const percent = Math.max(0, Math.min(100, Math.round(progress * 100)));

    return (
        <section className="p-4 border-b border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-300">
                <span className="font-medium">{t("IfcViewer.Progress.Counter", { current, total })}</span>

                <span className="tabular-nums text-slate-400">{percent}%</span>
            </div>

            <p
                className="text-sm text-slate-100 truncate"
                title={fileName}
            >
                {fileName}
            </p>

            <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                <div
                    className="h-full bg-sky-500 transition-[width] duration-150 ease-out"
                    style={{ width: `${percent}%` }}
                />
            </div>

            {stage && <p className="text-xs text-slate-400">{t(`IfcViewer.Progress.Stage.${stage}`)}</p>}
        </section>
    );
};

export default LoadingProgress;

