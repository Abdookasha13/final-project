import axios from "axios";

const getLessonsByIns = async (instructorId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `http://localhost:1911/lessons/instructor/${instructorId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Error fetching lessons:", error);
    return [];
  }
};

export default getLessonsByIns;