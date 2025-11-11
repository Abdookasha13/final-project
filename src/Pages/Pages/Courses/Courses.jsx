import { useEffect, useState } from "react";
import CourseCard from "../../../Components/coursecard/CourseCard";
import "./Courses.css";
import getAllCourses from "../../../utilities/getAllCourses";
import formatTime from "../../../utilities/formatTime";
import { Link } from "react-router-dom";

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getAllCourses(setCourses);
  }, []);

  return (
<div>
  <div className="container coursecardcontainer px-0 mx-0">
    <div className="row g-4">
      {courses.map((course) => (
        <div className="col-xl-4 col-lg-4 col-md-6" key={course._id}>
          <Link 
            to={`/course/details/${course._id}`}
            style={{ textDecoration: "none" }}
          >
            <div className="bg-light rounded-3 h-100 p-2">
              <CourseCard
                imgSrc={course.thumbnailUrl}
                title={course.title}
                price={course.price}
                discountPrice={course.discountPrice}
                lessonsCount={course.lessonsCount}
                timestamp={formatTime(course.createdAt)}
                studentsCount={course.studentsCount}
                courseId={course._id}
                bgColor={"#f8f9fa"}
              />
            </div>
          </Link>
        </div>
      ))}
    </div>
  </div>
</div>
  );
}

export default Courses;
