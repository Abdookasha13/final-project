import axios from "axios";

const getCoursesByCatId = async (catId, lang) => {
  try {
    const res = await axios.get(
      `http://localhost:1911/category/${catId}/courses?lang=${lang}`
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
export default getCoursesByCatId;
