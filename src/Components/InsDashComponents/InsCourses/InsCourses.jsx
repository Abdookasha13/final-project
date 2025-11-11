import { useEffect, useState } from "react";
import getCoursesByInsId from "../../../utilities/getCoursesByInsId";
import CourseCard from "../../coursecard/CourseCard";
import formatTime from "../../../utilities/formatTime";

const InsCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    getCoursesByInsId(user._id, setCourses);
  }, []);
  const handleDeleteSuccess = (courseId) => {
    setCourses(courses.filter((c) => c._id !== courseId));
  };

  return (
    <>
      <div className="container px-0 mx-0 ">
        <div className="row g-4 ">
          {courses.map((course) => (
            <div className="col-xl-4 col-lg-4 col-md-6" key={course._id}>
              <div className="bg-light rounded-3 h-100 p-2 ">
                <CourseCard
                  imgSrc={course.thumbnailUrl}
                  title={course.title}
                  courseId={course._id}
                  showInstructorButtons={true}
                  price={course.price}
                  discountPrice={course.discountPrice}
                  lessonsCount={course.lessonsCount}
                  timestamp={formatTime(course.createdAt)}
                  studentsCount={course.studentsCount}
                  onDelete={handleDeleteSuccess}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default InsCourses;
