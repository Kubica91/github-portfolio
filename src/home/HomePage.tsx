import { LuCode, LuGamepad2, LuUser } from "react-icons/lu";
import HomeCard from "./components/HomeCard";

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
