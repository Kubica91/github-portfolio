import { ToastContainer } from "react-toastify";
import CvPage from "./cv/CvPage";

const App = () => {
    return (
        <>
            <CvPage />

            <ToastContainer
                position="top-center"
                closeOnClick
                pauseOnFocusLoss
                theme="dark"
            />
        </>
    );
};

export default App;
