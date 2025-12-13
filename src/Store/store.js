import { configureStore } from "@reduxjs/toolkit";
import insCoursesSlice from "./Slices/insCoursesSlice";
import getAllCoursecSlice from "./Slices/getAllCoursecSlice";
import cartSlice from "./Slices/cartSlice";
import  reviewStatsReducer from "./Slices/reviewsSlice";



const store = configureStore({
  reducer: {
    getAllCourses: getAllCoursecSlice,
    insCourses: insCoursesSlice,
    cart:cartSlice,
 reviewStats: reviewStatsReducer,
    

  },
});

export default store;
