import "./ServiceCard.css";
import Button from "./../Button/Button";
import { useNavigate } from "react-router-dom";
const ServiceCard = ({ service }) => {
  const navigate = useNavigate();
  return (
    <div className="service-card-roka text-center p-4">
      <div className="icon-wrapper-roka mx-auto mb-4">
        <i className={service.icon || "fa-solid fa-graduation-cap"}></i>
      </div>
      <h3 className="service-title-roka my-2">{service.title}</h3>
      <p className="service-desc-roka mb-4">{service.description}</p>
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
