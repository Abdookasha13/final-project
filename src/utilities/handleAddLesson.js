import axios from "axios";
import { toast } from "react-toastify";

const handleAddLesson = async (data, reset) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      "http://localhost:1911/addLesson",
      {
        course: data.courseId,
        title: data.title,
        type: data.type,
        videoUrl: data.videoUrl,
        content: data.content,
        duration: data.duration,
        isPreview: data.isPreview,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    toast.success(response.data.message || "Lesson added successfully!");
    reset();
  } catch (err) {
    console.error("Error adding lesson:", err);
    toast.error("Error adding lesson");
  }
};

export default handleAddLesson;
