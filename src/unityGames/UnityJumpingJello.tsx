import { useEffect, useRef } from "react";
import { Trans, useTranslation } from "react-i18next";
import Img from "../components/Img";
import usePersistentScroll from "../hooks/usePersistentScroll";

const UnityJumpingJello = () => {
    const { t } = useTranslation();
    const tags = t("JumpingJello.Tags", { returnObjects: true }) as string[];

    const containerRef = useRef<HTMLDivElement>(null);
    const scroll = usePersistentScroll("jumpingJelloScroll", containerRef);

    useEffect(() => {
        if (scroll !== undefined && containerRef.current) {
            containerRef.current.scrollTo({ top: scroll, behavior: "auto" });
        }
    }, [scroll]);

    return (
        <div ref={containerRef} className="w-full h-full overflow-auto bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100">
            {/* Hero */}
            <div className="max-w-4xl mx-auto px-6 py-10">
                <h1 className="text-4xl font-extrabold tracking-tight text-white mb-3">Jumping Jello</h1>
                <p className="text-sm font-medium tracking-wide uppercase text-blue-400 mb-4">
                    {t("JumpingJello.Subtitle")}
                </p>

                <p className="text-slate-300 text-lg leading-relaxed max-w-2xl">
                    <Trans i18nKey="JumpingJello.Desc" components={{ b: <strong className="text-white" /> }} />
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
                {/* Skins */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-1">{t("JumpingJello.S1Title")}</h2>

                    <p className="text-slate-300 leading-relaxed mb-5">
                        <Trans i18nKey="JumpingJello.S1Text" components={{ b: <strong className="text-white" /> }} />
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl mb-4">
                        <Img
                            src="/github-portfolio/images/jumpingJello/skins.webp"
                            alt={t("JumpingJello.S1ImgAlt1")}
                            className="w-full object-cover"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mb-8 text-center italic">
                        {t("JumpingJello.S1Caption1")}
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <Img
                            src="/github-portfolio/images/jumpingJello/skins_task.webp"
                            alt={t("JumpingJello.S1ImgAlt2")}
                            className="w-full object-cover"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mt-2 text-center italic">
                        {t("JumpingJello.S1Caption2")}
                    </p>
                </section>

                {/* Level select */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-1">{t("JumpingJello.S2Title")}</h2>

                    <p className="text-slate-300 leading-relaxed mb-5">
                        <Trans i18nKey="JumpingJello.S2Text" components={{ b: <strong className="text-white" /> }} />
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                            <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                                <Img
                                    src="/github-portfolio/images/jumpingJello/menu_level_1.webp"
                                    alt={t("JumpingJello.S2ImgAlt1")}
                                    className="w-full object-cover"
                                />
                            </div>

                            <p className="text-slate-400 text-sm mt-1 text-center italic">
                                {t("JumpingJello.S2Caption1")}
                            </p>
                        </div>

                        <div>
                            <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                                <Img
                                    src="/github-portfolio/images/jumpingJello/menu_level_3.webp"
                                    alt={t("JumpingJello.S2ImgAlt2")}
                                    className="w-full object-cover"
                                />
                            </div>

                            <p className="text-slate-400 text-sm mt-1 text-center italic">
                                {t("JumpingJello.S2Caption2")}
                            </p>
                        </div>

                        <div>
                            <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                                <Img
                                    src="/github-portfolio/images/jumpingJello/menu_level_5.webp"
                                    alt={t("JumpingJello.S2ImgAlt3")}
                                    className="w-full object-cover"
                                />
                            </div>

                            <p className="text-slate-400 text-sm mt-1 text-center italic">
                                {t("JumpingJello.S2Caption3")}
                            </p>
                        </div>

                        <div>
                            <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                                <Img
                                    src="/github-portfolio/images/jumpingJello/menu_level_7.webp"
                                    alt={t("JumpingJello.S2ImgAlt4")}
                                    className="w-full object-cover"
                                />
                            </div>

                            <p className="text-slate-400 text-sm mt-1 text-center italic">
                                {t("JumpingJello.S2Caption4")}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Locked levels */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-1">{t("JumpingJello.S3Title")}</h2>

                    <p className="text-slate-300 leading-relaxed mb-5">
                        <Trans i18nKey="JumpingJello.S3Text" components={{ b: <strong className="text-white" /> }} />
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                                <Img
                                    src="/github-portfolio/images/jumpingJello/menu_level_8_closed.webp"
                                    alt={t("JumpingJello.S3ImgAlt1")}
                                    className="w-full object-cover"
                                />
                            </div>

                            <p className="text-slate-400 text-sm mt-1 text-center italic">
                                {t("JumpingJello.S3Caption1")}
                            </p>
                        </div>

                        <div>
                            <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                                <Img
                                    src="/github-portfolio/images/jumpingJello/menu_level_12_closed.webp"
                                    alt={t("JumpingJello.S3ImgAlt2")}
                                    className="w-full object-cover"
                                />
                            </div>

                            <p className="text-slate-400 text-sm mt-1 text-center italic">
                                {t("JumpingJello.S3Caption2")}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Jump Meter */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-1">{t("JumpingJello.S4Title")}</h2>

                    <p className="text-slate-300 leading-relaxed mb-5">
                        <Trans i18nKey="JumpingJello.S4Text" components={{ b: <strong className="text-white" /> }} />
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <Img
                            src="/github-portfolio/images/jumpingJello/jump_meter.webp"
                            alt={t("JumpingJello.S4ImgAlt")}
                            className="w-full object-cover"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mt-2 text-center italic">
                        {t("JumpingJello.S4Caption")}
                    </p>
                </section>

                {/* Fruits */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-1">{t("JumpingJello.S5Title")}</h2>

                    <p className="text-slate-300 leading-relaxed mb-5">
                        <Trans i18nKey="JumpingJello.S5Text" components={{ b: <strong className="text-white" /> }} />
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <Img
                            src="/github-portfolio/images/jumpingJello/level_all_foods.webp"
                            alt={t("JumpingJello.S5ImgAlt")}
                            className="w-full object-cover"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mt-2 text-center italic">
                        {t("JumpingJello.S5Caption")}
                    </p>
                </section>

                {/* Moving platforms */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-1">{t("JumpingJello.S6Title")}</h2>

                    <p className="text-slate-300 leading-relaxed mb-5">
                        <Trans i18nKey="JumpingJello.S6Text" components={{ b: <strong className="text-white" /> }} />
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <Img
                            src="/github-portfolio/images/jumpingJello/level_moving_platform.webp"
                            alt={t("JumpingJello.S6ImgAlt")}
                            className="w-full object-cover"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mt-2 text-center italic">
                        {t("JumpingJello.S6Caption")}
                    </p>
                </section>

                {/* Drone enemy */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-1">{t("JumpingJello.S7Title")}</h2>

                    <p className="text-slate-300 leading-relaxed mb-5">
                        <Trans i18nKey="JumpingJello.S7Text1" components={{ b: <strong className="text-white" /> }} />
                    </p>

                    <p className="text-slate-300 leading-relaxed mb-5">
                        <Trans i18nKey="JumpingJello.S7Text2" components={{ b: <strong className="text-white" /> }} />
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <Img
                            src="/github-portfolio/images/jumpingJello/level_drone.webp"
                            alt={t("JumpingJello.S7ImgAlt")}
                            className="w-full object-cover"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mt-2 text-center italic">
                        {t("JumpingJello.S7Caption")}
                    </p>
                </section>

                {/* Secret */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-1">{t("JumpingJello.S8Title")}</h2>

                    <p className="text-slate-300 leading-relaxed mb-5">
                        <Trans i18nKey="JumpingJello.S8Text" components={{ b: <strong className="text-white" /> }} />
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                                <Img
                                    src="/github-portfolio/images/jumpingJello/secret_platform.webp"
                                    alt={t("JumpingJello.S8ImgAlt1")}
                                    className="w-full object-cover"
                                />
                            </div>

                            <p className="text-slate-400 text-sm mt-1 text-center italic">
                                {t("JumpingJello.S8Caption1")}
                            </p>
                        </div>

                        <div>
                            <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                                <Img
                                    src="/github-portfolio/images/jumpingJello/secret_ikon_box.webp"
                                    alt={t("JumpingJello.S8ImgAlt2")}
                                    className="w-full object-cover"
                                />
                            </div>

                            <p className="text-slate-400 text-sm mt-1 text-center italic">
                                {t("JumpingJello.S8Caption2")}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Achievement system */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-1">{t("JumpingJello.S9Title")}</h2>

                    <p className="text-slate-300 leading-relaxed mb-5">
                        <Trans i18nKey="JumpingJello.S9Text" components={{ b: <strong className="text-white" /> }} />
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl mb-4">
                        <Img
                            src="/github-portfolio/images/jumpingJello/level_achivement_done.webp"
                            alt={t("JumpingJello.S9ImgAlt1")}
                            className="w-full object-cover"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mb-8 text-center italic">
                        {t("JumpingJello.S9Caption1")}
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <Img
                            src="/github-portfolio/images/jumpingJello/level_achivement_text.webp"
                            alt={t("JumpingJello.S9ImgAlt2")}
                            className="w-full object-cover"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mt-2 text-center italic">
                        {t("JumpingJello.S9Caption2")}
                    </p>
                </section>

                {/* Winning */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-1">{t("JumpingJello.S10Title")}</h2>

                    <p className="text-slate-300 leading-relaxed mb-5">
                        <Trans i18nKey="JumpingJello.S10Text" components={{ b: <strong className="text-white" /> }} />
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <Img
                            src="/github-portfolio/images/jumpingJello/winning.webp"
                            alt={t("JumpingJello.S10ImgAlt")}
                            className="w-full object-cover"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mt-2 text-center italic">
                        {t("JumpingJello.S10Caption")}
                    </p>
                </section>

                {/* Infinity levels */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-1">{t("JumpingJello.S11Title")}</h2>

                    <p className="text-slate-300 leading-relaxed mb-5">
                        <Trans i18nKey="JumpingJello.S11Text" components={{ b: <strong className="text-white" /> }} />
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                            <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                                <Img
                                    src="/github-portfolio/images/jumpingJello/menu_level_9_infinity.webp"
                                    alt={t("JumpingJello.S11ImgAlt1")}
                                    className="w-full object-cover"
                                />
                            </div>

                            <p className="text-slate-400 text-sm mt-1 text-center italic">
                                {t("JumpingJello.S11Caption1")}
                            </p>
                        </div>

                        <div>
                            <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                                <Img
                                    src="/github-portfolio/images/jumpingJello/menu_level_12_closed.webp"
                                    alt={t("JumpingJello.S11ImgAlt2")}
                                    className="w-full object-cover"
                                />
                            </div>

                            <p className="text-slate-400 text-sm mt-1 text-center italic">
                                {t("JumpingJello.S11Caption2")}
                            </p>
                        </div>
                    </div>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <Img
                            src="/github-portfolio/images/jumpingJello/infinity_level.webp"
                            alt={t("JumpingJello.S11ImgAlt3")}
                            className="w-full object-cover"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mt-2 text-center italic">
                        {t("JumpingJello.S11Caption3")}
                    </p>
                </section>

                {/* Bones & animation */}
                <section className="border-t border-slate-700/50 pt-10">
                    <h2 className="text-2xl font-bold text-white mb-2">{t("JumpingJello.S12Title")}</h2>

                    <p className="text-slate-300 leading-relaxed mb-6">
                        <Trans i18nKey="JumpingJello.S12Text" components={{ b: <strong className="text-white" /> }} />
                    </p>

                    <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                        <Img
                            src="/github-portfolio/images/jumpingJello/animator_character.webp"
                            alt={t("JumpingJello.S12ImgAlt")}
                            className="w-full object-cover"
                        />
                    </div>

                    <p className="text-slate-400 text-sm mt-2 text-center italic">
                        {t("JumpingJello.S12Caption")}
                    </p>
                </section>

                {/* Shaders */}
                <section className="border-t border-slate-700/50 pt-10">
                    <h2 className="text-2xl font-bold text-white mb-2">{t("JumpingJello.S13Title")}</h2>

                    <p className="text-slate-300 leading-relaxed mb-10">
                        <Trans i18nKey="JumpingJello.S13Text" components={{ b: <strong className="text-white" /> }} />
                    </p>

                    {/* Laser drone shader */}
                    <div className="mb-12">
                        <h3 className="text-xl font-semibold text-white mb-1">{t("JumpingJello.S13aTitle")}</h3>

                        <p className="text-slate-300 leading-relaxed mb-4">
                            <Trans i18nKey="JumpingJello.S13aText" components={{ b: <strong className="text-white" /> }} />
                        </p>

                        <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                            <Img
                                src="/github-portfolio/images/jumpingJello/laser_drone_shader.webp"
                                alt={t("JumpingJello.S13aImgAlt")}
                                className="w-full object-cover"
                            />
                        </div>

                        <p className="text-slate-400 text-sm mt-2 text-center italic">
                            {t("JumpingJello.S13aCaption")}
                        </p>
                    </div>

                    {/* Character burn shader */}
                    <div>
                        <h3 className="text-xl font-semibold text-white mb-1">{t("JumpingJello.S13bTitle")}</h3>

                        <p className="text-slate-300 leading-relaxed mb-4">
                            <Trans i18nKey="JumpingJello.S13bText" components={{ b: <strong className="text-white" /> }} />
                        </p>

                        <div className="rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                            <Img
                                src="/github-portfolio/images/jumpingJello/character_dron_shader.webp"
                                alt={t("JumpingJello.S13bImgAlt")}
                                className="w-full object-cover"
                            />
                        </div>

                        <p className="text-slate-400 text-sm mt-2 text-center italic">
                            {t("JumpingJello.S13bCaption")}
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default UnityJumpingJello;
