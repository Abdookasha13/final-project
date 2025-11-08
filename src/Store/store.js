import { configureStore } from "@reduxjs/toolkit";
import insCoursesSlice from "./Slices/insCoursesSlice";


const store = configureStore({
  reducer: {
    insCourses: insCoursesSlice,
  },
});

export default store;
