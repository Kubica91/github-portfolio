interface SectionTitleProps {
    icon: React.ReactNode;
    title: string;
}

const SectionTitle = ({ icon, title }: SectionTitleProps) => (
    <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-lg text-white">
            {icon}
        </div>

        <h2 className="text-2xl font-bold text-white print:text-gray-900">{title}</h2>

        <div className="ml-2 h-px flex-1 bg-gradient-to-r from-blue-500/40 to-transparent print:from-blue-200" />
    </div>
);

export default SectionTitle;

