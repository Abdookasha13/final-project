// import EventCard from "../../../Components/eventCard/EventCard";
// import "./Event.css";
// import { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";

// function Event() {
//   const { i18n } = useTranslation();
//   const [events, setEvents] = useState([]);

//   const loadEvents = async (lang) => {
//     const storedData = localStorage.getItem(`events_${lang}`);
//     if (storedData) {
//       setEvents(JSON.parse(storedData));
//     } else {
//       const res = await fetch(`http://localhost:1911/api/events?lang=${lang}`);
//       const data = await res.json();
//       localStorage.setItem(`events_${lang}`, JSON.stringify(data));
//       setEvents(data);
//     }
//   };

//   useEffect(() => {
//     loadEvents(i18n.language);
//   }, []);

//   useEffect(() => {
//     loadEvents(i18n.language);
//   }, [i18n.language]);

//   return (
//     <div>
//       <div className="container eventcardcontainer px-0 mx-0 ">
//         <div className="row g-4">
//           {events.map((event, i) => (
//             <div className="col-xl-4 col-lg-6 col-md-6" key={i}>
//               <EventCard event={event} />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Event;

import EventCard from "../../../Components/eventCard/EventCard";
import "./Event.css";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function Event() {
  const { i18n } = useTranslation();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // ---- Fetch Function ----
  const fetchEvents = async (lang) => {
    // console.log("Fetching events for language:", lang);
    try {
      setLoading(true);
      setError(null);

      // Check LocalStorage
      const stored = localStorage.getItem(`events_${lang}`);
      if (stored) {
        setEvents(JSON.parse(stored));
        setLoading(false);
        return;
      }

      // Fetch from API
      const res = await fetch(
        `http://localhost:1911/getAllEvents?lang=${lang}`
      );
      // console.log(res);
      if (!res.ok) throw new Error("Failed to load events");

      const data = await res.json();

      // Save to LocalStorage
      localStorage.setItem(`events_${lang}`, JSON.stringify(data));
      setEvents(data);
    } catch (e) {
      setError(e.message);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  // Run when language changes
  useEffect(() => {
    fetchEvents(i18n.language);
  }, [i18n.language]);

  return (
    <div className="container eventcardcontainer px-0 mx-0 ">
      <div className="row g-4">
        {loading && <div className="col-12 text-center py-4">Loading...</div>}
        {error && (
          <div className="col-12 text-danger text-center py-4">{error}</div>
        )}
        {!loading && !error && events.length === 0 && (
          <div className="col-12 text-center py-4">No events available</div>
        )}

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
