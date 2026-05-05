import { useTranslation } from "react-i18next";
import {
    FiAward,
    FiBookOpen,
    FiBriefcase,
    FiCode,
    FiDownload,
    FiFolder,
    FiGlobe,
    FiMail,
    FiMapPin,
    FiMessageSquare,
    FiPackage,
    FiSmartphone,
    FiUser,
} from "react-icons/fi";
import SectionTitle from "./components/SectionTitle";
import SkillCategory from "./components/SkillCategory";
import TimelineItem from "./components/TimelineItem";

const CurriculumVitaePage = () => {
    const { t } = useTranslation();

    const handleDownloadPdf = () => {
        window.print();
    };

    return (
        <div className="w-full h-full bg-gradient-to-br from-slate-50 to-blue-50 overflow-auto">
            {/* Header */}
            <header className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900">
                <div className="mx-auto max-w-4xl px-6 py-10">
                    <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:text-left">
                        <img
                            src="/github-portfolio/images/profile.jpg"
                            alt="Jakub Petráň"
                            className="h-36 w-36 shrink-0 rounded-2xl border-4 border-blue-400/30 object-cover shadow-lg"
                        />

                        <div className="flex flex-1 flex-col items-center sm:items-start">
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-sm text-blue-300">
                                <span className="h-2 w-2 rounded-full bg-green-400" />
                                {t("OpenToOpportunities")}
                            </div>

                            <h1 className="mb-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                                Jakub Petráň
                            </h1>

                            <p className="mb-6 text-lg font-medium text-blue-200 sm:text-xl">{t("Subtitle")}</p>

                            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-300">
                                <span className="flex items-center gap-1.5">
                                    <FiMapPin className="text-blue-400" />
                                    {t("Location")}
                                </span>

                                <span className="flex items-center gap-1.5">
                                    <FiMail className="text-blue-400" />
                                    petran97@seznam.cz
                                </span>
                            </div>

                            <button
                                onClick={handleDownloadPdf}
                                className="mt-6 inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors
                                    print:hidden hover:bg-blue-500 no-print"
                            >
                                <FiDownload />
                                {t("DownloadPdf")}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Content */}
            <main className="mx-auto max-w-4xl space-y-4 px-6 py-4">
                {/* Profile */}
                <section className="rounded-2xl border border-blue-200 bg-white p-8 shadow-sm no-boarder">
                    <SectionTitle
                        icon={<FiUser />}
                        title={t("Profile")}
                    />

                    <div className="space-y-3 text-gray-600 leading-relaxed">
                        <p>{t("Profile.Focus")}</p>

                        <p>{t("Profile.CadBimExperience")}</p>

                        <p>{t("Profile.AdditionalSkills")}</p>
                    </div>
                </section>

                {/* Experience */}
                <section className="rounded-2xl border border-blue-200 bg-white p-8 shadow-sm no-boarder">
                    <SectionTitle
                        icon={<FiBriefcase />}
                        title={t("WorkExperience")}
                    />

                    <TimelineItem
                        period={t("WorkExperience.Period")}
                        title={t("WorkExperience.Title")}
                        subtitle={t("WorkExperience.Company")}
                    >
                        <ul className="space-y-1.5 text-gray-600">
                            <li className="flex items-start gap-2">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                                {t("WorkExperience.CadBimVisualization")}
                            </li>

                            <li className="flex items-start gap-2">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                                {t("WorkExperience.ForgeViewer")}
                            </li>

                            <li className="flex items-start gap-2">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                                {t("WorkExperience.ThreeJsViewer")}
                            </li>

                            <li className="flex items-start gap-2">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                                {t("WorkExperience.PointCloud")}
                            </li>

                            <li className="flex items-start gap-2">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                                {t("WorkExperience.FrontendStack")}
                            </li>

                            <li className="flex items-start gap-2">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                                {t("WorkExperience.BackendStack")}
                            </li>

                            <li className="flex items-start gap-2">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                                {t("WorkExperience.BigDataOptimization")}
                            </li>

                            <li className="flex items-start gap-2">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                                {t("WorkExperience.IfcMetadata")}
                            </li>

                            <li className="flex items-start gap-2">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                                {t("WorkExperience.CollisionDetection")}
                            </li>

                            <li className="flex items-start gap-2">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                                {t("WorkExperience.BcfImportExport")}
                            </li>

                            <li className="flex items-start gap-2">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                                {t("WorkExperience.ArVrDevelopment")}
                            </li>
                        </ul>
                    </TimelineItem>
                </section>

                {/* Skills */}
                <section className="rounded-2xl border border-blue-200 bg-white p-8 shadow-sm no-boarder">
                    <SectionTitle
                        icon={<FiCode />}
                        title={t("TechnicalSkills")}
                    />

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <SkillCategory
                            title={t("TechnicalSkills.Frontend")}
                            color="blue"
                            skills={["React", "TypeScript", "Three.js", "Autodesk Forge Viewer", "Syncfusion UI"]}
                        />

                        <SkillCategory
                            title={t("TechnicalSkills.Backend")}
                            color="green"
                            skills={["C#", ".NET", "REST API", "Node.js", "xBim"]}
                        />

                        <SkillCategory
                            title={t("TechnicalSkills.3dVisualization")}
                            color="purple"
                            skills={["BIM / CAD", "IFC (Ifc.js)", "Unity (AR/VR)"]}
                        />

                        <SkillCategory
                            title={t("TechnicalSkills.CloudDevOps")}
                            color="orange"
                            skills={["Azure DevOps", "TFS"]}
                        />

                        <SkillCategory
                            title={t("TechnicalSkills.Database")}
                            color="rose"
                            skills={["SQL"]}
                        />
                    </div>
                </section>

                {/* Education */}
                <section className="rounded-2xl border border-blue-200 bg-white p-8 shadow-sm no-boarder">
                    <SectionTitle
                        icon={<FiBookOpen />}
                        title={t("Education")}
                    />

                    <TimelineItem
                        period={t("Education.Period")}
                        title={t("Education.University")}
                        subtitle={t("Education.Degree")}
                    >
                        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
                            <span className="font-semibold text-gray-800">{t("Education.ThesisLabel")}</span>{" "}
                            {t("Education.ThesisTitle")}
                            <a
                                href="https://dspace.tul.cz/items/2a2a2308-13d1-4b9b-9c96-6c75c33cc25e"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-2 inline-flex items-center gap-1 text-blue-600 hover:underline"
                            >
                                {t("Education.ThesisLink")} ↗
                            </a>
                        </div>
                    </TimelineItem>

                    <div className="mt-6">
                        <TimelineItem
                            period={t("Education.HighSchool.Period")}
                            title={t("Education.HighSchool.Name")}
                            subtitle={t("Education.HighSchool.Field")}
                        />
                    </div>
                </section>

                {/* Certifications */}
                <section className="rounded-2xl border border-blue-200 bg-white p-8 shadow-sm no-boarder">
                    <SectionTitle
                        icon={<FiAward />}
                        title={t("Certifications")}
                    />

                    <div className="grid gap-4 sm:grid-cols-2">
                        {[
                            {
                                name: "Azure Developer Associate",
                                issuer: "Microsoft Certified",
                            },
                            {
                                name: "DevOps Engineer Expert",
                                issuer: "Microsoft Certified",
                            },
                        ].map((cert) => (
                            <div
                                key={cert.name}
                                className="flex items-center gap-4 rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50 to-white p-4"
                            >
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-xl text-white">
                                    <FiAward />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900">{cert.name}</p>
                                    <p className="text-sm text-gray-500">{cert.issuer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Projects */}
                <section className="rounded-2xl border border-blue-200 bg-white p-8 shadow-sm no-boarder">
                    <SectionTitle
                        icon={<FiFolder />}
                        title={t("Projects")}
                    />

                    <div className="grid gap-4 sm:grid-cols-2">
                        {[
                            {
                                title: t("Projects.UnityGames"),
                                desc: t("Projects.UnityGamesDesc"),
                                emoji: <FiSmartphone />,
                            },
                            {
                                title: t("Projects.WordGame"),
                                desc: t("Projects.WordGameDesc"),
                                emoji: <FiMessageSquare />,
                            },
                            {
                                title: t("Projects.CodingGames"),
                                desc: t("Projects.CodingGamesDesc"),
                                emoji: <FiPackage />,
                            },
                        ].map((project) => (
                            <div
                                key={project.title}
                                className="rounded-xl border border-gray-200 p-4 transition-shadow hover:shadow-md"
                            >
                                <div className="py-2 flex flex-row gap-2">
                                    <div className="text-2xl">{project.emoji}</div>
                                    <h3 className="font-bold text-gray-900">{project.title}</h3>
                                </div>

                                <p className="text-sm text-gray-500">{project.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Languages */}
                <section className="rounded-2xl border border-blue-200 bg-white p-8 shadow-sm no-boarder">
                    <SectionTitle
                        icon={<FiGlobe />}
                        title={t("Languages")}
                    />

                    <div className="flex flex-wrap gap-6">
                        {[
                            { lang: t("Languages.Czech"), level: "C2", pct: 100 },
                            { lang: t("Languages.English"), level: "B2", pct: 70 },
                        ].map((l) => (
                            <div
                                key={l.lang}
                                className="min-w-[180px] flex-1"
                            >
                                <div className="mb-1 flex items-center justify-between">
                                    <span className="font-semibold text-gray-900">{l.lang}</span>
                                    <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-bold text-blue-700">
                                        {l.level}
                                    </span>
                                </div>
                                <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                                    <div
                                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all"
                                        style={{ width: `${l.pct}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="border-t border-gray-200 bg-white py-8 text-center text-sm text-gray-400 no-print">
                © {new Date().getFullYear()} Jakub Petráň
            </footer>
        </div>
    );
};

export default CurriculumVitaePage;
