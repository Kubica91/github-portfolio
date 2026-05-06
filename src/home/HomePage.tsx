import { useEffect, useRef } from "react";
import { LuCode, LuGamepad2, LuUser } from "react-icons/lu";
import HomeCard from "./components/HomeCard";

const HomePage = () => {
    const cvSection = [
        {
            title: "Životopis",
            link: "/cv",
            icon: <LuUser className="w-8 h-8 text-cyan-400" />,
            desc: "Kompletní přehled zkušeností, vzdělání a technologií, se kterými pracuji.",
        },
    ];

    const unityGames = [
        {
            title: "Find a Coin",
            link: "/unity/findacoin",
            icon: <LuGamepad2 className="w-8 h-8 text-purple-400" />,
            desc: "Hra Find a Coin vytvořená v Unity. Zahrajte si přímo v prohlížeči.",
        },
        {
            title: "Deff The Base",
            link: "/unity/deffthebase",
            icon: <LuGamepad2 className="w-8 h-8 text-green-400" />,
            desc: "Hra Deff The Base vytvořená v Unity. Zahrajte si přímo v prohlížeči.",
        },
        {
            title: "Hide and Seek",
            link: "/unity/hideandseek",
            icon: <LuGamepad2 className="w-8 h-8 text-red-400" />,
            desc: "Hra Hide and Seek vytvořená v Unity. Zahrajte si přímo v prohlížeči.",
        },
        {
            title: "Pružina",
            link: "/unity/pruzina",
            icon: <LuGamepad2 className="w-8 h-8 text-blue-400" />,
            desc: "Hra Pružina vytvořená v Unity. Zahrajte si přímo v prohlížeči.",
        },
    ];

    const threeJsGames = [
        {
            title: "Šachy 3D (Three.js)",
            link: "/threejs/sachy",
            icon: <LuCode className="w-8 h-8 text-yellow-400" />,
            desc: "3D šachy v prohlížeči s využitím Three.js.",
        },
    ];

    // refs for scrollable sections
    const cvRef = useRef<HTMLDivElement>(null);
    const unityRef = useRef<HTMLDivElement>(null);
    const threeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const last = localStorage.getItem("lastHomePageSection");
        if (last) {
            if (last.startsWith("/cv") && cvRef.current) {
                cvRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
            } else if (last.startsWith("/unity") && unityRef.current) {
                unityRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
            } else if (last.startsWith("/threejs") && threeRef.current) {
                threeRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
            }
            localStorage.removeItem("lastHomePageSection");
        }
    }, []);

    return (
        <div className="w-full h-full overflow-auto">
            <div className="max-w-5xl mx-auto px-4 py-10 flex flex-col gap-12 justify-items-center overflow-auto">
                <h1 className="text-5xl font-extrabold text-center">Vítejte na mém portfoliu</h1>

                <p className="text-slate-400 text-lg text-center">
                    Jsem full-stack developer se zaměřením na 3D aplikace a vizualizace.
                    <br />
                    Pracuji s technologiemi jako Unity, Three.js, React a .NET.
                    <br />
                    Mám zkušenosti s vývojem her, webových aplikací, zpracováním komplexních dat (např. IFC modely) i AR/VR.
                    <br />
                    <br />
                    Níže najdete ukázky mých projektů a odkaz na životopis.
                </p>

                <div className="flex flex-col gap-8">
                    <div ref={cvRef}>
                        <h2 className="text-2xl font-bold mb-4 text-cyan-400 text-center">Životopis</h2>
                        <div className="flex flex-wrap justify-center gap-6 pt-2 overflow-x-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
                            {cvSection.map((section) => (
                                <HomeCard
                                    key={section.link}
                                    title={section.title}
                                    link={section.link}
                                    icon={section.icon}
                                    desc={section.desc}
                                    widthClass="w-80"
                                />
                            ))}
                        </div>
                    </div>

                    <div ref={unityRef}>
                        <h2 className="text-2xl font-bold mb-4 text-purple-400 text-center">Unity Hry</h2>
                        <div className="flex flex-wrap justify-center gap-6 pt-2 overflow-x-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
                            {unityGames.map((section) => (
                                <HomeCard
                                    key={section.link}
                                    title={section.title}
                                    link={section.link}
                                    icon={section.icon}
                                    desc={section.desc}
                                    widthClass="w-80"
                                />
                            ))}
                        </div>
                    </div>

                    <div ref={threeRef}>
                        <h2 className="text-2xl font-bold mb-4 text-yellow-400 text-center">Three.js Projekty</h2>
                        <div className="flex flex-wrap justify-center gap-6 pt-2 overflow-x-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
                            {threeJsGames.map((section) => (
                                <HomeCard
                                    key={section.link}
                                    title={section.title}
                                    link={section.link}
                                    icon={section.icon}
                                    desc={section.desc}
                                    widthClass="w-80"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
