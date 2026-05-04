import { useTranslation } from "react-i18next";

export function useLang() {
  const { i18n } = useTranslation();

  const setLang = (lang: "he" | "en") => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);

    document.documentElement.dir = lang === "he" ? "rtl" : "ltr";
  };

  return {
    lang: i18n.language,
    setLang,
  };
}