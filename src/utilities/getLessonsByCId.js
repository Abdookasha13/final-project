import axios from 'axios';

const getLessonsByCourseId = async (courseId) => {
  try {
    const res = await axios.get(`http://localhost:1911/lessons/course/${courseId}`);
    console.log("Response data:", res.data.data);
    return res.data.data; // ترجع الدروس بدل تمرير setLessons
  } catch (err) {
    console.error("Error fetching lessons:", err);
    return []; // ترجع مصفوفة فارغة في حالة الخطأ
  }
};

export default getLessonsByCourseId;
