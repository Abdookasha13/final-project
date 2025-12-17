import axios from "axios";

const getLessonsByCourseId = async (courseId) => {
  try {
    const res = await axios.get(
      `http://localhost:1911/lessons/course/${courseId}`
    );
    console.log("Response data:", res.data.data);
    return res.data.data;
  } catch (err) {
    console.error("Error fetching lessons:", err);
    return [];
  }
};

export default getLessonsByCourseId;
