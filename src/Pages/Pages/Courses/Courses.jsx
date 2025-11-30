import { useEffect, useState } from "react";

import "./Courses.css";
import getAllCourses from "../../../utilities/getAllCourses";
import formatTime from "../../../utilities/formatTime";
import { Link } from "react-router-dom";
import Loader from "../../../Components/Loader/Loader";
import CourseCard from "../../../Components/coursecard/CourseCard";

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getAllCourses(setCourses);
  }, []);

  if (courses.length === 0) {
    return <Loader />;
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
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;
