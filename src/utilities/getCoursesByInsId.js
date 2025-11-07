import axios from "axios";

const getCoursesByInsId = async (instructorId, setCourses) => {
  try {
    const response = await axios.get(
      `http://localhost:1911/instructorCourses/${instructorId}`
    );
    console.log(" courses:", response.data);
    setCourses(response.data);
  } catch (error) {
    console.error("Error fetching courses:", error);
    setCourses([]);
  }
};

export default getCoursesByInsId;
