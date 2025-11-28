import axios from "axios";

const getServiceById= async (id , setService) => {
    try {
        const res = await axios.get(`http://localhost:1911/getServiceById/${id}`);
        console.log("Fetched Service:", res.data);
        setService(res.data);
    } catch (err) {
        console.error("Error fetching service:", err);
        setService(null);
    }
};

export default getServiceById;