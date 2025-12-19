import axios from "axios";

const getAllInstructors = async (setInstructors) => {
  try {
    const response = await axios.get("http://localhost:1911/instructors");
    setInstructors(response.data.instructors);
    } catch (error) {
    console.error("Error fetching instructors:", error);
    setInstructors([]);
  }
};
export default getAllInstructors;