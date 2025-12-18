import { IoLocationOutline } from "react-icons/io5";
import "./EventCard.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const EventCard = ({ event }) => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith("ar") ? "ar" : "en";

  const d = new Date(event.date);
  const day = d.getDate().toString().padStart(2, "0");
  const month = d.toLocaleString(lang === "ar" ? "ar" : "en", {
    month: "long",
  });

  return (
    <div
      className="eventcard-item bg-light"
      onClick={() => navigate(`/event/details/${event._id}`)}
    >
      <div className="eventcard-img">
        <img src={event.eventImage} alt="" />
        <div className="eventcard-imgtext p-5">
          <span className="eventnum">{day}</span>
          <span>{month}</span>
        </div>
      </div>

      <div className="eventcard-itemcontent">
        <h4 className="eventcard-title">
          {event.title?.[lang] || event.title?.en}
        </h4>

        <div className="eventcard-text">
          <p className="eventcard-para">
            {event.description?.[lang] || event.description?.en}
          </p>
        </div>

        <div className="eventcard-iteminfo d-flex flex-column flex-xl-row gap-3">
          <span>
            <i className="fa-sharp fa-regular fa-clock"></i> {event.startTime} -{" "}
            {event.endTime}
          </span>

          <span>
            <IoLocationOutline fontSize="18px" color="#f2a227" />{" "}
            {event.location?.[lang] || event.location?.en}
          </span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
