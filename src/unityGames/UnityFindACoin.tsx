import { useEffect, useRef } from "react";
import { Trans, useTranslation } from "react-i18next";
import usePersistentScroll from "../hooks/usePersistentScroll";

const UnityFindACoin = () => {
    const { t } = useTranslation();
    const tags = t("FindACoin.Tags", { returnObjects: true }) as string[];

    const containerRef = useRef<HTMLDivElement>(null);
    const scroll = usePersistentScroll("findACoinScroll", containerRef);

    useEffect(() => {
        if (scroll !== undefined && containerRef.current) {
            containerRef.current.scrollTo({ top: scroll, behavior: "auto" });
        }
    }, [scroll]);

    return (
        <div ref={containerRef} className="w-full h-full overflow-auto bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100">
            {/* Hero */}
            <div className="max-w-4xl mx-auto px-6 py-10">
                <h1 className="text-4xl font-extrabold tracking-tight text-white mb-3">Find a Coin</h1>
                <p className="text-sm font-medium tracking-wide uppercase text-purple-400 mb-4">
                    {t("FindACoin.Subtitle")}
                </p>

                <p className="text-slate-300 text-lg leading-relaxed max-w-2xl">
                    <Trans i18nKey="FindACoin.Desc" components={{ b: <strong className="text-white" /> }} />
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
                    <h2 className="text-2xl font-bold text-white mb-1">{t("FindACoin.S1Title")}</h2>

                    <p className="text-slate-300 leading-relaxed mb-5">
                        <Trans i18nKey="FindACoin.S1Text" components={{ b: <strong className="text-white" /> }} />
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <img
                            src="/github-portfolio/images/findACoin/menu.webp"
                            alt={t("FindACoin.S1ImgAlt")}
                            className="w-full object-cover"
                            loading="lazy"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mt-2 text-center italic">
                        {t("FindACoin.S1Caption")}
                    </p>
                </section>

                {/* Level select */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-1">{t("FindACoin.S2Title")}</h2>

                    <p className="text-slate-300 leading-relaxed mb-5">
                        <Trans i18nKey="FindACoin.S2Text" components={{ b: <strong className="text-white" /> }} />
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <img
                            src="/github-portfolio/images/findACoin/levels.webp"
                            alt={t("FindACoin.S2ImgAlt")}
                            className="w-full object-cover"
                            loading="lazy"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mt-2 text-center italic">
                        {t("FindACoin.S2Caption")}
                    </p>
                </section>

                {/* Level 1 */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-1">{t("FindACoin.S3Title")}</h2>

                    <p className="text-slate-300 leading-relaxed mb-5">
                        {t("FindACoin.S3Text")}
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl mb-4">
                        <img
                            src="/github-portfolio/images/findACoin/level_1_game.webp"
                            alt={t("FindACoin.S3ImgAlt1")}
                            className="w-full object-cover"
                            loading="lazy"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mb-6 text-center italic">
                        {t("FindACoin.S3Caption1")}
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <img
                            src="/github-portfolio/images/findACoin/mapa_lvl_1.webp"
                            alt={t("FindACoin.S3ImgAlt2")}
                            className="w-full object-cover"
                            loading="lazy"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mt-2 text-center italic">
                        {t("FindACoin.S3Caption2")}
                    </p>
                </section>

                {/* Level 2 */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-1">{t("FindACoin.S4Title")}</h2>

                    <p className="text-slate-300 leading-relaxed mb-5">
                        <Trans i18nKey="FindACoin.S4Text" components={{ b: <strong className="text-white" /> }} />
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl mb-4">
                        <img
                            src="/github-portfolio/images/findACoin/double_jump_box.webp"
                            alt={t("FindACoin.S4ImgAlt1")}
                            className="w-full object-cover"
                            loading="lazy"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mb-6 text-center italic">
                        {t("FindACoin.S4Caption1")}
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <img
                            src="/github-portfolio/images/findACoin/mapa_lvl_2.webp"
                            alt={t("FindACoin.S4ImgAlt2")}
                            className="w-full object-cover"
                            loading="lazy"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mt-2 text-center italic">
                        {t("FindACoin.S4Caption2")}
                    </p>
                </section>

                {/* Level 3 */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-1">{t("FindACoin.S5Title")}</h2>

                    <p className="text-slate-300 leading-relaxed mb-5">
                        <Trans i18nKey="FindACoin.S5Text" components={{ b: <strong className="text-white" /> }} />
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl mb-4">
                        <img
                            src="/github-portfolio/images/findACoin/lava_ground.webp"
                            alt={t("FindACoin.S5ImgAlt1")}
                            className="w-full object-cover"
                            loading="lazy"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mb-6 text-center italic">
                        {t("FindACoin.S5Caption1")}
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <img
                            src="/github-portfolio/images/findACoin/mapa_lvl_3.webp"
                            alt={t("FindACoin.S5ImgAlt2")}
                            className="w-full object-cover"
                            loading="lazy"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mt-2 text-center italic">
                        {t("FindACoin.S5Caption2")}
                    </p>
                </section>

                {/* In-game menu */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-1">{t("FindACoin.S6Title")}</h2>

                    <p className="text-slate-300 leading-relaxed mb-5">
                        {t("FindACoin.S6Text")}
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <img
                            src="/github-portfolio/images/findACoin/game_menu.webp"
                            alt={t("FindACoin.S6ImgAlt")}
                            className="w-full object-cover"
                            loading="lazy"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mt-2 text-center italic">
                        {t("FindACoin.S6Caption")}
                    </p>
                </section>

                {/* Animations */}
                <section className="border-t border-slate-700/50 pt-10">
                    <h2 className="text-2xl font-bold text-white mb-2">{t("FindACoin.S7Title")}</h2>

                    <p className="text-slate-300 leading-relaxed mb-10">
                        <Trans i18nKey="FindACoin.S7Text" components={{ b: <strong className="text-white" /> }} />
                    </p>

                    {/* Animator overview */}
                    <div className="mb-12">
                        <h3 className="text-xl font-semibold text-white mb-1">{t("FindACoin.S7aTitle")}</h3>

                        <p className="text-slate-300 leading-relaxed mb-4">
                            <Trans i18nKey="FindACoin.S7aText" components={{ b: <strong className="text-white" /> }} />
                        </p>

                        <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                            <img
                                src="/github-portfolio/images/findACoin/animace_editor.webp"
                                alt={t("FindACoin.S7aImgAlt")}
                                className="w-full object-cover"
                                loading="lazy"
                            />
                        </div>

                        <p className="text-slate-400 text-sm mt-2 text-center italic">
                            {t("FindACoin.S7aCaption")}
                        </p>
                    </div>

                    {/* Player move */}
                    <div className="mb-12">
                        <h3 className="text-xl font-semibold text-white mb-1">{t("FindACoin.S7bTitle")}</h3>

                        <p className="text-slate-300 leading-relaxed mb-4">
                            {t("FindACoin.S7bText")}
                        </p>

                        <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl bg-slate-800/30 flex justify-center">
                            <img
                                src="/github-portfolio/images/findACoin/player_move.webp"
                                alt={t("FindACoin.S7bImgAlt")}
                                className="max-h-72 object-contain"
                                loading="lazy"
                            />
                        </div>

                        <p className="text-slate-400 text-sm mt-2 text-center italic">
                            {t("FindACoin.S7bCaption")}
                        </p>
                    </div>

                    {/* Jump box */}
                    <div className="mb-12">
                        <h3 className="text-xl font-semibold text-white mb-1">{t("FindACoin.S7cTitle")}</h3>

                        <p className="text-slate-300 leading-relaxed mb-4">
                            {t("FindACoin.S7cText")}
                        </p>

                        <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl bg-slate-800/30 flex justify-center">
                            <img
                                src="/github-portfolio/images/findACoin/jump_box.webp"
                                alt={t("FindACoin.S7cImgAlt")}
                                className="max-h-72 object-contain"
                                loading="lazy"
                            />
                        </div>

                        <p className="text-slate-400 text-sm mt-2 text-center italic">
                            {t("FindACoin.S7cCaption")}
                        </p>
                    </div>

                    {/* Lava idle */}
                    <div className="mb-12">
                        <h3 className="text-xl font-semibold text-white mb-1">{t("FindACoin.S7dTitle")}</h3>

                        <p className="text-slate-300 leading-relaxed mb-4">
                            {t("FindACoin.S7dText")}
                        </p>

                        <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl bg-slate-800/30 flex justify-center">
                            <img
                                src="/github-portfolio/images/findACoin/lava_idle.webp"
                                alt={t("FindACoin.S7dImgAlt")}
                                className="max-h-72 object-contain"
                                loading="lazy"
                            />
                        </div>

                        <p className="text-slate-400 text-sm mt-2 text-center italic">
                            {t("FindACoin.S7dCaption")}
                        </p>
                    </div>
                </section>

                {/* Audio */}
                <section className="border-t border-slate-700/50 pt-10">
                    <h2 className="text-2xl font-bold text-white mb-2">{t("FindACoin.S8Title")}</h2>

                    <p className="text-slate-300 leading-relaxed mb-6">
                        <Trans i18nKey="FindACoin.S8Text" components={{ b: <strong className="text-white" /> }} />
                    </p>
                </section>
            </div>
        </div>
    );
};

export default UnityFindACoin;
