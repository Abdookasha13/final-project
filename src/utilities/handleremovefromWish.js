import axios from "axios";
import { toast } from "react-toastify";

const removeFromWish = async (courseId) => {
     const token = localStorage.getItem("token");
  try {
    const res = await axios.delete(
      `http://localhost:1911/remove-from-wishlist/${courseId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
 if (res.status === 200) {
       toast.success("Course removed from wishlist");
        return true;
     } else {
       toast.error(res.data.message);
        return false;
     }


  } catch (error) {
    console.error("Error removing from wishlist:", error);
  }
};
export default removeFromWish;
