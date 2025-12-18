import axios from "axios";

const getCourseById = async (courseId, lang = "en") => {
  try {
  const res = await axios.get(
      `http://localhost:1911/courses/${courseId}?lang=${lang}`
    );

    console.log("Course Data:", res.data);
    return res.data;
  } catch (err) {
    console.error("Error fetching course:", err);
    throw err;
  }
};

export default getCourseById;
