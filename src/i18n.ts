import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    cs: {
        translation: {
            "Zdar, test": "Zdar, test",
        },
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng: "cs",
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
