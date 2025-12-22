import axios from "axios";

const getEnrollmentStats = async () => {
  try {
    const response = await axios.get(
      `http://localhost:1911/myenrollments/stats`
    );

    console.log("stats fetched successfully:", response.data);
    return response.data || null;
  } catch (error) {
    console.error("Error fetching stats:", error.message);

    return null;
  }
};

export default getEnrollmentStats;
