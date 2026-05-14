interface SkillCategoryProps {
    title: string;
    skills: string[];
    color: string;
}

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
    blue: { bg: "bg-blue-900/30", text: "text-blue-300", border: "border-blue-700/50" },
    green: { bg: "bg-emerald-900/30", text: "text-emerald-300", border: "border-emerald-700/50" },
    purple: { bg: "bg-purple-900/30", text: "text-purple-300", border: "border-purple-700/50" },
    orange: { bg: "bg-orange-900/30", text: "text-orange-300", border: "border-orange-700/50" },
    rose: { bg: "bg-rose-900/30", text: "text-rose-300", border: "border-rose-700/50" },
};

const SkillCategory = ({ title, skills, color }: SkillCategoryProps) => {
    const colors = colorMap[color] ?? colorMap.blue;

    return (
        <div className={`rounded-xl border ${colors.border} ${colors.bg} p-4 print:bg-white print:border-gray-200`}>
            <h3 className={`mb-3 text-sm font-bold uppercase tracking-wider ${colors.text} print:text-gray-700`}>{title}</h3>

            <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                    <span
                        key={skill}
                        className={`rounded-full border ${colors.border} bg-slate-800/60 px-3 py-1 text-sm font-medium ${colors.text} print:bg-white
                        print:border-gray-300 print:text-gray-700`}
                    >
                        {skill}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default SkillCategory;

