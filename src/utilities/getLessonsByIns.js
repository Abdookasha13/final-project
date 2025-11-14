import axios from "axios";
import React from "react";

const getLessonsByIns = async (instructorId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `http://localhost:1911/lessons/${instructorId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching lessons:", error);
    return [];
  }
};

export default getLessonsByIns;
