import axios from "axios";
import { toast } from "react-toastify";

const handleUpdateCourse = async (id, data, thumbnailUrl) => {
  try {
    const token = localStorage.getItem("token");

    const payload = {
      ...data,
      thumbnailUrl,
    };

    const res = await axios.patch(
      `http://localhost:1911/courses/${id}`,
      payload,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    toast.success(res.data.message || "Course updated successfully!");
    return res.data.course;
  } catch (err) {
    toast.error(
      err.response?.data?.message || "An error occurred while updating course"
    );
  }
};

export default handleUpdateCourse;
