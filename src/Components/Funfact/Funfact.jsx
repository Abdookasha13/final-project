import React from 'react'
import { useEffect, useState } from "react";

import "./Funfact.css"

// countersData moved to module scope so it's stable and doesn't trigger useEffect linter warning
const countersData = [
  { id: 1, icon: "fa-regular fa-user", end: 3, label: "Successfully Trained" },
  {
    id: 2,
    icon: "fa-regular fa-handshake",
    end: 15,
    label: "Classes Completed",
  },
  { id: 3, icon: "fa-solid fa-users", end: 97, label: "Satisfaction Rate" },
  {
    id: 4,
    icon: "fa-solid fa-user-graduate",
    end: 102,
    label: "Students Community",
  },
];


function Funfact() {
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
          setCounts((prevCounts) => {
            const newCounts = [...prevCounts];
            newCounts[index] = end;
            return newCounts;
          });
          clearInterval(timers[index]);
        } else {
          setCounts((prevCounts) => {
            const newCounts = [...prevCounts];
            newCounts[index] = Math.floor(start);
            return newCounts;
          });
        }
      }, incrementTime);
    });

    return () => {
      timers.forEach((timer) => clearInterval(timer));
    };
  }, []);

  return (
    <>
      {/* ----------- Fun Fact Section ----------- */}
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
                      <span>{item.label}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Funfact