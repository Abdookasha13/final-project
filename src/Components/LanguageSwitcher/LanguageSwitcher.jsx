import React from "react";
import { useTranslation } from "react-i18next";
import { changeLanguage } from "../../utils/i18n/i18n";
import { FaGlobe } from "react-icons/fa";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    changeLanguage(newLang);
  };

  return (
    <button 
      onClick={toggleLanguage} 
      className="language-switcher-btn"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "5px",
        padding: "5px 10px",
        cursor: "pointer",
      }}
    >
      <FaGlobe />
      {i18n.language === "en" ? "العربية" : "English"}
    </button>
  );
};

export default LanguageSwitcher;
