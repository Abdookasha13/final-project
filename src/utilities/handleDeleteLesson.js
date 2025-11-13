import axios from "axios";
import { toast } from "react-toastify";

const handleDeleteLessson = async (lessonId) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.delete(
      `http://localhost:1911/deleteLesson/${lessonId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    toast.success(res.data.message || "lesson deleted successfully!");
  } catch (err) {
    console.error("Error deleting lesson:", err);
    toast.error(err.response?.data?.message || "Error deleting course");
  }
};

export default handleDeleteLessson;
