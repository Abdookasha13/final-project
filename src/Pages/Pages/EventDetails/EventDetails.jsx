import "./EventDetails.css";
import Button from "./../../../Components/Button/Button";
import { FaBookOpen, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import getEventById from "../../../utilities/getEventById";
import { useTranslation } from "react-i18next";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  const { t, i18n } = useTranslation();
  const lang = i18n.language.startsWith("ar") ? "ar" : "en";

  useEffect(() => {
    getEventById(id, setEvent);
    document.title = t("eventDetails.pageTitle");
  }, [id, i18n.language]);

  if (!event) {
    return <div className="text-center py-5">Loading...</div>;
  }

  return (
    <section className="course-details-roka container mt-5 mb-5">
      <div className="row g-4">
        <div className="col-lg-8">
          <div className="course-image-roka mb-4">
            <img
              src={event.eventImage}
              className="img-fluid rounded-3"
              alt={event.title?.[lang]}
            />
          </div>

          <div className="course-title-roka">
            <h4>{event.title?.[lang]}</h4>

            <div className="course-meta-roka d-flex flex-wrap align-items-center gap-4 mt-3">
              <div className="meta-item d-flex align-items-center gap-2">
                <FaBookOpen className="meta-icon" />
                <span>{t("eventDetails.lessons")}</span>
              </div>

              <div className="meta-item d-flex align-items-center gap-2">
                <FaClock className="meta-icon" />
                <span>{event.startTime} - {event.endTime}</span>
              </div>

              <div className="meta-item d-flex align-items-center gap-2">
                <FaMapMarkerAlt className="meta-icon" />
                <span>{event.location?.[lang]}</span>
              </div>
            </div>
          </div>

          <br />

          <div className="course-content-roka">
            <p>{t("eventDetails.introText")}</p>

            <h5>{t("eventDetails.descriptionTitle")}</h5>

            <p>{event.description?.[lang]}</p>
          </div>
        </div>

        {/* Right Side */}
        <div className="col-lg-4">
          <div className="course-sidebar-roka shadow-sm p-3 rounded-3">
            <img
              src="https://ordainit.com/html/educate/assets/img/event/details-sm.jpg"
              alt="event"
              className="img-fluid rounded mb-3"
            />

            <Button>{t("eventDetails.buyTicket")}</Button>

            <ul className="list-unstyled-roka m-0 mt-3">
              <li>{event.startTime} - {event.endTime}</li>
              <li>{event.date}</li>
              <li>{event.location?.[lang]}</li>
              <li>{t("eventDetails.email")}</li>
              <li>{t("eventDetails.phone")}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
