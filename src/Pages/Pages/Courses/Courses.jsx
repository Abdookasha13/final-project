import { useEffect } from "react";
import "./Courses.css";
import formatTime from "../../../utilities/formatTime";
import { Link } from "react-router-dom";
import Loader from "../../../Components/Loader/Loader";
import CourseCard from "../../../Components/coursecard/CourseCard";
import { useDispatch, useSelector } from "react-redux";
import { coursesFetched } from "../../../Store/Slices/getAllCoursecSlice";

function Courses() {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.getAllCourses.data);
  const isLoading = useSelector((state) => state.getAllCourses.isLoading);

  useEffect(() => {
    if(!courses.length){
      dispatch(coursesFetched());
    }
  }, [courses.length, dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container coursecardcontainer px-0 mx-0">
      <div className="row g-4">
        {courses && courses.length > 0 ? (
          courses.map((course) => (
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
                />
              </Link>
            </div>
          ))
        ) : (
          <div className="col-12 py-5 text-center">No courses available.</div>
        )}
      </div>
    </div>
  );
}

export default Courses;
