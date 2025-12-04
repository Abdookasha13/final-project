import axios from "axios";

const getCoursesByInsId = async (instructorId) => {
  try {
    const token=localStorage.getItem("token")
    const response = await axios.get(
      `http://localhost:1911/instructorCourses/${instructorId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    // console.log(" courses:", response.data);
  return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Error fetching courses:", error);
    return []
    ;
  }
};

export default getCoursesByInsId;
