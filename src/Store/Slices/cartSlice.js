import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// ====== Thunks ======

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:1911/users/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const removeCourseFromCart = createAsyncThunk(
  "cart/removeCourseFromCart",
  async (courseId, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.delete(
        `http://localhost:1911/users/cart/delete/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data; // cart updated
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
// إضافة كورس للكارت
export const addCourseToCart = createAsyncThunk(
  "cart/addCourseToCart",
  async (course, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:1911/users/cart/add",
        course,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data; // cart updated
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    clearCart(state) {
      state.cartItems = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchCart
      .addCase(fetchCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cartItems = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // addCourseToCart
      .addCase(addCourseToCart.fulfilled, (state, action) => {
        state.cartItems = action.payload;
      })
      .addCase(addCourseToCart.rejected, (state, action) => {
        state.error = action.payload;
      })

      
      .addCase(removeCourseFromCart.fulfilled, (state, action) => {
        state.cartItems = action.payload;
      })
      .addCase(removeCourseFromCart.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;


