import { Link } from "react-router-dom";

const TopNavigationBar = () => {
    return (
        <nav className="sticky top-0 z-50 bg-slate-800/80 backdrop-blur-md border-b border-slate-700 no-print">
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
                        CV
                    </Link>

                    <Link
                        to="/unity"
                        className="hover:text-cyan-400 transition-colors"
                    >
                        Unity
                    </Link>

                    <Link
                        to="/threejs"
                        className="hover:text-cyan-400 transition-colors"
                    >
                        Three.js
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default TopNavigationBar;
