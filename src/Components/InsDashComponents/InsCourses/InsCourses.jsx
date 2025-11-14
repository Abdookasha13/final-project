import { useEffect, useState } from "react";
import getCoursesByInsId from "../../../utilities/getCoursesByInsId";
import CourseCard from "../../coursecard/CourseCard";
import formatTime from "../../../utilities/formatTime";
import Loader from "../../Loader/Loader";

const InsCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user?._id) {
          setError("User not found. Please login.");
          setLoading(false);
          return;
        }

        const data = await getCoursesByInsId(user._id);
        setCourses(data || []); 
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Failed to load courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleDeleteSuccess = (courseId) => {
    setCourses(courses.filter((c) => c._id !== courseId));
  };

  // ✅ حالة التحميل
  if (loading) return <Loader />;

  // ✅ حالة الخطأ
  if (error) {
    return (
      <div className="container px-0 mx-0">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="container px-0 mx-0">
        <div className="text-center py-5">
          <i className="bi bi-journal-x fs-1 text-muted d-block mb-3"></i>
          <h4 className="text-muted">No Courses Yet</h4>
          <p className="text-muted">
            You haven't created any courses yet. Start creating your first
            course!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-0 mx-0">
      <div className="row g-4">
        {courses.map((course) => (
          <div className="col-xl-4 col-lg-4 col-md-6" key={course._id}>
            <div className="bg-light rounded-3 h-100 p-2">
              <CourseCard
                imgSrc={course.thumbnailUrl}
                title={course.title}
                courseId={course._id}
                showInstructorActions={true}
                price={course.price}
                discountPrice={course.discountPrice}
                lessonsCount={course.lessonsCount}
                courseDuration={formatTime(course.lessons)}
                studentsCount={course.studentsCount}
                category={course.category.name}
                onDelete={handleDeleteSuccess}
                bgColor={"#ffff"}
                hideInstructorInfo={true}
                hideCartButton={true}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsCourses;
