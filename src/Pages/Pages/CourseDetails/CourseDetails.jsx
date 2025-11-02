import React from "react";
import "./CourseDetails.css";
import instructorImg from "../../../assets/images/instructorImg.jpg";
import courseImg from "../../../assets/images/courseImg.jpg";
import Button from "./../../../Components/Button/Button";

const CourseDetails = () => {
  return (
    <section className="course-details-roka container mt-5 mb-5">
      <div className="row g-4">
        {/* الجزء اليسار */}
        <div className="col-lg-8">
          <div className="course-image-roka mb-4">
            <img src={courseImg} alt="course" className="img-fluid rounded-3" />
          </div>

          <div className="course-title-roka">
            <h4>Web Development Fully Complete Guideline</h4>
            <p className="text-muted small">
              <i className="bi bi-calendar3"></i> 20/04/2024 - 01/06/2024 &nbsp;
              | &nbsp;
              <i className="bi bi-people"></i> 35+ Students
            </p>
            <div className="course-rating-roka mb-3">
              ⭐⭐⭐⭐☆ <span>(4.5)</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="course-tabs-roka mb-4">
            <button className="active">Overview</button>
            <button>Curriculum</button>
            <button>Instructor</button>
            <button>Reviews</button>
          </div>

          {/* المحتوى */}
          <div className="course-content-roka">
            <h5>Course Description</h5>
            <p>
              Learn JavaScript, HTML, and CSS from scratch. Gain real-world
              experience through projects and exercises designed to help you
              master web development step by step. This course is ideal for
              beginners and intermediate learners.
            </p>

            <h5>What Will I Learn From This Course?</h5>
            <p>
              You’ll learn modern JavaScript, responsive design, and advanced
              HTML/CSS. By the end, you’ll be able to build interactive
              websites, handle dynamic content, and apply industry-standard
              practices in web development.
            </p>
          </div>
        </div>

        {/* الجزء اليمين */}
        <div className="col-lg-4">
          <div className="course-sidebar-roka shadow-sm p-3 rounded-3">
            <img
              src={instructorImg}
              alt="instructor"
              className="img-fluid rounded mb-3"
            />
            <div className="course-info-roka">
              <p className="course-label-roka">Course Fee</p>
              <div className="course-price-roka">
                <span className="current-price-roka">$60</span>
                <span className="old-price-roka">$120</span>
              </div>
            </div>
             <p className="guarantee-text-roka">29-Day Money-Back Guarantee</p>
            <Button>Buy Ticket</Button>

            <ul className="list-unstyled m-0">
              <li>
                <strong>enrolled:</strong> 100
              </li>
              <li>
                <strong>lectures:</strong> 80
              </li>
              <li>
                <strong>Skill Level:</strong> Beginner
              </li>
              <li>
                <strong>Class Day:</strong> Monday - Friday
              </li>
              <li>
                <strong>Language:</strong> English
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseDetails;
