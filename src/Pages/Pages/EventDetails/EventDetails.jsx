import "./EventDetails.css";
import Button from "./../../../Components/Button/Button";
import { FaBookOpen, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useState } from "react";
import getEventById from "../../../utilities/getEventById";
const EventDetails = () => {
  const {id}=useParams();
  const [event, setEvent]= useState(null);

  useState(() => {
    getEventById(id, setEvent);
    document.title = "Event Details";
  }, [id]);

  return (
    <section className="course-details-roka container mt-5 mb-5">
      <div className="row g-4">
        <div className="col-lg-8">
          <div className="course-image-roka mb-4">
            <img src={event?.eventImage}   className="img-fluid rounded-3" />
          </div>

          <div className="course-title-roka">
            <h4>
              {event?.title}
            </h4>

            <div className="course-meta-roka d-flex flex-wrap align-items-center gap-4 mt-3">
              <div className="meta-item d-flex align-items-center gap-2">
                <FaBookOpen className="meta-icon" />
                <span>Lesson 10</span>
              </div>
              <div className="meta-item d-flex align-items-center gap-2">
                <FaClock className="meta-icon" />
                <span>{event?.time}</span>
              </div>
              <div className="meta-item d-flex align-items-center gap-2">
                <FaMapMarkerAlt className="meta-icon" />
                <span>{event?.location}</span>
              </div>
            </div>
          </div>
          <br />

          <div className="course-content-roka">
            <p>
              Learn JavaScript, HTML, and CSS from scratch. Gain real-world
              experience through projects and exercises designed to help you
              master web development step by step. This course is ideal for
              beginners and intermediate learners.
            </p>

            <h5>Event Description</h5>
            <p>
              {event?.description}
            </p>
          </div>
        </div>

        {/* الجزء اليمين */}
        <div className="col-lg-4">
          <div className="course-sidebar-roka shadow-sm p-3 rounded-3">
            <img
              src="https://ordainit.com/html/educate/assets/img/event/details-sm.jpg"
              alt="instructor"
              className="img-fluid rounded mb-3"
            />

            <Button>Buy Ticket</Button>

            <ul className="list-unstyled-roka m-0 mt-3">
              <li>4:00 PM   6:00 PM</li>
              <li>25 January , 2024</li>
              <li>3783 Columbia Mine Road</li>
              <li>Shinnston , WV 26431</li>
              <li>Infomail@Gmail.Com</li>
              <li>+9870123456789</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
