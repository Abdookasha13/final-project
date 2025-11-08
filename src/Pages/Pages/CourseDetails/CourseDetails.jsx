import "./CourseDetails.css";
import { FaRegClock, FaRegUser } from "react-icons/fa";
import { TbFileInvoice } from "react-icons/tb";
import Button from "./../../../Components/Button/Button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import getCourseById from "../../../utilities/GetCourseById";
import getLessonsByCId from "../../../utilities/getLessonsByCId";
import VideoPlayer from "../../../Components/VideoPlayer/VideoPlayer";
const CourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [activeTab, setActiveTab] = useState("Overview");
  useEffect(() => {
    getCourseById(courseId, setCourse);
    console.log("hiiii");

    getLessonsByCId(courseId, setLessons);
  }, [courseId]);
  if (!course) return <div className="text-center p-5">Loading...</div>;

  const videoList = lessons.map((lesson) => ({
    id: lesson._id,
    youtubeId: lesson.videoUrl,
    title: lesson.title,
    duration: `${lesson.duration}m`,
    type: lesson.type,
    content: lesson.content,
    isPreview: lesson.isPreview,
    order: lesson.order,
  }));

  return (
    //  <h1>{course.title}</h1>
    <section className="course-details-roka container mt-5 mb-5">
      <div className="row g-4">
        {/* الجزء اليسار */}
        <div className="col-lg-8">
          <div className="course-image-roka mb-4">
            {/* <img src="https://ordainit.com/html/educate/assets/img/event/details-1.jpg" className="img-fluid rounded-3" /> */}
            <img src={course.thumbnailUrl} className="img-fluid rounded-3" />
          </div>
          <div className="course-rating-roka mb-3">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-regular fa-star"></i>
            <span>(4.5)</span>
          </div>
          <div className="course-title-roka">
            <h4>{course.title}</h4>
          </div>
          <div className="course-meta-roka d-flex flex-wrap align-items-center gap-4 mt-3 pb-3">
            <div className="meta-item d-flex align-items-center gap-2">
              <TbFileInvoice fontSize={"20px"} />
              <span>Lesson {course.lessonsCount}</span>
            </div>
            <div className="meta-item d-flex align-items-center gap-2">
              <FaRegClock fontSize={"20px"} border />
              <span>9.00AM-01.00PM</span>
            </div>
            <div className="meta-item d-flex align-items-center gap-2">
              <FaRegUser fontSize={"20px"} />
              <span>3783 Columbia Mine Road</span>
            </div>
          </div>

          {/* Tabs */}
          {/* <div className="course-tabs-roka mb-4">
            <button className="active">Overview</button>
            <button>Curriculum</button>
            <button>Instructor</button>
            <button>Reviews</button>
          </div> */}
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <button
                className={`nav-link ${
                  activeTab === "Overview" ? "active" : ""
                }`}
                onClick={() => setActiveTab("Overview")}
              >
                Overview
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${
                  activeTab === "curriculum" ? "active" : ""
                }`}
                onClick={() => setActiveTab("curriculum")}
              >
                Curriculum
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${
                  activeTab === "Instructor" ? "active" : ""
                }`}
                onClick={() => setActiveTab("Instructor")}
              >
                Instructor
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${
                  activeTab === "Reviews" ? "active" : ""
                }`}
                onClick={() => setActiveTab("Reviews")}
              >
                Reviews
              </button>
            </li>
            {/* ... */}
          </ul>

          {activeTab === "Overview" && (
            <div className="course-content-roka">
              <h5>Course Description</h5>
              {/* <p>
              Learn JavaScript, HTML, and CSS from scratch. Gain real-world
              experience through projects and exercises designed to help you
              master web development step by step. This course is ideal for
              beginners and intermediate learners.
            </p> */}
              <p>{course.shortDescription}</p>

              <h5>What Will I Learn From This Course?</h5>
              {/* <p>
              You’ll learn modern JavaScript, responsive design, and advanced
              HTML/CSS. By the end, you’ll be able to build interactive
              websites, handle dynamic content, and apply industry-standard
              practices in web development.
            </p> */}
              <p>{course.description}</p>
            </div>
          )}
          {activeTab === "curriculum" && (
            <div>
              <VideoPlayer videos={videoList} />
            </div>
          )}
          {activeTab === "instructor" && <div>...</div>}
          {activeTab === "reviews" && <div>...</div>}

          {/* المحتوى */}
        </div>

        {/* الجزء اليمين */}
        <div className="col-lg-4">
          <div className="course-sidebar-roka shadow-sm p-3 rounded-3">
            <img
              src="https://ordainit.com/html/educate/assets/img/event/details-sm.jpg"
              alt="instructor"
              className="img-fluid rounded mb-3"
            />
            <div className="course-info-roka">
              <p className="course-label-roka">Course Fee</p>
              <div className="course-price-roka">
                <span className="current-price-roka">${course.price}</span>
                <span className="old-price-roka">${course.discountPrice}</span>
              </div>
            </div>
            <p className="guarantee-text-roka">29-Day Money-Back Guarantee</p>
            <Button>Buy Ticket</Button>

            <ul className="list-unstyled m-0">
              <li>
                <strong>4:00 pm - 6:00 pm</strong> start date
              </li>
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
