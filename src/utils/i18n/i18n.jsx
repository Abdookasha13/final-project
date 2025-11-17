
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./locales/en/en.json";
import arTranslation from "./locales/ar/ar.json";

const resources = {
  en: { translation: enTranslation },
  ar: { translation: arTranslation },
};


// قراءة اللغة من URL أو localStorage أو default
const urlLang = new URL(window.location.href).searchParams.get("lang");
const storedLang = localStorage.getItem("lang");
const initialLang = ["en", "ar"].includes(urlLang) ? urlLang : storedLang || "en";

i18n.use(initReactI18next).init({
  resources,
  lng: initialLang,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

// دالة لتغيير اللغة
export const changeLanguage = (lang) => {
  i18n.changeLanguage(lang);
  localStorage.setItem("lang", lang);
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  document.documentElement.lang = lang;

  const url = new URL(window.location.href);
  url.searchParams.set("lang", lang);
  window.history.replaceState({}, "", url);
};

export default i18n;
