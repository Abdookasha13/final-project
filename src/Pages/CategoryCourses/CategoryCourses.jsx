import React, { useEffect, useState } from "react";
import {useNavigate, useParams } from "react-router-dom";
import CourseCard from "../../Components/coursecard/CourseCard";
import getCoursesByCatId from "../../utilities/getCoursesByCatId";
import { useTranslation } from "react-i18next";
import formatTime from "../../utilities/formatTime";
import { useDispatch, useSelector } from "react-redux";
import { fetchMultipleReviewStats } from "../../Store/Slices/reviewsSlice";
import Loader from "../../Components/Loader/Loader";
import Button from "../../Components/Button/Button";

const CategoryCourses = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { catId } = useParams();

  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const lang = i18n.language.startsWith("ar") ? "ar" : "en";
  const reviewStats = useSelector((state) => state.reviewStats.stats);

  useEffect(() => {
    if (!catId) return;

    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await getCoursesByCatId(catId, lang);
        setCourses(res.data || []);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Failed to load courses");
        setCourses([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [catId, lang]);

  useEffect(() => {
    if (courses.length > 0) {
      const courseIds = courses.map((c) => c._id);
      dispatch(fetchMultipleReviewStats(courseIds));
    }
  }, [courses, dispatch]);

  if (isLoading) {
    return (
      <div className="py-5">
        <div className="text-center">
          <Loader />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="py-5">
        <div className=" d-flex flex-column  justify-content-center align-items-center ">
          <img
            src="/Images/nocourses.svg"
            width={"200px"}
            height={"200px"}
            alt=""
          />
          <h4>No courses found in this category</h4>
          <p className="text-muted mb-4">
            Check back soon or explore other categories
          </p>
          <Button onClick={() => navigate("/courses")}>
            Browse All Courses
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-5">
      <div className="row">
        {courses.map((course) => (
          <div className="col-lg-4 col-md-6 col-sm-12" key={course._id}>
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
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryCourses;
