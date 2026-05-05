import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import CurriculumVitaePage from "./curriculumVitae/CurriculumVitaePage";
import HomePage from "./home/HomePage";
import ChessMainPage from "./threeJsGames/chess/ChessMainPage";
import TopNavigationBar from "./topNavigationBar/TopNavigationBar";
import UnityGames from "./unityGames/UnityGames";

const App = () => {
    return (
        <div className="w-screen h-screen bg-slate-900 text-slate-100 font-sans">
            <BrowserRouter>
                <TopNavigationBar />

                <Routes>
                    <Route
                        path="/"
                        element={<HomePage />}
                    />
                    <Route
                        path="/cv"
                        element={<CurriculumVitaePage />}
                    />
                    <Route
                        path="/unity"
                        element={<UnityGames />}
                    />
                    <Route
                        path="/threejs"
                        element={<ChessMainPage />}
                    />
                </Routes>
            </BrowserRouter>

            <ToastContainer
                position="top-center"
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    );
};

export default App;
