import { useEffect, useState } from "react";
import getCoursesByInsId from "../../../utilities/getCoursesByInsId";
import CourseCard from "../../coursecard/CourseCard";
import formatTime from "../../../utilities/formatTime";
import Loader from "../../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { fetchMultipleReviewStats } from "../../../Store/Slices/reviewsSlice";
import { useOutletContext } from "react-router-dom";
import { useTranslation } from "react-i18next";

const InsCourses = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith("ar") ? "ar" : "en";
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const reviewStats = useSelector((state) => state.reviewStats.stats);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { searchTerm } = useOutletContext();

  const getTextByLang = (data, language) => {
    if (!data) return "N/A";
    if (typeof data === "string") return data;
    if (typeof data === "object") {
      return data[language] || data.en || data.ar || "N/A";
    }
    return "N/A";
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user?._id) {
          setError("User not found. Please login.");
          setLoading(false);
          return;
        }

        // ⭐ مرر اللغة للـ utility
        const data = await getCoursesByInsId(user._id, lang);
        console.log("📦 Instructor courses:", data);
        setCourses(data || []);
      } catch (err) {
        console.error("❌ Error fetching courses:", err);
        setError("Failed to load courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [lang]); // ⭐ أضف lang في dependency array

  const filteredCourses = courses.filter((course) =>
    getTextByLang(course.title, lang)
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (filteredCourses.length > 0) {
      const courseIds = filteredCourses.map((c) => c._id);
      dispatch(fetchMultipleReviewStats(courseIds));
    }
  }, [filteredCourses, dispatch]);

  const handleDeleteSuccess = (courseId) => {
    setCourses(courses.filter((c) => c._id !== courseId));
  };

  if (loading) return <Loader />;

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
        {filteredCourses.map((course) => {
          // ⭐ استخدم الـ helper function
          const title = getTextByLang(course.title, lang);
          const categoryName = getTextByLang(course.category?.name, lang);

          return (
            <div className="col-xl-4 col-lg-4 col-md-6" key={course._id}>
              <div className="bg-light rounded-3 h-100 p-2">
                <CourseCard
                  imgSrc={course.thumbnailUrl}
                  title={title}
                  courseId={course._id}
                  showInstructorActions={true}
                  price={course.price}
                  discountPrice={course.discountPrice}
                  lessonsCount={course.lessonsCount}
                  courseDuration={formatTime(course.lessons)}
                  studentsCount={course.studentsCount}
                  category={categoryName}
                  onDelete={handleDeleteSuccess}
                  bgColor={"#ffff"}
                  hideInstructorInfo={true}
                  hideCartButton={true}
                  stats={reviewStats[course._id]}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InsCourses;
