import { useEffect, useRef } from "react";
import { Trans, useTranslation } from "react-i18next";
import Img from "../components/Img";
import usePersistentScroll from "../hooks/usePersistentScroll";

const UnityDeffTheBase = () => {
    const { t } = useTranslation();
    const tags = t("DeffTheBase.Tags", { returnObjects: true }) as string[];
    const sounds = t("DeffTheBase.S9Sounds", { returnObjects: true }) as Array<{ label: string; desc: string }>;

    const containerRef = useRef<HTMLDivElement>(null);
    const scroll = usePersistentScroll("deffTheBaseScroll", containerRef);

    useEffect(() => {
        if (scroll !== undefined && containerRef.current) {
            containerRef.current.scrollTo({ top: scroll, behavior: "auto" });
        }
    }, [scroll]);

    return (
        <div
            ref={containerRef}
            className="w-full h-full overflow-auto bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100"
        >
            {/* Hero */}
            <div className="max-w-4xl mx-auto px-6 py-10">
                <h1 className="text-4xl font-extrabold tracking-tight text-white mb-3">Def the Base</h1>
                <p className="text-sm font-medium tracking-wide uppercase text-green-400 mb-4">
                    {t("DeffTheBase.Subtitle")}
                </p>

                <p className="text-slate-300 text-lg leading-relaxed max-w-2xl">
                    <Trans
                        i18nKey="DeffTheBase.Desc"
                        components={{ b: <strong className="text-white" /> }}
                    />
                </p>

                <div className="flex flex-wrap gap-2 mt-6">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="text-xs bg-slate-700/60 border border-slate-600/50 text-slate-300 px-3 py-1 rounded-full"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-10 space-y-14">
                {/* Menu */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-1">{t("DeffTheBase.S1Title")}</h2>

                    <p className="text-slate-300 leading-relaxed mb-5">
                        <Trans
                            i18nKey="DeffTheBase.S1Text"
                            components={{ b: <strong className="text-white" /> }}
                        />
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <Img
                            src="/github-portfolio/images/defTheBase/menu_main.webp"
                            alt={t("DeffTheBase.S1ImgAlt")}
                            className="w-full object-cover"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mt-2 text-center italic">{t("DeffTheBase.S1Caption")}</p>
                </section>

                {/* Missions */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-1">{t("DeffTheBase.S2Title")}</h2>

                    <p className="text-slate-300 leading-relaxed mb-5">
                        <Trans
                            i18nKey="DeffTheBase.S2Text"
                            components={{ b: <strong className="text-white" /> }}
                        />
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <Img
                            src="/github-portfolio/images/defTheBase/menu_missions.webp"
                            alt={t("DeffTheBase.S2ImgAlt")}
                            className="w-full object-cover"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mt-2 text-center italic">{t("DeffTheBase.S2Caption")}</p>
                </section>

                {/* Upgrade */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-1">{t("DeffTheBase.S3Title")}</h2>

                    <p className="text-slate-300 leading-relaxed mb-5">{t("DeffTheBase.S3Text")}</p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <Img
                            src="/github-portfolio/images/defTheBase/upgrade_tree.webp"
                            alt={t("DeffTheBase.S3ImgAlt")}
                            className="w-full object-cover"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mt-2 text-center italic">{t("DeffTheBase.S3Caption")}</p>
                </section>

                {/* Gameplay */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-1">{t("DeffTheBase.S4Title")}</h2>

                    <p className="text-slate-300 leading-relaxed mb-5">
                        <Trans
                            i18nKey="DeffTheBase.S4Text"
                            components={{ b: <strong className="text-white" /> }}
                        />
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <Img
                            src="/github-portfolio/images/defTheBase/gameplay_active.webp"
                            alt={t("DeffTheBase.S4ImgAlt")}
                            className="w-full object-cover"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mt-2 text-center italic">{t("DeffTheBase.S4Caption")}</p>
                </section>

                {/* Animations + Walls */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-1">{t("DeffTheBase.S5Title")}</h2>

                    <p className="text-slate-300 leading-relaxed mb-5">
                        <Trans
                            i18nKey="DeffTheBase.S5Text"
                            components={{ b: <strong className="text-white" /> }}
                        />
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <Img
                            src="/github-portfolio/images/defTheBase/gameplay_build.webp"
                            alt={t("DeffTheBase.S5ImgAlt")}
                            className="w-full object-cover"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mt-2 text-center italic">{t("DeffTheBase.S5Caption")}</p>
                </section>

                {/* Repair all */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-1">{t("DeffTheBase.S6Title")}</h2>

                    <p className="text-slate-300 leading-relaxed mb-5">{t("DeffTheBase.S6Text")}</p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <Img
                            src="/github-portfolio/images/defTheBase/building_management.webp"
                            alt={t("DeffTheBase.S6ImgAlt")}
                            className="w-full object-cover"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mt-2 text-center italic">{t("DeffTheBase.S6Caption")}</p>
                </section>

                {/* Boss wave */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-1">{t("DeffTheBase.S7Title")}</h2>

                    <p className="text-slate-300 leading-relaxed mb-5">
                        <Trans
                            i18nKey="DeffTheBase.S7Text"
                            components={{ b: <strong className="text-white" /> }}
                        />
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <Img
                            src="/github-portfolio/images/defTheBase/boss_wave.webp"
                            alt={t("DeffTheBase.S7ImgAlt")}
                            className="w-full object-cover"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mt-2 text-center italic">{t("DeffTheBase.S7Caption")}</p>
                </section>

                {/* Pause menu */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-1">{t("DeffTheBase.S8Title")}</h2>

                    <p className="text-slate-300 leading-relaxed mb-5">
                        <Trans
                            i18nKey="DeffTheBase.S8Text"
                            components={{ b: <strong className="text-white" /> }}
                        />
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <Img
                            src="/github-portfolio/images/defTheBase/pause_menu.webp"
                            alt={t("DeffTheBase.S8ImgAlt")}
                            className="w-full object-cover"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mt-2 text-center italic">{t("DeffTheBase.S8Caption")}</p>
                </section>

                {/* Audio */}
                <section className="border-t border-slate-700/50 pt-10">
                    <h2 className="text-2xl font-bold text-white mb-2">{t("DeffTheBase.S9Title")}</h2>

                    <p className="text-slate-300 leading-relaxed mb-6">
                        <Trans
                            i18nKey="DeffTheBase.S9Text"
                            components={{ b: <strong className="text-white" /> }}
                        />
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {sounds.map(({ label, desc }) => (
                            <div
                                key={label}
                                className="bg-slate-800/50 border border-slate-700/40 rounded-xl p-3"
                            >
                                <p className="text-white text-sm font-semibold">{label}</p>

                                <p className="text-slate-400 text-xs mt-0.5">{desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Animation detail */}
                <section className="border-t border-slate-700/50 pt-10">
                    <h2 className="text-2xl font-bold text-white mb-2">{t("DeffTheBase.S10Title")}</h2>

                    <p className="text-slate-300 leading-relaxed mb-10">
                        <Trans
                            i18nKey="DeffTheBase.S10Text"
                            components={{ b: <strong className="text-white" /> }}
                        />
                    </p>

                    {/* Minigun */}
                    <div className="mb-12">
                        <h3 className="text-xl font-semibold text-white mb-1">{t("DeffTheBase.S10aTitle")}</h3>

                        <p className="text-slate-300 leading-relaxed mb-4">
                            <Trans
                                i18nKey="DeffTheBase.S10aText"
                                components={{ b: <strong className="text-white" /> }}
                            />
                        </p>

                        <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl bg-slate-800/30 flex justify-center">
                            <Img
                                src="/github-portfolio/images/defTheBase/minigun.webp"
                                alt={t("DeffTheBase.S10aImgAlt")}
                                className="max-h-72 object-contain"
                            />
                        </div>

                        <p className="text-slate-400 text-sm mt-2 text-center italic">{t("DeffTheBase.S10aCaption")}</p>
                    </div>

                    {/* Rocket Launcher */}
                    <div className="mb-12">
                        <h3 className="text-xl font-semibold text-white mb-1">{t("DeffTheBase.S10bTitle")}</h3>

                        <p className="text-slate-300 leading-relaxed mb-4">
                            <Trans
                                i18nKey="DeffTheBase.S10bText"
                                components={{ b: <strong className="text-white" /> }}
                            />
                        </p>

                        <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl bg-slate-800/30 flex justify-center">
                            <Img
                                src="/github-portfolio/images/defTheBase/rocket_launcher.webp"
                                alt={t("DeffTheBase.S10bImgAlt")}
                                className="max-h-72 object-contain"
                            />
                        </div>

                        <p className="text-slate-400 text-sm mt-2 text-center italic">{t("DeffTheBase.S10bCaption")}</p>
                    </div>

                    {/* Enemy */}
                    <div className="mb-12">
                        <h3 className="text-xl font-semibold text-white mb-1">{t("DeffTheBase.S10cTitle")}</h3>

                        <p className="text-slate-300 leading-relaxed mb-4">
                            <Trans
                                i18nKey="DeffTheBase.S10cText"
                                components={{ b: <strong className="text-white" /> }}
                            />
                        </p>

                        <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl bg-slate-800/30 flex justify-center">
                            <Img
                                src="/github-portfolio/images/defTheBase/enemy.webp"
                                alt={t("DeffTheBase.S10cImgAlt")}
                                className="max-h-72 object-contain"
                            />
                        </div>

                        <p className="text-slate-400 text-sm mt-2 text-center italic">{t("DeffTheBase.S10cCaption")}</p>
                    </div>

                    {/* Boss Animator */}
                    <div className="mb-12">
                        <h3 className="text-xl font-semibold text-white mb-1">{t("DeffTheBase.S10dTitle")}</h3>

                        <p className="text-slate-300 leading-relaxed mb-4">
                            <Trans
                                i18nKey="DeffTheBase.S10dText"
                                components={{ b: <strong className="text-white" /> }}
                            />
                        </p>

                        <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                            <Img
                                src="/github-portfolio/images/defTheBase/boss_animation.webp"
                                alt={t("DeffTheBase.S10dImgAlt")}
                                className="w-full object-cover"
                            />
                        </div>

                        <p className="text-slate-400 text-sm mt-2 text-center italic">{t("DeffTheBase.S10dCaption")}</p>
                    </div>

                    {/* Boss Death */}
                    <div>
                        <h3 className="text-xl font-semibold text-white mb-1">{t("DeffTheBase.S10eTitle")}</h3>

                        <p className="text-slate-300 leading-relaxed mb-4">{t("DeffTheBase.S10eText")}</p>

                        <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl bg-slate-800/30 flex justify-center">
                            <Img
                                src="/github-portfolio/images/defTheBase/boss_death.webp"
                                alt={t("DeffTheBase.S10eImgAlt")}
                                className="max-h-72 object-contain"
                            />
                        </div>

                        <p className="text-slate-400 text-sm mt-2 text-center italic">{t("DeffTheBase.S10eCaption")}</p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default UnityDeffTheBase;
