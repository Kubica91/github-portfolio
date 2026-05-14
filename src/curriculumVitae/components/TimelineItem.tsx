interface TimelineItemProps {
    period: string;
    title: string;
    subtitle: string;
    children?: React.ReactNode;
}

const TimelineItem = ({ period, title, subtitle, children }: TimelineItemProps) => (
    <div className="flex">
        <div className="flex flex-col items-center mr-4 pt-px">
            <div className="h-4 w-4 rounded-full border-[3px] border-blue-500 bg-slate-800 print:bg-white" />
            <div className="flex-1 w-px bg-blue-700/50 print:bg-blue-200" />
        </div>

        <div className="flex flex-col items-start pb-4">
            <span
                className="mb-1 inline-block rounded-full bg-blue-900/50 px-3 py-0.5 text-xs font-semibold text-blue-300 print:bg-blue-100
                    print:text-blue-700"
            >
                {period}
            </span>

            <h3 className="mt-1 text-lg font-bold text-white print:text-gray-900">{title}</h3>

            <p className="text-sm text-slate-400 print:text-gray-500">{subtitle}</p>

            {children && <div className="mt-3">{children}</div>}
        </div>
    </div>
);

export default TimelineItem;

