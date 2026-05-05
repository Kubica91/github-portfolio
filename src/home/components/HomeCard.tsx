import { Link } from "react-router-dom";

interface HomeCardProps {
    title: string;
    link: string;
    icon: JSX.Element;
    desc: string;
}

const HomeCard = ({ title, link, icon, desc }: HomeCardProps) => {
    return (
        <Link
            to={link}
            className="group p-8 bg-slate-800 rounded-2xl border border-slate-700 hover:border-cyan-500/50 transition-all hover:-translate-y-2"
        >
            <div className="mb-4 flex justify-center">{icon}</div>

            <h2 className="text-xl font-bold mb-2 group-hover:text-cyan-400">{title}</h2>

            <p className="text-slate-400 text-sm">{desc}</p>
        </Link>
    );
};

export default HomeCard;
