import { useEffect, useState } from "react";
import CourseCard from "../../../Components/coursecard/CourseCard";
import "./Courses.css";
import getAllCourses from "../../../utilities/getAllCourses";
import formatTime from "../../../utilities/formatTime";
import Loader from "../../../Components/Loader/Loader";

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getAllCourses(setCourses);
  }, []);

  if (courses.length === 0) {
    return <Loader />;
  }

  return (
    <div>
      <div className="container coursecardcontainer px-0 mx-0 ">
        <div className="row g-4 ">
          {courses.map((course) => (
            <div className="col-xl-4 col-lg-4 col-md-6" key={course._id}>
              <div className="bg-light rounded-3 h-100 p-2 ">
                <CourseCard
                  imgSrc={course.thumbnailUrl}
                  title={course.title}
                  price={course.price}
                  discountPrice={course.discountPrice}
                  lessonsCount={course.lessonsCount}
                  timestamp={formatTime(course.createdAt)}
                  studentsCount={course.studentsCount}
                ></CourseCard>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Courses;
