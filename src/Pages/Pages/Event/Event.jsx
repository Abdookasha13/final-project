
import EventCard from "../../../Components/eventCard/EventCard";
import "./Event.css";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function Event() {
  const { i18n } = useTranslation();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ----------------------
  // Fetch Events Function
  // ----------------------
  const fetchEvents = async (lang) => {
  try {
    setLoading(true);
    setError(null);

    // Fetch From API
    const res = await fetch(`http://localhost:1911/getAllEvents?lang=${lang}`);
    if (!res.ok) throw new Error("Failed to load events");

    const data = await res.json();

    // Update React state
    setEvents(data);

    // Save to Cache (optional)
    localStorage.setItem(`events_${lang}`, JSON.stringify(data));
  } catch (e) {
    setError(e.message);
    setEvents([]);
  } finally {
    setLoading(false);
  }
};


  // Run When Language Changes
  useEffect(() => {
    fetchEvents(i18n.language);
  }, [i18n.language]);

  return (
    <div className="container eventcardcontainer px-0 mx-0">
      <div className="row g-4">
        {/* Loading */}
        {loading && (
          <div className="col-12 text-center py-4">Loading...</div>
        )}

        {/* Error */}
        {error && (
          <div className="col-12 text-danger text-center py-4">{error}</div>
        )}

        {/* Empty */}
        {!loading && !error && events.length === 0 && (
          <div className="col-12 text-center py-4">
            No events available
          </div>
        )}

        {/* Events List */}
        {!loading &&
          !error &&
          events.map((event, i) => (
            <div className="col-xl-4 col-lg-6 col-md-6" key={event._id || i}>
              <EventCard event={event} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default Event;
