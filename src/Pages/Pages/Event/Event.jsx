import EventCard from "../../../Components/eventCard/EventCard";
import "./Event.css";

function Event() {
  return (
    <div>
      <div className="container eventcardcontainer px-0 mx-0 ">
        <div className="row g-4 ">
          <div className="col-xl-4 col-lg-6 col-md-6">
            <EventCard
              imgSrc={
                "https://ordainit.com/html/educate/assets/img/event/event-1-1.jpg"
              }
              title={"print, and publishing industries for previewing"}
              month={"October"}
              date={"08"}
            />
          </div>

          <div className="col-xl-4 col-lg-6 col-md-6">
            <EventCard
              imgSrc={
                "https://ordainit.com/html/educate/assets/img/event/event-1-2.jpg"
              }
              title={"print, and publishing industries for previewing"}
              month={"October"}
              date={"05"}
            />
          </div>

          <div className="col-xl-4 col-lg-6 col-md-6">
            <EventCard
              imgSrc={
                "https://ordainit.com/html/educate/assets/img/event/event-1-3.jpg"
              }
              title={"print, and publishing industries for previewing"}
              month={"April"}
              date={"25"}
            />
          </div>

          <div className="col-xl-4 col-lg-6 col-md-6">
            <EventCard
              imgSrc={
                "https://ordainit.com/html/educate/assets/img/event/event-1-1.jpg"
              }
              title={"print, and publishing industries for previewing"}
              month={"October"}
              date={"08"}
            />
          </div>

          <div className="col-xl-4 col-lg-6 col-md-6">
            <EventCard
              imgSrc={
                "https://ordainit.com/html/educate/assets/img/event/event-1-2.jpg"
              }
              title={"print, and publishing industries for previewing"}
              month={"October"}
              date={"05"}
            />
          </div>

          <div className="col-xl-4 col-lg-6 col-md-6">
            <EventCard
              imgSrc={
                "https://ordainit.com/html/educate/assets/img/event/event-1-3.jpg"
              }
              title={"print, and publishing industries for previewing"}
              month={"April"}
              date={"25"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Event;
