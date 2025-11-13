import axios from "axios";
import { toast } from "react-toastify";

const handleUpdateLesson = async (id, data) => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.put(
      `http://localhost:1911/updateLesson/${id}`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    toast.success(res.data.message || "lesson updated successfully!");
    return res.data.lesson;
  } catch (err) {
    toast.error(
      err.response?.data?.message || "An error occurred while updating lesson"
    );
  }
};
export default handleUpdateLesson;
