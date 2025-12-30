import { useEffect, useState } from "react";
import "./Courses.css";
import formatTime from "../../../utilities/formatTime";

import Loader from "../../../Components/Loader/Loader";
import CourseCard from "../../../Components/coursecard/CourseCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../../../Store/Slices/getAllCoursecSlice";
import { fetchMultipleReviewStats } from "../../../Store/Slices/reviewsSlice";
import { useTranslation } from "react-i18next";
import axios from "axios";

function Courses({ filterFn }) {
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith("ar") ? "ar" : "en";
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.getAllCourses.data || []);
  const isLoading = useSelector((state) => state.getAllCourses.isLoading);
  const reviewStats = useSelector((state) => state.reviewStats.stats);
  const statsLoading = useSelector((state) => state.reviewStats.isLoading);
  const { user, token } = useSelector((state) => state.auth);

  const [enrollments, setEnrollments] = useState([]);
  const [_, setEnrollmentsLoading] = useState(false);

  useEffect(() => {
    if (user?._id && token) {
      fetchUserEnrollments();
    }
  }, [user?._id, token]);

  const fetchUserEnrollments = async () => {
    try {
      setEnrollmentsLoading(true);
      const response = await axios.get(
        `http://localhost:1911/myenrollments/enrolled`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEnrollments(response.data || []);
    } catch (error) {
      console.error("Error fetching enrollments:", error);
      setEnrollments([]);
    } finally {
      setEnrollmentsLoading(false);
    }
  };

  useEffect(() => {
    dispatch(fetchCourses(lang));
  }, [lang, dispatch]);

  useEffect(() => {
    if (courses.length > 0) {
      const courseIds = courses.map((c) => c._id);
      dispatch(fetchMultipleReviewStats(courseIds));
    }
  }, [courses, dispatch]);

  if (isLoading || statsLoading) {
    return <Loader />;
  }

  const filteredCourses = filterFn ? courses.filter(filterFn) : courses;

  if (!filteredCourses.length) {
    return <div className="text-center py-5">No courses found</div>;
  }
   const isUserEnrolled = (courseId) => {
    if (!user || !enrollments.length) return false;
    
    return enrollments.some((enrollment) => {
      const enrollmentCourseId =
        typeof enrollment.course === "object"
          ? enrollment.course._id
          : enrollment.course;
      return enrollmentCourseId === courseId;
    });
  };

  return (
    <div className="container coursecardcontainer px-0 mx-0 py-5">
      <div className="row g-4">
        {filteredCourses.map((course) => {
           const enrolled = isUserEnrolled(course._id);
          return (
            <div className="col-xl-4 col-lg-4 col-md-6" key={course._id}>
              <CourseCard
                imgSrc={course.thumbnailUrl}
                title={course.title}
                price={course.price}
                discountPrice={course.discountPrice}
                lessonsCount={course.lessonsCount || 0}
                courseDuration={formatTime(course.lessons)}
                studentsCount={course.studentsCount || 0}
                courseId={course._id}
                category={course.category?.name[lang]}
                insImage={course.instructor?.profileImage}
                insName={course.instructor?.name}
                bgColor={"#f8f9fa"}
                course={course}
                stats={reviewStats[course._id]}
                  isUserEnrolled={enrolled}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Courses;
