import { Link } from "react-router-dom";

const TopNavigationBar = () => {
    return (
        <nav className="bg-slate-800/80 border-b border-slate-700 no-print">
            <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
                <Link
                    to="/"
                    className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
                >
                    DevPortfolio
                </Link>

                <div className="flex gap-4">
                    <Link
                        to="/cv"
                        className="hover:text-cyan-400 transition-colors"
                    >
                        Životopis
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default TopNavigationBar;
