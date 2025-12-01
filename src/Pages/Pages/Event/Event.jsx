import EventCard from "../../../Components/eventCard/EventCard";
import "./Event.css";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function Event() {
  const { i18n } = useTranslation();
  const [events, setEvents] = useState([]);

  // ----------------------
  // Fetch Events
  // ----------------------
  const fetchEvents = async (lang) => {
    try {
      const res = await fetch(`http://localhost:1911/getAllEvents?lang=${lang}`);
      const data = await res.json();
      setEvents(data);
    } catch {
      setEvents([]); 
    }

  }
  // Run When Language Changes
  useEffect(() => {
    fetchEvents(i18n.language);
  }, [i18n.language]);

  return (
    <div className="container eventcardcontainer px-0 mx-0">
      <div className="row g-4">

        {/* Empty State فقط */}
        {events.length === 0 && (
          <div className="col-12 text-center py-4">
            No events available
          </div>
        )}

        {/* Events List */}
        {events.map((event, i) => (
          <div className="col-xl-4 col-lg-6 col-md-6" key={event._id || i}>
            <EventCard event={event} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Event;
