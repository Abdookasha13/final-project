import axios from "axios";

const getStdEnrollments = async (stdId) => {
  try {
  
    
       const token=localStorage.getItem("token")
   const res=await axios.get(`http://localhost:1911/myenrollments/${stdId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("Fetched std enrollments:", res.data);
    console.log(stdId);
    
    return res.data;
  } catch (err) {
    console.error("Error fetching std enrollments:", err);
    return null;
  }
};

export default getStdEnrollments;