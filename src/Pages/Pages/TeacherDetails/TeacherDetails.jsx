import { useParams } from "react-router-dom";
import Button from "../../../Components/Button/Button";
import TeachersProgress from "../../../Components/TeachersProgress/TeachersProgress";
import "./TeacherDetails.css";
import { useEffect, useState } from "react";
import getInstructorById from "../../../utilities/getInstructorById";
import { useDispatch, useSelector } from "react-redux";
import CourseCard from "../../../Components/coursecard/CourseCard";
import { Link } from "react-router-dom";
import formatTime from "../../../utilities/formatTime";
import { fetchMultipleReviewStats } from "../../../Store/Slices/reviewsSlice";
import { useTranslation } from "react-i18next";
import { fetchCourses } from "../../../Store/Slices/getAllCoursecSlice";

function TeacherDetails() {
  const { id } = useParams();
  const [instructor, setInstructor] = useState(null);
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.getAllCourses.data || []);
  const reviewStats = useSelector((state) => state.reviewStats.stats);
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith("ar") ? "ar" : "en";
  const [instCourses, setInstCourses] = useState([]);

  useEffect(() => {
    dispatch(fetchCourses(lang));
  }, [lang, dispatch]);

  useEffect(() => {
    if (courses.length > 0) {
      const courseIds = courses.map((c) => c._id);
      dispatch(fetchMultipleReviewStats(courseIds));
    }
  }, [courses, dispatch]);

  useEffect(() => {
    getInstructorById(id, setInstructor);
    setInstCourses(courses.filter((course) => course.instructor._id === id));
  }, [id, courses]);
  return (
    <>
      <div className="teacher-details p-lg-5 px-3 py-5">
        <div className="row mb-4">
          {/* ------------left side---------------- */}
          <div className="col-lg-3">
            <div className="teacher-details-left">
              <div className="teacher-details-left-img">
                <img src={instructor?.profileImage} alt="teacher" />
              </div>
              <div className="teacher-details-left-social text-center">
                <a href="#">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#">
                  <i className="fab fa-skype"></i>
                </a>
                <a href="#">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
              <div className="teacher-details-left-bio">
                <ul>
                  <li>
                    <i className="fa-solid fa-phone-volume"></i>
                    <a href="tel:(568)367987237">(568) 367-987-237</a>
                  </li>
                  <li>
                    <i className="fa-solid fa-location-dot"></i>
                    <a href="https://www.google.com/maps" target="_blank">
                      Hudson, Wisconsin(WI), 54016
                    </a>
                  </li>
                  <li>
                    <i className="fa-solid fa-envelope"></i>
                    <a href="mailto:govillage@gmail.com">govillage@gmail.com</a>
                  </li>
                </ul>
              </div>
              <div className="mt-5">
                <Button>Contact Teacher</Button>
              </div>
            </div>
          </div>
          {/* ------------right side---------------- */}
          <div className="col-lg-9">
            <div className="teacher-details-right p-lg-5 p-4 ms-lg-5 mt-4 mt-lg-0">
              <div className="teacher-details-right-title mb-5">
                <h4>{instructor?.name}</h4>
                <span>{instructor?.role}</span>
                <p>
                  Tempor orci dapibus ultrices in iaculis nunc sed augue.
                  Feugiat in ante metus dictum at tempor commodo. Venenatis
                  lectus magna fringilla urna porttitor rhoncus dolor. Arcu
                  dictum varius duis at consectetur lorem donec massa.
                </p>
                <p>
                  Tempor orci dapibus ultrices in iaculis nunc sed augue.
                  Feugiat in ante metus dictum at tempor commodo lectus magna
                  fringilla.
                </p>
              </div>
              <div className="teacher-details-right-content mb-5">
                <h4>Education:</h4>
                <p>
                  I’ve spent years figuring out the “formula” to teaching
                  technical skills in a classroom environment, and I’m really
                  excited to finally share my expertise with you. I can
                  confidently say that my online courses are without a doubt the
                  most comprehensive ones on the market.
                </p>
              </div>
              <div className="teacher-details-right-progress">
                <h4>Expertise & Skills:</h4>
                <TeachersProgress />
              </div>
            </div>
          </div>
        </div>

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {instCourses.map((course) => {
            return (
              <div className="col" key={course._id}>
                <Link
                  to={`/course/details/${course._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <CourseCard
                    imgSrc={course.thumbnailUrl}
                    title={course.title}
                    price={course.price}
                    discountPrice={course.discountPrice}
                    lessonsCount={course.lessonsCount || 0}
                    courseDuration={formatTime(course.lessons)}
                    studentsCount={course.studentsCount || 0}
                    courseId={course._id}
                    category={course.category?.name[lang]}
                    insImage={course.instructor?.profileImage}
                    insName={course.instructor?.name}
                    bgColor={"#f8f9fa"}
                    course={course}
                    stats={reviewStats[course._id]}
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default TeacherDetails;
