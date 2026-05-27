import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { he } from "./languages/he";
import { en } from "./languages/en";

const resources = {
  he: { translation: he },
  en: { translation: en },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("lang") || "he",
  fallbackLng: "he",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;