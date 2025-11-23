import { useTranslation } from "react-i18next";
import { ToastContainer } from "react-toastify";

const App = () => {
    const { t } = useTranslation();

    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center gap-3 bg-neutral-900 text-white">
            <span>{t("Spravuje se...")}</span>

            <ToastContainer
                position="top-center"
                closeOnClick
                pauseOnFocusLoss
                theme="dark"
            />
        </div>
    );
};

export default App;
