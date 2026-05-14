import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { LuFolderOpen } from "react-icons/lu";

interface IfcFileInputProps {
    fileName: string | null;
    loading: boolean;
    onFileSelected: (file: File) => void;
}

const IfcFileInput = ({ fileName, loading, onFileSelected }: IfcFileInputProps) => {
    const { t } = useTranslation();
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        inputRef.current?.click();
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) onFileSelected(file);
        event.target.value = "";
    };

    return (
        <section className="p-4 border-b border-slate-800 space-y-2">
            <input
                ref={inputRef}
                type="file"
                accept=".ifc"
                onChange={handleChange}
                className="hidden"
            />

            <button
                type="button"
                onClick={handleClick}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-md bg-sky-500 hover:bg-sky-400 disabled:bg-slate-600
                    disabled:cursor-not-allowed text-white font-medium text-sm transition-colors"
            >
                <LuFolderOpen className="w-4 h-4" />
                {loading ? t("IfcViewer.Loading") : t("IfcViewer.OpenFile")}
            </button>

            <p className="text-xs text-slate-400 truncate">{fileName ?? t("IfcViewer.NoFileLoaded")}</p>
        </section>
    );
};

export default IfcFileInput;

