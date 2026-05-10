import { useEffect, useRef } from "react";
import { Trans, useTranslation } from "react-i18next";
import Img from "../components/Img";
import usePersistentScroll from "../hooks/usePersistentScroll";

const UnityHideAndSeek = () => {
    const { t } = useTranslation();
    const tags = t("HideAndSeek.Tags", { returnObjects: true }) as string[];
    const tableHeaders = t("HideAndSeek.S2TableHeaders", { returnObjects: true }) as string[];
    const controls = t("HideAndSeek.S2Controls", { returnObjects: true }) as string[][];

    const containerRef = useRef<HTMLDivElement>(null);
    const scroll = usePersistentScroll("hideAndSeekScroll", containerRef);

    useEffect(() => {
        if (scroll !== undefined && containerRef.current) {
            containerRef.current.scrollTo({ top: scroll, behavior: "auto" });
        }
    }, [scroll]);

    return (
        <div ref={containerRef} className="w-full h-full overflow-auto bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100">
            {/* Hero */}
            <div className="max-w-4xl mx-auto px-6 py-10">
                <h1 className="text-4xl font-extrabold tracking-tight text-white mb-3">Hide and Seek</h1>
                <p className="text-sm font-medium tracking-wide uppercase text-red-400 mb-4">
                    {t("HideAndSeek.Subtitle")}
                </p>

                <p className="text-slate-300 text-lg leading-relaxed max-w-2xl">
                    <Trans i18nKey="HideAndSeek.Desc" components={{ b: <strong className="text-white" /> }} />
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
                    <h2 className="text-2xl font-bold text-white mb-1">{t("HideAndSeek.S1Title")}</h2>

                    <p className="text-slate-300 leading-relaxed mb-5">
                        <Trans i18nKey="HideAndSeek.S1Text" components={{ b: <strong className="text-white" /> }} />
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <Img
                            src="/github-portfolio/images/hideAndSeek/menu.webp"
                            alt={t("HideAndSeek.S1ImgAlt")}
                            className="w-full object-cover"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mt-2 text-center italic">
                        {t("HideAndSeek.S1Caption")}
                    </p>
                </section>

                {/* Controls */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-1">{t("HideAndSeek.S2Title")}</h2>

                    <p className="text-slate-300 leading-relaxed mb-5">
                        {t("HideAndSeek.S2Text")}
                    </p>

                    <div className="overflow-hidden rounded-2xl border border-slate-700/50">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-slate-800/80 text-left">
                                    {tableHeaders.map((header) => (
                                        <th key={header} className="px-4 py-3 text-slate-300 font-semibold">
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-700/40">
                                {controls.map(([action, kb, gp]) => (
                                    <tr
                                        key={action}
                                        className="bg-slate-800/30 hover:bg-slate-800/50 transition-colors"
                                    >
                                        <td className="px-4 py-3 text-white font-medium">{action}</td>

                                        <td className="px-4 py-3 text-slate-300">{kb}</td>

                                        <td className="px-4 py-3 text-slate-300">{gp}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Vision + shooting */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-1">{t("HideAndSeek.S3Title")}</h2>

                    <p className="text-slate-300 leading-relaxed mb-5">
                        <Trans i18nKey="HideAndSeek.S3Text" components={{ b: <strong className="text-white" /> }} />
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <Img
                            src="/github-portfolio/images/hideAndSeek/vision_firing.webp"
                            alt={t("HideAndSeek.S3ImgAlt")}
                            className="w-full object-cover"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mt-2 text-center italic">
                        {t("HideAndSeek.S3Caption")}
                    </p>
                </section>

                {/* Hiding */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-1">{t("HideAndSeek.S4Title")}</h2>

                    <p className="text-slate-300 leading-relaxed mb-5">
                        <Trans i18nKey="HideAndSeek.S4Text" components={{ b: <strong className="text-white" /> }} />
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <Img
                            src="/github-portfolio/images/hideAndSeek/hiding.webp"
                            alt={t("HideAndSeek.S4ImgAlt")}
                            className="w-full object-cover"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mt-2 text-center italic">
                        {t("HideAndSeek.S4Caption")}
                    </p>
                </section>

                {/* Hunting friend */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-1">{t("HideAndSeek.S5Title")}</h2>

                    <p className="text-slate-300 leading-relaxed mb-5">
                        <Trans i18nKey="HideAndSeek.S5Text" components={{ b: <strong className="text-white" /> }} />
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <Img
                            src="/github-portfolio/images/hideAndSeek/hunting_friend.webp"
                            alt={t("HideAndSeek.S5ImgAlt")}
                            className="w-full object-cover"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mt-2 text-center italic">
                        {t("HideAndSeek.S5Caption")}
                    </p>
                </section>

                {/* Scene editor */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-1">{t("HideAndSeek.S6Title")}</h2>

                    <p className="text-slate-300 leading-relaxed mb-5">
                        <Trans i18nKey="HideAndSeek.S6Text" components={{ b: <strong className="text-white" /> }} />
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <Img
                            src="/github-portfolio/images/hideAndSeek/hunting_with_editor.webp"
                            alt={t("HideAndSeek.S6ImgAlt")}
                            className="w-full object-cover"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mt-2 text-center italic">
                        {t("HideAndSeek.S6Caption")}
                    </p>
                </section>
            </div>
        </div>
    );
};

export default UnityHideAndSeek;
