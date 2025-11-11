import "./CourseDetails.css";
import Button from "./../../../Components/Button/Button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import getCourseById from "../../../utilities/GetCourseById";
import VideoPlayer from "../../../Components/VideoPlayer/VideoPlayer";
import { GoBookmark, GoCommentDiscussion } from "react-icons/go";
import { LuMenu } from "react-icons/lu";
import { AiOutlineUser } from "react-icons/ai";

const CourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [activeTab, setActiveTab] = useState("Overview");

  useEffect(() => {
    getCourseById(courseId, setCourse, setLessons);
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
    <section className="container course-details-roka mt-5 mb-5 m-0 p-0">
      <div className="row g-5">
        {/* الجزء اليسار */}
        <div className="col-xl-9 col-lg-8 ">
          <div className="course-image-roka mb-4 w-100 ">
            <img src={course.thumbnailUrl} className=" rounded-3" />
          </div>
          <div className="course-rating-roka mb-2">
            <i className="fa-solid fa-star me-1"></i>
            <i className="fa-solid fa-star me-1"></i>
            <i className="fa-solid fa-star me-1"></i>
            <i className="fa-solid fa-star me-1"></i>
            <i className="fa-regular fa-star me-1"></i>
            <span>(4.5)</span>
          </div>
          <h4 className="course1-title-roka fw-bold mb-4">{course.title}</h4>

          {/* Tabs */}

          <ul className="nav nav-tabs border-0 fw-bold ">
            <li className="nav-item  w-25">
              <button
                className={`nav-link bg-light w-100 `}
                style={{
                  color: activeTab === "Overview" ? "#0ab99d" : "#333",
                }}
                onClick={() => setActiveTab("Overview")}
              >
                <GoBookmark fontSize={"18px"} style={{ marginRight: "10px" }} />
                Overview
              </button>
            </li>
            <li className="nav-item w-25">
              <button
                className={`nav-link bg-light w-100 `}
                style={{
                  color: activeTab === "curriculum" ? "#0ab99d" : "#333",
                }}
                onClick={() => setActiveTab("curriculum")}
              >
                <LuMenu fontSize={"18px"} style={{ marginRight: "10px" }} />
                Curriculum
              </button>
            </li>
            <li className="nav-item  w-25">
              <button
                className={` nav-link bg-light w-100`}
                style={{
                  color: activeTab === "Instructor" ? "#0ab99d" : "#333",
                }}
                onClick={() => setActiveTab("Instructor")}
              >
                <AiOutlineUser
                  fontSize={"18px"}
                  style={{ marginRight: "10px" }}
                />{" "}
                Instructor
              </button>
            </li>
            <li className="text-dark nav-item w-25">
              <button
                className={` nav-link bg-light w-100 `}
                style={{
                  color: activeTab === "Reviews" ? "#0ab99d" : "#333",
                }}
                onClick={() => setActiveTab("Reviews")}
              >
                <GoCommentDiscussion
                  fontSize={"18px"}
                  style={{ marginRight: "10px" }}
                />{" "}
                Reviews
              </button>
            </li>
          </ul>

          {activeTab === "Overview" && (
            <div className="course1-content-roka px-4 py-5 border border-top-0  border-light-subtle  ">
              <h5 className="fw-bold">Course Description</h5>

              <p className="pb-3">{course.shortDescription}</p>

              <h5 className="fw-bold">What Will I Learn From This Course?</h5>

              <p>{course.description}</p>
            </div>
          )}
          {activeTab === "curriculum" && (
            <div className=" border border-top-0  border-light-subtle   ">
              <VideoPlayer videos={videoList} />
            </div>
          )}
          {activeTab === "instructor" && <div>...</div>}
          {activeTab === "reviews" && <div>...</div>}
        </div>

        {/* الجزء اليمين */}
        <div className="col-xl-3 col-lg-4">
          <div className="course-sidebar-roka shadow-sm p-3 rounded-3 ">
            <img
              src="https://ordainit.com/html/educate/assets/img/event/details-sm.jpg"
              alt="instructor"
              className="img-fluid rounded mb-3"
            />
            <div className="course-info-roka d-flex justify-content-between ">
              <p className="course-label-roka ">Course Fee</p>
              <div className="course-price-roka  d-flex  gap-2  ">
                <span className="current-price-roka">${course.price}</span>
                <span className="old-price-roka">${course.discountPrice}</span>
              </div>
            </div>
            <p className="guarantee-text-roka pb-2">
              29-Day Money-Back Guarantee
            </p>
            <Button className={"ticketbtn"}>Buy Ticket</Button>

            <ul className="list-unstyled m-0">
              <li>
                <span>start date</span> <span>4:00 pm - 6:00 pm</span>
              </li>
              <li>
                <span>enrolled</span> <span>100</span>
              </li>
              <li>
                <span>lectures</span> <span>80</span>
              </li>
              <li>
                <span>Skill Level</span> <span>Beginner</span>
              </li>
              <li>
                <span>Class Day</span> <span>Monday - Friday</span>
              </li>
              <li>
                <span>Language</span> <span>English</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseDetails;
