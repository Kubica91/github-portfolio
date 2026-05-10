import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    cs: {
        translation: {
            OpenToOpportunities: "Otevřený novým příležitostem",
            Subtitle: "Fullstack Developer (React / .NET) · 3D & Vizualizace",
            Location: "Liberec / Remote",
            DownloadPdf: "Stáhnout CV jako PDF",

            Profile: "Profil",
            "Profile.Focus":
                "Fullstack developer. Stavím webové aplikace, 3D vizualizace a cloudová řešení v Reactu a .NET.",
            "Profile.CadBimExperience":
                "Přes 5 let vyvíjím aplikace pro práci s CAD/BIM modely, včetně interaktivní 3D vizualizace ve webu a backendu v .NET.",
            "Profile.AdditionalSkills": "V Unity vyvíjím AR/VR aplikace a mobilní hry pro Android i iOS.",

            WorkExperience: "Pracovní zkušenosti",
            "WorkExperience.Period": "04/2021 - současnost",
            "WorkExperience.Title": "Software Developer",
            "WorkExperience.Company": "Proconom Software s.r.o., Liberec",
            "WorkExperience.CadBimVisualization": "Webové aplikace pro 3D vizualizaci CAD/BIM modelů",
            "WorkExperience.ForgeViewer": "Autodesk Forge Viewer - vedu a vyvíjím od začátku",
            "WorkExperience.ThreeJsViewer": "3D prohlížečka v Three.js - vytvořena od základu",
            "WorkExperience.PointCloud": "Implementace vlastních formátů point cloudových modelů",
            "WorkExperience.FrontendStack": "Frontend: React, TypeScript, Forge Viewer, Three.js",
            "WorkExperience.BackendStack": "Backend: .NET (C#), REST API",
            "WorkExperience.BigDataOptimization": "Optimalizace načítání a zpracování velkých JSON dat",
            "WorkExperience.IfcMetadata": "Zpracování a vizualizace metadat IFC souborů",
            "WorkExperience.CollisionDetection": "Detekce kolizí 3D modelů",
            "WorkExperience.BcfImportExport": "Import a export BCF (BIM Collaboration Format)",
            "WorkExperience.ArVrDevelopment": "AR/VR aplikace v Unity (C#)",

            TechnicalSkills: "Technické dovednosti",
            "TechnicalSkills.Frontend": "Frontend",
            "TechnicalSkills.Backend": "Backend",
            "TechnicalSkills.3dVisualization": "3D & Vizualizace",
            "TechnicalSkills.CloudDevOps": "Cloud & DevOps",
            "TechnicalSkills.Database": "Databáze",

            Education: "Vzdělání",
            "Education.Period": "2016 - 2022",
            "Education.University": "Technická univerzita v Liberci",
            "Education.Degree": "Bc. - Strojírenství",
            "Education.ThesisLabel": "Bakalářská práce:",
            "Education.ThesisTitle": "Návrh a realizace digitálního dvojčete vychystávací linky (Unity, C#)",
            "Education.ThesisLink": "Zobrazit práci",

            "Education.HighSchool.Period": "2012 - 2016",
            "Education.HighSchool.Name": "Střední průmyslová škola, Česká Lípa",
            "Education.HighSchool.Field": "Strojírenství",

            Certifications: "Certifikace",

            Projects: "Další projekty",
            "Projects.UnityGames": "Mobilní hry v Unity",
            "Projects.UnityGamesDesc":
                "Vlastní mobilní hra publikovaná na Google Play (dnes stažena). Další projekty rozpracované.",
            "Projects.Experimental": "Experimentální projekty",
            "Projects.ExperimentalDesc": "3D a vizualizace",
            "Projects.WordGame": "Hádej slovo - firemní webová hra",
            "Projects.WordGameDesc": "Fullstack aplikace: React frontend, .NET backend (REST API).",
            "Projects.CodingGames": "Kódovací výzvy",
            "Projects.CodingGamesDesc": "Algoritmické úlohy na codingame.com",

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
