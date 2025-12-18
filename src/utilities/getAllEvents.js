// import axios from "axios";

// const getAllEvents = async (setEvents) => {
//   try {
//     const res = await axios.get("http://localhost:1911/getAllEvents");
//     console.log("Fetched Events:", res.data);
//     setEvents(res.data);
//   } catch (err) {
//     console.error("Error fetching events:", err);
//     setEvents([]);
//   }
// };

// export default getAllEvents;
import axios from "axios";

const getAllEvents = async (setEvents, lang) => {
  try {
    const res = await axios.get(
      `http://localhost:1911/getAllEvents?lang=${lang}`
    );

    console.log("Fetched Events:", res.data);
    setEvents(res.data);

    // optional cache
    localStorage.setItem(`events_${lang}`, JSON.stringify(res.data));
  } catch (err) {
    console.error("Error fetching events:", err);
    setEvents([]);
  }
};

export default getAllEvents;
