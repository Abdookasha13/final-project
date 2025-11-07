import { toast } from "react-toastify";
import axios from "axios";

const handleAddCourse = async (
  data,
  setUploading,
  reset,
  thumbnailUrl,
  setPreview,
  setThumbnailUrl
) => {
  try {
    setUploading(true);
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    const payload = {
      title: data.title,
      slug: data.title.toLowerCase().replace(/\s+/g, "-"),
      shortDescription: data.shortDescription,
      description: data.description,
      category: data.category,
      instructor: user._id,
      price: data.isFree ? 0 : Number(data.price),
      discountPrice: data.discountPrice || null,
      isFree: !!data.isFree,
      tags: data.tags ? data.tags.split(",").map((t) => t.trim()) : [],
      thumbnailUrl,
      lessons: [],
    };
    console.log("Payload:", payload);
    const res = await axios.post("http://localhost:1911/courses", payload, {
      headers: { Authorization: `Bearer ${token}` },
    });

    toast.success(res.data.message || "Course added successfully!");
    reset();
    setThumbnailUrl("");
    setPreview(null);
  } catch (err) {
    console.error(err);
    console.log("Server Error Response:", err.response?.data);
    toast.error(err.response?.data?.message || "Failed to add course");
  } finally {
    setUploading(false);
  }
};

export default handleAddCourse;
