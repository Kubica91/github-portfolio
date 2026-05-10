import { useTranslation } from "react-i18next";
import { FiGlobe } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

const TopNavigationBar = () => {
    const { pathname } = useLocation();
    const { t } = useTranslation();

    const navLink = (to: string, label: string) => {
        const active = pathname === to;
        return (
            <Link
                to={to}
                className={`text-sm font-medium transition-colors ${active ? "text-cyan-400" : "text-slate-300 hover:text-white"}`}
            >
                {label}
            </Link>
        );
    };

    return (
        <nav className="bg-slate-900/70 backdrop-blur-md border-b border-slate-700/50 no-print">
            <div className="max-w-5xl mx-auto px-4 py-3.5 flex justify-between items-center">
                <Link
                    to="/github-portfolio"
                    className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent tracking-tight"
                >
                    Jakub Petráň
                </Link>

                <div className="flex items-center gap-6">
                    {navLink("/github-portfolio", t("Nav.Projects"))}
                    {navLink("/github-portfolio/cv", t("Nav.CV"))}

                    <div className="flex items-center gap-1.5 text-sm font-medium text-slate-300">
                        <FiGlobe className="w-4 h-4 text-cyan-400" />
                        CZ
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default TopNavigationBar;
