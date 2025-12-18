import axios from "axios";
import { toast } from "react-toastify";

const handleUpdateLesson = async (id, data) => {
  try {
    const token = localStorage.getItem("token");
        const payload = {
      course: data.courseId,
      title: {
        en: data["title.en"],
        ar: data["title.ar"],
      },
      content: {
        en: data["content.en"],
        ar: data["content.ar"],
      },
      type: data.type,
      videoUrl: data.videoUrl,
      duration: data.duration ? Number(data.duration) : 0,
      isPreview: data.isPreview || false,
    };

    const res = await axios.put(
      `http://localhost:1911/updateLesson/${id}`,
      payload,
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
