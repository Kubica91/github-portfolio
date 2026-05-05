import { LuCode, LuGamepad2, LuUser } from "react-icons/lu";
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

const HomePage = () => {
    return (
        <div className="w-full h-full max-w-5xl mx-auto px-4 text-center content-center">
            <h1 className="text-5xl font-extrabold mb-4">Ahoj, jsem Game Developer</h1>

            <p className="text-slate-400 text-lg mb-12">Tvořím světy v Unity a oživuji web s Three.js.</p>

            <div className="grid md:grid-cols-3 gap-6">
                <HomeCard
                    title="Můj Životopis"
                    link="/cv"
                    icon={<LuUser className="w-8 h-8 text-cyan-400" />}
                    desc="Zkušenosti, vzdělání a tech stack."
                />

                <HomeCard
                    title="Unity Hry"
                    link="/unity"
                    icon={<LuGamepad2 className="w-8 h-8 text-purple-400" />}
                    desc="Galerie mých her vytvořených v C#."
                />

                <HomeCard
                    title="Three.js"
                    link="/threejs"
                    icon={<LuCode className="w-8 h-8 text-yellow-400" />}
                    desc="3D interaktivní webové aplikace."
                />
            </div>
        </div>
    );
};

export default HomePage;
