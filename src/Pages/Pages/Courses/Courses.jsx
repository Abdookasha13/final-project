import { useEffect } from "react";
import "./Courses.css";
import formatTime from "../../../utilities/formatTime";
import { Link } from "react-router-dom";
import Loader from "../../../Components/Loader/Loader";
import CourseCard from "../../../Components/coursecard/CourseCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../../../Store/Slices/getAllCoursecSlice";
import { fetchMultipleReviewStats } from "../../../Store/Slices/reviewsSlice";
import { useTranslation } from "react-i18next";

function Courses({ filterFn }) {
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith("ar") ? "ar" : "en";
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.getAllCourses.data || []);
  const isLoading = useSelector((state) => state.getAllCourses.isLoading);
  const reviewStats = useSelector((state) => state.reviewStats.stats);
  const statsLoading = useSelector((state) => state.reviewStats.isLoading);

  useEffect(() => {
    dispatch(fetchCourses(lang));
  }, [lang, dispatch]);

  useEffect(() => {
    if (courses.length > 0) {
      const courseIds = courses.map((c) => c._id);
      dispatch(fetchMultipleReviewStats(courseIds));
    }
  }, [courses, dispatch]);

  if (isLoading || statsLoading) {
    return <Loader />;
  }

  const filteredCourses = filterFn ? courses.filter(filterFn) : courses;

  if (!filteredCourses.length) {
    return <div className="text-center py-5">No courses found</div>;
  }

  return (
    <div className="container coursecardcontainer px-0 mx-0 py-5" >
      <div className="row g-4">
        {filteredCourses.map((course) => {
          return (
            <div className="col-xl-4 col-lg-4 col-md-6" key={course._id}>
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
  );
}

export default Courses;
