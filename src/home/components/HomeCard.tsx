import { useTranslation } from "react-i18next";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

interface HomeCardProps {
    title: string;
    link: string;
    icon: JSX.Element;
    desc: string;
}

const HomeCard = ({ title, link, icon, desc }: HomeCardProps) => {
    const { t } = useTranslation();

    return (
        <Link
            to={link}
            className="group p-6 bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-cyan-500/30 hover:bg-slate-800 transition-all
                flex flex-col"
        >
            <div className="mb-3">{icon}</div>

            <h2 className="text-lg font-bold mb-2 group-hover:text-cyan-400 transition-colors">{title}</h2>

            <p className="text-slate-400 text-sm leading-relaxed flex-1">{desc}</p>

            <div className="mt-4 flex items-center gap-1.5 text-sm text-slate-500 group-hover:text-cyan-400 transition-colors">
                <span>{t("Nav.Show")}</span>
                <FiArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </div>
        </Link>
    );
};

export default HomeCard;
