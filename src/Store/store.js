import { configureStore } from "@reduxjs/toolkit";
import insCoursesSlice from "./Slices/insCoursesSlice";
import getAllCoursecSlice from "./Slices/getAllCoursecSlice";
import cartSlice from "./Slices/cartSlice";



const store = configureStore({
  reducer: {
    getAllCourses: getAllCoursecSlice,
    insCourses: insCoursesSlice,
    cart:cartSlice,

  },
});

export default store;
