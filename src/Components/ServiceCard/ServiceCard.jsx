import "./ServiceCard.css";
import Button from "./../Button/Button";

const ServiceCard = ({ icon, title, description }) => {
  return (
    <div className="service-card-roka text-center p-5">
      <div className="icon-wrapper-roka mx-auto mb-3">{icon}</div>
      <h3 className="service-title-roka mb-2">{title}</h3>
      <p className="service-desc-roka mb-4">{description}</p>
      <Button >View Details</Button>
    </div>
  );
};

export default ServiceCard;
