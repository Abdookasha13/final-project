import { configureStore } from "@reduxjs/toolkit";
import insCoursesSlice from "./Slices/insCoursesSlice";
import getAllCoursecSlice from "./Slices/getAllCoursecSlice";
import cartSlice from "./Slices/cartSlice";
import reviewStatsReducer from "./Slices/reviewsSlice";
import authReducer from "./Slices/authSlice";

const store = configureStore({
  reducer: {
    getAllCourses: getAllCoursecSlice,
    insCourses: insCoursesSlice,
    cart: cartSlice,
    reviewStats: reviewStatsReducer,
    auth: authReducer,
  },
});

export default store;
