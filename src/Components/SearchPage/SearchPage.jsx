import { Link, useParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./SearchPage.css";
import Loader from "../Loader/Loader";
import CourseCard from "../coursecard/CourseCard";
import formatTime from "../../utilities/formatTime";
import { fetchCourses } from "../../Store/Slices/getAllCoursecSlice";
import { fetchMultipleReviewStats } from "../../Store/Slices/reviewsSlice";



const SearchPage = () => {
  const { searchTerm } = useParams();
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.getAllCourses.data);
  const isLoading = useSelector((state) => state.getAllCourses.isLoading);
  const reviewStats = useSelector((state) => state.reviewStats.stats);
  // const statsLoading = useSelector((state) => state.reviewStats.isLoading);

  useEffect(() => {
    document.title = `Search results for "${searchTerm}"`;
    if(!courses.length){
      dispatch(fetchCourses());
    }
  }, [searchTerm, courses.length, dispatch]);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, courses]);

  useEffect(() => {
  if (filteredCourses.length > 0) {
    const courseIds = filteredCourses.map((c) => c._id);
    dispatch(fetchMultipleReviewStats(courseIds));
  }
}, [filteredCourses, dispatch]);
  if (isLoading) {
    return <Loader />;
  }

  if (filteredCourses.length === 0) {
    return <h2>No results found for "{searchTerm}"</h2>;
  }

  return (
    <>
      <div className="py-5 px-0 mx-0">
        <h2 className="mb-4">
          Search results for:{" "}
          <span className="search-term">"{searchTerm}"</span>
        </h2>
        <div className="row g-4">
          {filteredCourses.map((course) => (
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
                  category={course.category.name}
                  insImage={course.instructor.profileImage}
                  insName={course.instructor.name}
                  bgColor={"#f8f9fa"}
                   stats={reviewStats[course._id]}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchPage;
