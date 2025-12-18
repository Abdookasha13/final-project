import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCourses = createAsyncThunk(
  "courses/fetchAll",
  async (lang = "en", { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const headers = {
        "Content-Type": "application/json",
      };

      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const res = await axios.get(
        `http://localhost:1911/courses?lang=${lang}`,
        {
          headers,
        }
      );

      console.log("Fetched Courses with lang:", lang, res.data);
      return res.data;
    } catch (err) {
      console.error(
        "Error fetching courses:",
        err.response?.data || err.message
      );
      return rejectWithValue(err.response?.data || "Error fetching courses");
    }
  }
);

const getAllCoursecSlice = createSlice({
  name: "courses",
  initialState: { data: [], isLoading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default getAllCoursecSlice.reducer;
