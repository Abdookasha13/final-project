import axios from "axios";

const getAllCategories = async () => {
  try {
    const res = await axios.get("http://localhost:1911/category");
    return res.data;
  } catch (err) {
    console.error("Error fetching categories:", err);
  }
};

export default getAllCategories;
