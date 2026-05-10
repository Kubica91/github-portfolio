import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BASE_PATH = "/github-portfolio";

const useGoatCounter = (): void => {
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname.startsWith(BASE_PATH)
            ? location.pathname.slice(BASE_PATH.length) || "/"
            : location.pathname;

        const sendPageView = () => {
            if (window.goatcounter?.count) {
                window.goatcounter.count({
                    path: path + location.search,
                });
                return true;
            }
            return false;
        };

        if (!sendPageView()) {
            const timeout = setTimeout(sendPageView, 300);
            return () => clearTimeout(timeout);
        }
    }, [location]);
};

export default useGoatCounter;

