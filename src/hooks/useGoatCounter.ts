import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useGoatCounter = (): void => {
    const location = useLocation();

    useEffect(() => {
        const sendPageView = () => {
            if (window.goatcounter?.count) {
                window.goatcounter.count({
                    path: location.pathname + location.search,
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

