import { configureStore } from "@reduxjs/toolkit";
import insCoursesSlice from "./Slices/insCoursesSlice";
import getAllCoursecSlice from "./Slices/getAllCoursecSlice";

const store = configureStore({
  reducer: {
    getAllCourses: getAllCoursecSlice,
    insCourses: insCoursesSlice,
  },
});

export default store;
