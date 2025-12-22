import { useParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import "./SearchPage.css";
import Courses from "../../Pages/Pages/Courses/Courses";
import { useSelector } from "react-redux";

const SearchPage = () => {
  const { searchTerm } = useParams();

  const courses = useSelector((state) => state.getAllCourses.data || []);

  useEffect(() => {
    document.title = `Search results for "${searchTerm}"`;
  }, [searchTerm]);

 const filteredCourses = useMemo(() => {
  const term = searchTerm?.trim().toLowerCase();
  if (!term) return courses;

  return courses.filter(
    (course) =>
      typeof course.title === "string" &&
      course.title.toLowerCase().includes(term)
  );
}, [courses, searchTerm]);


  if (!filteredCourses.length) {
    return (
      <img
        src="/Images/no-result.jpg"
        alt="No results found"
        className="no-result-img"
      />
    );
  }

  return (
    <div className="py-5 px-0 mx-0">
      <Courses
        filterFn={(course) => filteredCourses.some((c) => c._id === course._id)}
      />
    </div>
  );
};

export default SearchPage;
