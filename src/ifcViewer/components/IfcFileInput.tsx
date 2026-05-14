import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { LuFolderOpen } from "react-icons/lu";

interface IfcFileInputProps {
    loading: boolean;
    onFilesSelected: (files: File[]) => void;
}

const IfcFileInput = ({ loading, onFilesSelected }: IfcFileInputProps) => {
    const { t } = useTranslation();
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        inputRef.current?.click();
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) onFilesSelected(Array.from(files));
        event.target.value = "";
    };

    return (
        <section className="p-4 border-b border-slate-800">
            <input
                ref={inputRef}
                type="file"
                accept=".ifc"
                multiple
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
        </section>
    );
};

export default IfcFileInput;

