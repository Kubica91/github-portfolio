import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import CurriculumVitaePage from "./curriculumVitae/CurriculumVitaePage";
import HomePage from "./home/HomePage";
import ChessMainPage from "./threeJsGames/chess/ChessMainPage";
import TopNavigationBar from "./topNavigationBar/TopNavigationBar";
import UnityDeffTheBase from "./unityGames/UnityDeffTheBase";
import UnityFindACoin from "./unityGames/UnityFindACoin";
import UnityHideAndSeek from "./unityGames/UnityHideAndSeek";
import UnityPruzina from "./unityGames/UnityPruzina";

const App = () => {
    return (
        <div className="w-screen h-screen flex flex-col bg-slate-900 text-slate-100 font-sans overflow-hidden print:h-auto print:overflow-visible">
            <BrowserRouter>
                <TopNavigationBar />

                <div className="w-full h-full flex-grow overflow-hidden print:h-auto print:overflow-visible">
                    <Routes>
                        <Route
                            path="/github-portfolio"
                            element={<HomePage />}
                        />
                        <Route
                            path="/github-portfolio/cv"
                            element={<CurriculumVitaePage />}
                        />
                        <Route
                            path="/github-portfolio/unity/findacoin"
                            element={<UnityFindACoin />}
                        />
                        <Route
                            path="/github-portfolio/unity/deffthebase"
                            element={<UnityDeffTheBase />}
                        />
                        <Route
                            path="/github-portfolio/unity/hideandseek"
                            element={<UnityHideAndSeek />}
                        />
                        <Route
                            path="/github-portfolio/unity/pruzina"
                            element={<UnityPruzina />}
                        />
                        <Route
                            path="/github-portfolio/threejs/sachy"
                            element={<ChessMainPage />}
                        />
                    </Routes>
                </div>
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
