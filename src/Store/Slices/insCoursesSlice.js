import { createSlice } from "@reduxjs/toolkit";

const insCoursesSlice = createSlice({
  name: "insCoursesSlice",
  initialState: { courses: [], isLoading: true, error: null },
  reducers: {
    getInsCourses(state, action) {
      state.courses = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    deleteInsCourseById(state, action) {
      state.courses = state.courses.filter(
        (course) => course._id !== action.payload
      );
    },
  },
});

export const { getInsCourses, deleteInsCourseById } = insCoursesSlice.actions;

export default insCoursesSlice.reducer;