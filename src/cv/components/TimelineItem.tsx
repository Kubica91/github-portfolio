interface TimelineItemProps {
    period: string;
    title: string;
    subtitle: string;
    children: React.ReactNode;
}

const TimelineItem = ({ period, title, subtitle, children }: TimelineItemProps) => (
    <div className="relative pl-8 before:absolute before:left-[7px] before:top-2 before:h-full before:w-px before:bg-blue-200">
        <div className="absolute left-0 top-2 h-4 w-4 rounded-full border-[3px] border-blue-600 bg-white" />

        <span className="mb-1 inline-block rounded-full bg-blue-100 px-3 py-0.5 text-xs font-semibold text-blue-700">{period}</span>

        <h3 className="mt-1 text-lg font-bold text-gray-900">{title}</h3>

        <p className="text-sm text-gray-500">{subtitle}</p>

        <div className="mt-3">{children}</div>
    </div>
);

export default TimelineItem;
