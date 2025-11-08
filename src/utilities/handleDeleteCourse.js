import axios from "axios";
import { toast } from "react-toastify";

const handleDeleteCourse = async (courseId, onSuccess) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.delete(
      `http://localhost:1911/courses/${courseId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    toast.success(res.data.message || "Course deleted successfully!");
    if (onSuccess) {
      onSuccess(courseId);
    }
  } catch (err) {
    console.error("Error deleting course:", err);
    toast.error(err.response?.data?.message || "Error deleting course");
  }
};

export default handleDeleteCourse;
