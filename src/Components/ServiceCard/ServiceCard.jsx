import "./ServiceCard.css";
import Button from "./../Button/Button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ServiceCard = ({ service }) => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith("ar") ? "ar" : "en";

  return (
    <div className="service-card-roka text-center p-4">
      <div className="icon-wrapper-roka mx-auto mb-4 mt-3">
        <i className={service.icon || "fa-solid fa-graduation-cap"}></i>
      </div>

      <h3 className="service-title-roka my-2">{service.title[lang]}</h3>

      <p className="service-desc-roka mb-4">{service.description[lang]}</p>

      <div
        className="mx-auto"
        style={{ width: "fit-content" }}
        onClick={() => navigate(`/service/details/${service._id}`)}
      >
        <Button>View Details</Button>
      </div>
    </div>
  );
};

export default ServiceCard;
