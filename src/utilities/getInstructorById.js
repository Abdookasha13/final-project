import axios from "axios";

const getInstructorById = async (id, setInstructor) => {
  try {
    const response = await axios.get(`http://localhost:1911/instructors/${id}`);
    setInstructor(response.data);
    console.log("Fetched instructor:", response.data);
  } catch (error) {
    console.error("Error fetching instructor by ID:", error);
    return null;
  }
};

export default getInstructorById;
