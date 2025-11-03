import { IoLocationOutline } from "react-icons/io5";
import "./EventCard.css";

const EventCard = ({ imgSrc, title, month, date }) => {
  return (
    <>
      <div className="eventcard-item  bg-light ">
        <div className="eventcard-img ">
          <a href="#">
            {" "}
            <img src={imgSrc} alt="" />
          </a>
          <div className="eventcard-imgtext">
            <span className="eventnum">{date}</span>
            <span>{month}</span>
          </div>
        </div>

        <div className="eventcard-itemcontent">
          <h4 className="eventcard-title">
            <a href="#">{title}</a>
          </h4>
          <div className="eventcard-text">
            <p className="eventcard-para">
              Lorem ipsum dolor sit amet, consectetur elit, sed doeiusmod tempor
            </p>
          </div>
          <div className="eventcard-iteminfo d-flex flex-column flex-xl-row gap-3 ">
            <span>
              {" "}
              <i className="fa-sharp fa-regular fa-clock"></i> Time: 11:00am
              03;00pm
            </span>
            <span>
              {" "}
              <IoLocationOutline fontSize={"18px"} color="#f2a227" /> Location:
              USA
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventCard;
