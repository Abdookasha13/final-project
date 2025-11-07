import { useEffect, useState } from "react";
import getCoursesByInsId from "../../../utilities/getCoursesByInsId";
import CourseCard from "../../coursecard/CourseCard";

const InsCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getCoursesByInsId("690e0b32a817c5867a43c282", setCourses);
  }, []);
  return (
    <>
      <div className="container px-0 mx-0 ">
        <div className="row g-4 ">
          {courses.map((course) => (
            <div className="col-xl-4 col-lg-4 col-md-6" key={course._id}>
              <div className="bg-light rounded-3 h-100 p-2 ">
                <CourseCard imgSrc={course.thumbnailUrl} title={course.title}  courseId={course._id} showInstructorButtons={true} price={course.price} discountPrice={course.discountPrice}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default InsCourses;
