import axios from "axios";

export const getAllServices = async (setServices) => {
  try {
    const response = await axios.get("http://localhost:1911/getAllServices");
    setServices(response.data);
    } catch (error) {
    console.error("Error fetching services:", error);
    setServices([]);
  }
};
export default getAllServices;