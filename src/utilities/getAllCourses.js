import axios from "axios";

const getAllCourses = async (setCourses) => {
  try {
    const res = await axios.get("http://localhost:1911/courses");
    console.log("Fetched Courses:", res.data);
    setCourses(res.data);
  } catch (err) {
    console.error("Error fetching courses:", err);
    setCourses([]);
  }
};

export default getAllCourses;
