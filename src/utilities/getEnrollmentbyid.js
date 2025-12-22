import axios from "axios";

const getEnrollmentById = async (enrollmentId, token = null) => {
  try {
    const authToken = token || localStorage.getItem("token");

    if (!authToken) {
      console.error("No token found - User not authenticated");
      return null;
    }

    if (!enrollmentId) {
      console.error(" No enrollmentId provided");
      return null;
    }

    console.log(` Fetching enrollment: ${enrollmentId}`);

    const response = await axios.get(
      `http://localhost:1911/enrollments/${enrollmentId}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Enrollment fetched successfully:", response.data);
    return response.data || null;
  } catch (error) {
    console.error("Error fetching enrollment:", error.message);

    return null;
  }
};

export default getEnrollmentById;
