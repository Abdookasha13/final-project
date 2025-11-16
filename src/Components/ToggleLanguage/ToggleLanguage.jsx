import { useState } from "react";
import "./ToggleLanguage.css";

const ToggleLanguage = () => {
  const [isChecked, setIsChecked] = useState(false);

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
