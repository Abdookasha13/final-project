import React, { useEffect } from "react";
import Button from "../../Components/Button/Button";
import CourseCard from "../coursecard/CourseCard";
import "./CourseShape.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../../Store/Slices/getAllCoursecSlice";
import formatTime from "../../utilities/formatTime";
import { fetchMultipleReviewStats } from "../../Store/Slices/reviewsSlice";
import { Loader } from "lucide-react";

function CourseShape() {
  const dispatch = useDispatch();

  const courses = useSelector((state) => state.getAllCourses.data || []);
  const isLoading = useSelector((state) => state.getAllCourses.isLoading);

  const reviewStats = useSelector((state) => state.reviewStats.stats);
  const statsLoading = useSelector((state) => state.reviewStats.isLoading);

  useEffect(() => {
    if (!courses.length) {
      dispatch(fetchCourses());
    }
  }, [courses.length, dispatch]);

  useEffect(() => {
    if (courses.length > 0) {
      const courseIds = courses.map((c) => c._id);
      dispatch(fetchMultipleReviewStats(courseIds));
    }
  }, [courses, dispatch]);

  if (isLoading || statsLoading) {
    return <Loader />;
  }

  if (!courses.length) {
    return <div>no courses hereee</div>;
  }
  return (
    <>
      {/* ----------- Course Section ----------- */}
      <div className="it-course-area it-sub-bg-none p-relative grey-bg pt-120 pb-120">
        {/* ----------- الخلفيات ----------- */}
        <div className="it-course-shape-1 d-none d-xl-block">
          <img
            src="https://ordainit.com/html/educate/assets/img/course/shape-1-1.png"
            alt=""
          />
        </div>
        <div className="it-course-shape-2 d-none d-xl-block">
          <img
            src="https://ordainit.com/html/educate/assets/img/course/shape-1-2.png"
            alt=""
            className="animate-pencil"
          />
        </div>
        <div className="it-course-shape-3 d-none d-xl-block">
          <img
            src="https://ordainit.com/html/educate/assets/img/course/shape-1-3.png"
            alt=""
            className="animate-hat"
          />
        </div>
        <div className="it-course-shape-4 d-none d-xl-block">
          <img
            src="https://ordainit.com/html/educate/assets/img/course/shape-1-4.png"
            alt=""
            className="animate-star"
          />
        </div>

        {/* ----------- المحتوى ----------- */}
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="it-course-title-box text-center mb-70">
                <span className="it-section-subtitle">
                  <img
                    src="https://ordainit.com/html/educate/assets/img/category/inner.svg"
                    alt=""
                  />
                  Top Popular Course
                  <img
                    src="https://ordainit.com/html/educate/assets/img/category/inner.svg"
                    alt=""
                  />
                </span>
                <h4 className="it-section-title">
                  Histudy Course{" "}
                  <span className=" z-index">
                    student
                    <svg
                      className="title-shape-2"
                      width="140"
                      height="65"
                      viewBox="0 0 168 65"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M73.3761 8.49147C78.4841 6.01353 82.5722 4.25154 88.8933 3.3035C94.2064 2.50664 99.6305 2.0701 104.981 1.94026C120.426 1.56549 135.132 4.90121 146.506 9.70405C158.628 14.8228 166.725 22.5638 166.074 31.6501C165.291 42.5779 151.346 51.7039 133.508 56.8189C110.253 63.4874 81.7065 63.8025 58.5605 60.8285C37.5033 58.123 11.6304 51.7165 3.58132 40.0216C-3.43085 29.8337 12.0728 18.1578 27.544 11.645C40.3656 6.24763 55.7082 2.98328 70.8043 4.08403C81.9391 4.89596 93.2164 6.87822 102.462 9.99561C112.874 13.5066 120.141 18.5932 127.862 23.6332"
                        stroke="#0AB99D"
                        strokeWidth="3"
                        strokeLinecap="round"
                      ></path>
                    </svg>
                  </span>{" "}
                  can <br /> join with us.
                </h4>
              </div>
            </div>

            {/* ----------- مكان الكروت ----------- */}
            <div className="col-xl-12">
              {courses
                .map((course) => (
                  <div className="col-md-6 col-lg-3">
                    <CourseCard
                      imgSrc={course.thumbnailUrl}
                      title={course.title}
                      price={course.price}
                      discountPrice={course.discountPrice}
                      lessonsCount={course.lessonsCount}
                      courseDuration={formatTime(course.lessons)}
                      studentsCount={course.studentsCount}
                      courseId={course._id}
                      category={course.category?.name}
                      insImage={course.instructor?.profileImage}
                      insName={course.instructor?.name}
                      bgColor={"#f8f9fa"}
                      course={course}
                      stats={reviewStats[course._id]}
                    />
                  </div>
                ))
                .slice(0, 3)}
            </div>

            {/* ----------- مكان الزر ----------- */}
            <div className="col-xl-12">
              <div className="it-course-button text-center pt-45">
                <div className="btn-placeholder pt-5">
                  <Button>Learn More Course</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CourseShape;
