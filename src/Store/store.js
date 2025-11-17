import { configureStore } from "@reduxjs/toolkit";
import insCoursesSlice from "./Slices/insCoursesSlice";
import cartSlice from "./Slices/cartSlice";


const store = configureStore({
  reducer: {
    insCourses: insCoursesSlice,
    cart:cartSlice
  },
});

export default store;
