import React from "react";
import "./ServiceCard.css";
import { HiArrowLongRight } from "react-icons/hi2";


const ServiceCard = ({ icon, title, description}) => {
  return (
    <div className="service-card">
      <div className="icon-container">
        {icon}
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default ServiceCard;
