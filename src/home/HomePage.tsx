import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { LuCode, LuGamepad2, LuUser } from "react-icons/lu";
import usePersistentScroll from "../hooks/usePersistentScroll";
import HomeCard from "./components/HomeCard";

const HomePage = () => {
    const { t } = useTranslation();

    const cvSection = [
        {
            title: t("Nav.CV"),
            link: "/github-portfolio/cv",
            icon: <LuUser className="w-8 h-8 text-cyan-400" />,
            desc: t("Home.CVDesc"),
        },
    ];

    const unityGames = [
        {
            title: "Find a Coin",
            link: "/github-portfolio/unity/findacoin",
            icon: <LuGamepad2 className="w-8 h-8 text-purple-400" />,
            desc: t("Home.FindACoinDesc"),
        },
        {
            title: "Deff The Base",
            link: "/github-portfolio/unity/deffthebase",
            icon: <LuGamepad2 className="w-8 h-8 text-green-400" />,
            desc: t("Home.DeffTheBaseDesc"),
        },
        {
            title: "Hide and Seek",
            link: "/github-portfolio/unity/hideandseek",
            icon: <LuGamepad2 className="w-8 h-8 text-red-400" />,
            desc: t("Home.HideAndSeekDesc"),
        },
        {
            title: "Jumping Jello",
            link: "/github-portfolio/unity/jumpingjello",
            icon: <LuGamepad2 className="w-8 h-8 text-blue-400" />,
            desc: t("Home.JumpingJelloDesc"),
        },
    ];

    const threeJsGames = [
        {
            title: t("Home.Chess3DTitle"),
            link: "/github-portfolio/threejs/sachy",
            icon: <LuCode className="w-8 h-8 text-yellow-400" />,
            desc: t("Home.Chess3DDesc"),
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
                        {t("Home.Subtitle")}
                    </p>
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">Jakub Petráň</h1>
                    <p className="text-slate-400 text-lg leading-relaxed">
                        {t("Home.Desc")}
                    </p>
                </div>

                <div className="flex flex-col gap-12">
                    <section>
                        <h2 className="text-xl font-bold mb-5 text-purple-400 flex items-center gap-2">
                            <LuGamepad2 className="w-5 h-5" />
                            {t("Home.SectionUnity")}
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
                            {t("Home.SectionThreeJs")}
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
                            {t("Nav.CV")}
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
