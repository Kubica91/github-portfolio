import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    cs: {
        translation: {
            OpenToOpportunities: "Otevřený novým příležitostem",
            Subtitle: "Fullstack Developer (React / .NET) | 3D & Visualization Specialist",
            Location: "Liberec / Remote",
            DownloadPdf: "Stáhnout CV jako PDF",

            Profile: "Profil",
            "Profile.Focus": "Fullstack developer se zaměřením na 3D vizualizace, webové aplikace a cloudová řešení.",
            "Profile.CadBimExperience":
                "Mám více než 5 let zkušeností s vývojem aplikací pro práci s CAD/BIM modely, včetně interaktivní vizualizace ve webu (React, TypeScript, Autodesk Forge, Three.js) a backendu v .NET.",
            "Profile.AdditionalSkills":
                "Zkušenosti zahrnují také AR/VR aplikace v Unity a práci s velkými daty (3D modely). V Unity mám zkušenosti s vývojem mobilních her pro Android, iOS a Windows.",

            WorkExperience: "Pracovní zkušenosti",
            "WorkExperience.Period": "04/2021 – současnost",
            "WorkExperience.Title": "Software Developer",
            "WorkExperience.Company": "Proconom Software s.r.o., Liberec",
            "WorkExperience.CadBimVisualization": "Vývoj webových aplikací pro 3D vizualizaci CAD/BIM modelů",
            "WorkExperience.ForgeViewer": "Autodesk Forge Viewer – projekt vedu a vyvíjím od začátku",
            "WorkExperience.ThreeJsViewer":
                "Prohlížečka 3D modelů v Three.js – vytvořena od základu pro webové prostředí",
            "WorkExperience.PointCloud": "Implementace a vizualizace vlastních formátů point cloudových modelů",
            "WorkExperience.FrontendStack": "Frontend: React, TypeScript, Autodesk Forge Viewer, Three.js",
            "WorkExperience.BackendStack": "Backend: .NET (C#), REST API",
            "WorkExperience.BigDataOptimization": "Práce s velkými daty (optimalizace načítání a zpracování JSON)",
            "WorkExperience.IfcMetadata": "Vlastní zpracování a vizualizace metadat IFC souborů",
            "WorkExperience.CollisionDetection": "Implementace detekce kolizí 3D modelů",
            "WorkExperience.BcfImportExport": "Import a export BCF (BIM Collaboration Format)",
            "WorkExperience.ArVrDevelopment": "Vývoj AR/VR aplikací v Unity (C#)",

            TechnicalSkills: "Technické dovednosti",
            "TechnicalSkills.Frontend": "Frontend",
            "TechnicalSkills.Backend": "Backend",
            "TechnicalSkills.3dVisualization": "3D & Vizualizace",
            "TechnicalSkills.CloudDevOps": "Cloud & DevOps",
            "TechnicalSkills.Database": "Databáze",

            Education: "Vzdělání",
            "Education.Period": "2016 – 2022",
            "Education.University": "Technická univerzita v Liberci",
            "Education.Degree": "Bc. – Strojírenství",
            "Education.ThesisLabel": "Bakalářská práce:",
            "Education.ThesisTitle": "Návrh a realizace digitálního dvojčete vychystávací linky (Unity, C#)",
            "Education.ThesisLink": "Zobrazit práci",

            "Education.HighSchool.Period": "2012 – 2016",
            "Education.HighSchool.Name": "Střední průmyslová škola, Česká Lípa",
            "Education.HighSchool.Field": "Strojírenství",

            Certifications: "Certifikace",

            Projects: "Další projekty",
            "Projects.UnityGames": "Mobilní hry v Unity",
            "Projects.UnityGamesDesc":
                "Jednu vlastní mobilní hru se mi podařilo nahrát na Google Play (bohužel je neaktivní a stáhli ji) a další jsem ukončil před dokončením.",
            "Projects.Experimental": "Experimentální projekty",
            "Projects.ExperimentalDesc": "Oblast 3D a vizualizace",
            "Projects.WordGame": "Hádej slovo – firemní webová hra",
            "Projects.WordGameDesc":
                "Fullstack webová aplikace s React frontendem a vlastním .NET backendem (REST API).",
            "Projects.CodingGames": "Kódovací výzvy",
            "Projects.CodingGamesDesc": "Řešení algoritmických úloh a kódovacích výzev na platformě codingame.com",

            Languages: "Jazyky",
            "Languages.Czech": "Čeština",
            "Languages.English": "Angličtina",
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
