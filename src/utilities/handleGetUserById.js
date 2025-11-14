import axios from "axios";

const handleGetUserById = async (userId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `http://localhost:1911/getUserById/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error("Error fetching user:", err);
    throw err;
  }
};

export default handleGetUserById;
