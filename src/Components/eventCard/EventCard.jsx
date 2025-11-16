// import { IoLocationOutline } from "react-icons/io5";
// import "./EventCard.css";
// import { useTranslation } from "react-i18next";

// const EventCard = ({ event }) => {
//   const { i18n } = useTranslation();
//   const lang = i18n.language;

//   const eventDate = new Date(event.date);
//   const day = eventDate.getDate();
//   const month = eventDate.toLocaleString(lang, { month: "long" });

//   return (
//     <>
//       <div className="eventcard-item  bg-light ">
//         <div className="eventcard-img">
//           <img
//             src={event.eventImage || "https://via.placeholder.com/400"}
//             alt="Event"
//           />
//           <div className="eventcard-imgtext">
//             <span className="eventnum">{day}</span>
//             <span>{month}</span>
//           </div>
//         </div>

//         <div className="eventcard-itemcontent">
//           <h4 className="eventcard-title">{event.title}</h4>
//           <p className="eventcard-para">{event.description}</p>

//           <div className="eventcard-iteminfo d-flex flex-column flex-xl-row gap-3">
//             <span>
//               <i className="fa-sharp fa-regular fa-clock"></i>
//               Time: 11:00am - 03:00pm
//             </span>

//             <span>
//               <IoLocationOutline fontSize="18px" color="#f2a227" />
//               {event.location}
//             </span>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default EventCard;

function EventCard({ event }) {
  return (
    <div className="event-card">
      <img src={event.eventImage} alt="" />
      <h3>{event.title}</h3>
      <p>{event.description}</p>

      <div className="date">
        {new Date(event.date).getDate()}  
        {" "}
        {new Date(event.date).toLocaleString(undefined, { month: "long" })}
      </div>

      <span>{event.location}</span>
    </div>
  );
}

export default EventCard;
