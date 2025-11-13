import axios from 'axios'
import React from 'react'

const handleGetUserById = async (userId, setUser) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `http://localhost:1911/getUserById/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    setUser(response.data);
  } catch (err) {
    console.error("Error fetching user:", err);
    setUser({});
  }
};

export default handleGetUserById