import { useEffect, useState } from "react";
import getCoursesByInsId from "../../../utilities/getCoursesByInsId";
import CourseCard from "../../coursecard/CourseCard";
import formatTime from "../../../utilities/formatTime";

const InsCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchcourses = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const data = await getCoursesByInsId(user._id);
      setCourses(data);
    };
    fetchcourses();
  }, []);
  const handleDeleteSuccess = (courseId) => {
    setCourses(courses.filter((c) => c._id !== courseId));
  };
  console.log(courses);

  return (
    <>
      <div className="container px-0 mx-0 ">
        <div className="row g-4 ">
          {Array.isArray(courses) && courses.length > 0 ? (
            courses.map((course) => (
              <div className="col-xl-4 col-lg-4 col-md-6" key={course._id}>
                <div className="bg-light rounded-3 h-100 p-2">
                  <CourseCard
                    imgSrc={course.thumbnailUrl}
                    title={course.title}
                    courseId={course._id}
                    showInstructorButtons={true}
                    price={course.price}
                    discountPrice={course.discountPrice}
                    lessonsCount={course.lessonsCount}
                    timestamp={formatTime(course.lessons)}
                    studentsCount={course.studentsCount}
                    category={course.category.name}
                    onDelete={handleDeleteSuccess}
                    bgColor={"#ffff"}
                    hideInstructorInfo={true}
                    hideCartButton={true}
                  />
                </div>
              </div>
            ))
          ) : (
            <div>no courses found</div>
          )}
        </div>
      </div>
    </>
  );
};

export default InsCourses;
