import axios from "axios";
import { toast } from "react-toastify";

const handleAddToWish = async (courseId) => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.post(
      "http://localhost:1911/add-to-wishlist",
      { courseId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (res.status === 200) {
      toast.success("Course added to wishlist");
       return true;
    } else {
      toast.error(res.data.message);
       return false;
    }
  } catch (err) {
    toast.error("Error adding to wishlist");
    console.log(err);
  }
};

export default handleAddToWish;
