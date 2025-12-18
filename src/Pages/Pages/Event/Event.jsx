import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import EventCard from "../../../Components/eventCard/EventCard";
import "./Event.css";
import getAllEvents from "../../../utilities/getAllEvents";

function Event() {
  const [events, setEvents] = useState([]);
  const { i18n } = useTranslation();

  useEffect(() => {
    getAllEvents(setEvents, i18n.language);
    document.title = "Events";
  }, [i18n.language]); 

  return (
    <div>
      <div className="eventcardcontainer">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {events?.length === 0 && (
            <div className="col-12 text-center py-4">
              No events available
            </div>
          )}

          {events?.map((event) => (
            <div className="col" key={event._id}>
              <EventCard event={event} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Event;
