import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// ------------------- Fetch Cart -------------------
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:1911/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.items;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error fetching cart"
      );
    }
  }
);

// ------------------- Add Course -------------------
export const addCourseToCart = createAsyncThunk(
  "cart/addCourseToCart",
  async (courseId, thunkAPI) => {
    try {
   
  
      const token = localStorage.getItem("token");
      
      const res = await axios.post(
        "http://localhost:1911/cart/add",
        { courseId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data.items;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error adding to cart"
      );
    }
  }
);

// ------------------- Remove Course -------------------
export const removeCourseFromCart = createAsyncThunk(
  "cart/removeCourseFromCart",
  async (courseId, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(`http://localhost:1911/cart/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.items;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error removing from cart"
      );
    }
  }
);

// ------------------- Cart Slice -------------------
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

      // removeCourseFromCart
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
