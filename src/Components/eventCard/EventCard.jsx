import { useTranslation } from "react-i18next";
import { IoLocationOutline } from "react-icons/io5";
import "./EventCard.css";

function EventCard({ event }) {
   const { t, i18n } = useTranslation();
  const lang = i18n.language || "en";
  const eventDate = new Date(event.date);
  const day = eventDate.getDate();
  const month = eventDate.toLocaleString(undefined, { month: "long" });
 
  
  return (
    <div className="eventcard-item bg-light">
      <div className="eventcard-img">
        <a href="#">
          <img src={event.eventImage} alt="" />
        </a>

        <div className="eventcard-imgtext">
          <span className="eventnum">{day}</span>
          <span>{month}</span>
        </div>
      </div>

      <div className="eventcard-itemcontent">
        <h4 className="eventcard-title">
          <a href="#">{event.title}</a>
        </h4>

        <div className="eventcard-text">
          <p className="eventcard-para">{event.description}</p>
        </div>

        <div className="eventcard-iteminfo justify-content-between d-flex flex-col flex-xl-row  gap-y-3">
          <span>
            <i className="fa-sharp fa-regular fa-clock"></i>
            {t("event.time")}: {event.startTime?.[lang] || ""} - {event.endTime?.[lang] || ""}{" "}
          </span>

          <span>
            <IoLocationOutline fontSize="18px" color="#f2a227" />
            {t("event.location")}: {event.location || "USA"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
