import { useEffect, useState } from "react";
import "./ToggleLanguage.css";
import { useTranslation } from "react-i18next";

const ToggleLanguage = () => {
  const [isChecked, setIsChecked] = useState(false);
  const { i18n } = useTranslation();

  useEffect(() => {
    if (isChecked) {
      i18n.changeLanguage("ar");
      // document.documentElement.setAttribute("dir", "rtl");
    } else {
      i18n.changeLanguage("en");
      // document.documentElement.setAttribute("dir", "ltr");
    }
  }, [isChecked, i18n]);

  return (
    <div className="flipswitch">
      <input
        id="fs"
        className="flipswitch-cb"
        name="flipswitch"
        type="checkbox"
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
      />

      <label htmlFor="fs" className="flipswitch-label">
        <div className="flipswitch-inner"></div>
        <div className="flipswitch-switch"></div>
      </label>
    </div>
  );
};

export default ToggleLanguage;
