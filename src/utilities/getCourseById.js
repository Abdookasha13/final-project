import axios from "axios";

const getCourseById = async (courseId) => {
  try {
    console.log("Course ID:", courseId);
    const res = await axios.get(`http://localhost:1911/courses/${courseId}`);

    //  setCourse(res.data)
    //  setLessons(res.data.lessons)
    return res.data;
  } catch (err) {
    console.error("Error fetching course:", err);
  }
};

export default getCourseById;
