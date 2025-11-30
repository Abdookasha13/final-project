import { useEffect, useState } from "react";
import EventCard from "../../../Components/eventCard/EventCard";
import "./Event.css";
import getAllEvents from "../../../utilities/getAllEvents";

function Event() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getAllEvents(setEvents);
    document.title = "Events";
  }, []);

  return (
    <div>
      <div className=" eventcardcontainer ">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 ">
          {events?.map((event) => (
            <div className="col" key={event._id}>
            <EventCard
              event={event}
            />
          </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Event;
