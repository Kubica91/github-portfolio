interface SkillCategoryProps {
    title: string;
    skills: string[];
    color: string;
}

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
    blue: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
    green: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
    purple: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
    orange: { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200" },
    rose: { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200" },
};

const SkillCategory = ({ title, skills, color }: SkillCategoryProps) => {
    const colors = colorMap[color] ?? colorMap.blue;

    return (
        <div className={`rounded-xl border ${colors.border} ${colors.bg} p-4`}>
            <h3 className={`mb-3 text-sm font-bold uppercase tracking-wider ${colors.text}`}>{title}</h3>

            <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                    <span
                        key={skill}
                        className={`rounded-full border ${colors.border} bg-white px-3 py-1 text-sm font-medium ${colors.text}`}
                    >
                        {skill}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default SkillCategory;
