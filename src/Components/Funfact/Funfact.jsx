import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./Funfact.css";
// countersData moved to module scope so it's stable and doesn't trigger useEffect linter warning
const countersData = [
  {
    id: 1,
    icon: "fa-regular fa-user",
    end: 3,
    labelKey: "funfact.items.0.label",
  },
  {
    id: 2,
    icon: "fa-regular fa-handshake",
    end: 15,
    labelKey: "funfact.items.1.label",
  },
  {
    id: 3,
    icon: "fa-solid fa-users",
    end: 97,
    labelKey: "funfact.items.2.label",
  },
  {
    id: 4,
    icon: "fa-solid fa-user-graduate",
    end: 102,
    labelKey: "funfact.items.3.label",
  },
];


function Funfact() {
  const { t } = useTranslation();
  const [counts, setCounts] = useState(countersData.map(() => 0));

  useEffect(() => {
    const timers = countersData.map((counter, index) => {
      let start = 0;
      const end = counter.end;
      const duration = 2000;
      const incrementTime = 30;
      const step = end / (duration / incrementTime);

      return setInterval(() => {
        start += step;
        if (start >= end) {
          setCounts((prev) => {
            const updated = [...prev];
            updated[index] = end;
            return updated;
          });
          clearInterval(timers[index]);
        } else {
          setCounts((prev) => {
            const updated = [...prev];
            updated[index] = Math.floor(start);
            return updated;
          });
        }
      }, incrementTime);
    });

    return () => timers.forEach((timer) => clearInterval(timer));
  }, []);

  return (
    <div className="it-funfact-area z-index-5">
      <div className="container">
        <div className="it-funfact-bg-wrap theme-bg">
          <div className="row gx-0 justify-content-between">
            {countersData.map((item, index) => (
              <div
                key={item.id}
                className="col-xl-3 col-lg-3 col-md-6 col-sm-6"
              >
                <div className="it-funfact-item d-flex align-items-center gap-3">
                  <div className="it-funfact-icon">
                    <i className={item.icon}></i>
                  </div>
                  <div className="it-funfact-content text-start">
                    <h6>{counts[index]}k+</h6>
                    <span>{t(item.labelKey)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Funfact;