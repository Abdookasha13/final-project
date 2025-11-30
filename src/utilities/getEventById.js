import axios from "axios";

const getEventById = async (id, setEvent) => {
  try {
    const res = await axios.get(`http://localhost:1911/getEventById/${id}`);
    console.log("Fetched Event:", res.data);
    setEvent(res.data);
  } catch (err) {
    console.error("Error fetching events:", err);
    setEvent(null);
  }
};

export default getEventById;