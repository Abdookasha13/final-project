import { useEffect } from "react";
import "./Courses.css";
import formatTime from "../../../utilities/formatTime";
import { Link } from "react-router-dom";
import Loader from "../../../Components/Loader/Loader";
import CourseCard from "../../../Components/coursecard/CourseCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../../../Store/Slices/getAllCoursecSlice";
import { fetchMultipleReviewStats } from "../../../Store/Slices/reviewsSlice";

function Courses() {
  const dispatch = useDispatch();
  
  // من Redux - الـ courses
  const courses = useSelector((state) => state.getAllCourses.data || []);
  const isLoading = useSelector((state) => state.getAllCourses.isLoading);
  
  // من Redux - الـ stats
  const reviewStats = useSelector((state) => state.reviewStats.stats);
  const statsLoading = useSelector((state) => state.reviewStats.isLoading);

  // جيب الـ courses
  useEffect(() => {
    if (!courses.length) {
      dispatch(fetchCourses());
    }
  }, [courses.length, dispatch]);

  // جيب الـ stats لكل الـ courses
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
    <div className="container coursecardcontainer px-0 mx-0">
      <div className="row g-4">
        {courses.map((course) => (
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
                lessonsCount={course.lessonsCount}
                courseDuration={formatTime(course.lessons)}
                studentsCount={course.studentsCount}
                courseId={course._id}
                category={course.category?.name}
                insImage={course.instructor?.profileImage}
                insName={course.instructor?.name}
                bgColor={"#f8f9fa"}
                course={course}
                stats={reviewStats[course._id]} // ✅ من Redux
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;