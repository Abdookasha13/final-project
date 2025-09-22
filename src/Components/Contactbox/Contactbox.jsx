import React from "react";
// eslint-disable-next-line no-unused-vars
const Contactbox = ({ Icon, label, children }) => {
  return (
    <div className="contact-item d-flex flex-column flex-md-row  gap-4">
      <div className="icondiv">
        <span className="iconspan">
          <Icon color="#0ab99d" fontSize="18px" />
        </span>
      </div>
      <div>
        <span className="contact-label">{label}</span>
        {children}
      </div>
    </div>
  );
};

export default Contactbox;
