import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const fetchAllCourses = async () => {
  try {
    const res = await axios.get("http://localhost:1911/courses");
    console.log("Fetched Courses:", res.data);
    return res.data?res.data:[];
  } catch (err) {
    console.error("Error fetching courses:", err);
    return [];
  }
};

export const coursesFetched = createAsyncThunk(
  "coursesFetched",
  fetchAllCourses
);

const getAllCoursecSlice = createSlice({
  name: "courses",
  initialState: { data: [], isLoading: true },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(coursesFetched.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(coursesFetched.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
  },
});

export default getAllCoursecSlice.reducer;
