import { useEffect, useRef } from "react";
import { LuCode, LuGamepad2, LuUser } from "react-icons/lu";
import usePersistentScroll from "../hooks/usePersistentScroll";
import HomeCard from "./components/HomeCard";

const HomePage = () => {
    const cvSection = [
        {
            title: "Životopis",
            link: "/github-portfolio/cv",
            icon: <LuUser className="w-8 h-8 text-cyan-400" />,
            desc: "Zkušenosti, vzdělání, certifikace a technologie.",
        },
    ];

    const unityGames = [
        {
            title: "Find a Coin",
            link: "/github-portfolio/unity/findacoin",
            icon: <LuGamepad2 className="w-8 h-8 text-purple-400" />,
            desc: "2D platformer se třemi levely, pixel art grafikou a vlastní hudbou. V každém levelu hráč sbírá 5 mincí.",
        },
        {
            title: "Deff The Base",
            link: "/github-portfolio/unity/deffthebase",
            icon: <LuGamepad2 className="w-8 h-8 text-green-400" />,
            desc: "Mobilní tower defense pro Android a iOS. Hráč brání základnu věžemi, zdmi a generátory štítů. Každé desáté kolo přicházejí Bossové.",
        },
        {
            title: "Hide and Seek",
            link: "/github-portfolio/unity/hideandseek",
            icon: <LuGamepad2 className="w-8 h-8 text-red-400" />,
            desc: "PC hra na schovávanou s podporou gamepadu. Tma a zorné pole přes shader, lovci a zloději s vlastní AI.",
        },
        {
            title: "Jumping Jello",
            link: "/github-portfolio/unity/jumpingjello",
            icon: <LuGamepad2 className="w-8 h-8 text-blue-400" />,
            desc: "Mobilní 2D platformer s 8 levely, 4 infinity levely, 6 skiny, achievement systémem a vlastními shadery.",
        },
    ];

    const threeJsGames = [
        {
            title: "Šachy 3D (Three.js)",
            link: "/github-portfolio/threejs/sachy",
            icon: <LuCode className="w-8 h-8 text-yellow-400" />,
            desc: "Interaktivní 3D šachové figurky v prohlížeči.",
        },
    ];

    const containerRef = useRef<HTMLDivElement>(null);
    const scroll = usePersistentScroll("homePageScroll", containerRef);

    useEffect(() => {
        if (scroll !== undefined && containerRef.current) {
            containerRef.current.scrollTo({ top: scroll, behavior: "auto" });
        }
    }, [scroll]);

    return (
        <div
            ref={containerRef}
            className="w-full h-full overflow-auto"
        >
            <div className="max-w-5xl mx-auto px-4 py-16 flex flex-col gap-16 justify-items-center">
                <div className="text-center max-w-2xl mx-auto">
                    <p className="text-sm font-medium tracking-widest uppercase text-cyan-400 mb-4">
                        Fullstack Developer & 3D Specialist
                    </p>
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">Jakub Petráň</h1>
                    <p className="text-slate-400 text-lg leading-relaxed">
                        React, .NET, Unity, Three.js. Vyvíjím webové aplikace, 3D vizualizace a hry. Pracuji s CAD/BIM
                        modely, IFC daty a AR/VR.
                    </p>
                </div>

                <div className="flex flex-col gap-12">
                    <section>
                        <h2 className="text-xl font-bold mb-5 text-purple-400 flex items-center gap-2">
                            <LuGamepad2 className="w-5 h-5" />
                            Unity Hry
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {unityGames.map((section) => (
                                <HomeCard
                                    key={section.link}
                                    title={section.title}
                                    link={section.link}
                                    icon={section.icon}
                                    desc={section.desc}
                                />
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold mb-5 text-yellow-400 flex items-center gap-2">
                            <LuCode className="w-5 h-5" />
                            Three.js
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {threeJsGames.map((section) => (
                                <HomeCard
                                    key={section.link}
                                    title={section.title}
                                    link={section.link}
                                    icon={section.icon}
                                    desc={section.desc}
                                />
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold mb-5 text-cyan-400 flex items-center gap-2">
                            <LuUser className="w-5 h-5" />
                            Životopis
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {cvSection.map((section) => (
                                <HomeCard
                                    key={section.link}
                                    title={section.title}
                                    link={section.link}
                                    icon={section.icon}
                                    desc={section.desc}
                                />
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
