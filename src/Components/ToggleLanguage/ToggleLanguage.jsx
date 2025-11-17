import { useState } from "react";
import "./ToggleLanguage.css";
import { changeLanguage } from "../../utils/i18n/i18n";
import { useEffect } from "react";

const ToggleLanguage = () => {
  const [isChecked, setIsChecked] = useState(false);
  useEffect(() => {
    const newLang = isChecked ? "ar" : "en";
    changeLanguage(newLang);
  },[isChecked]);
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
