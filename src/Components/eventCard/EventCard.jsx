import { IoLocationOutline } from "react-icons/io5";
import "./EventCard.css";
import { useNavigate } from "react-router-dom";

const EventCard = ({ event }) => {
  const d = new Date(event.date);
  const day = d.getDate().toString().padStart(2, "0");
  const month = d.toLocaleString("default", { month: "long" });
  const navigate=useNavigate();
  return (
    <>
      <div className="eventcard-item bg-light" onClick={()=>navigate(`/event/details/${event._id}`)}>
        <div className="eventcard-img">
          <a href="#">
            <img src={event.eventImage} alt="" />
          </a>
          <div className="eventcard-imgtext p-5">
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
          <div className="eventcard-iteminfo d-flex flex-column flex-xl-row gap-3 ">
            <span>
              {" "}
              <i className="fa-sharp fa-regular fa-clock"></i> Time:{" "}
              {event.time}
            </span>
            <span>
              <IoLocationOutline fontSize={"18px"} color="#f2a227" /> Location:{" "}
              {event.location}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventCard;
