import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Fetch review stats for a specific course
export const fetchReviewStats = createAsyncThunk(
  "reviewStats/fetchReviewStats",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:1911/reviews/course/${courseId}`
      );
      return {
        courseId,
        stats: response.data.stats,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// ✅ Fetch stats for multiple courses
export const fetchMultipleReviewStats = createAsyncThunk(
  "reviewStats/fetchMultipleReviewStats",
  async (courseIds, { rejectWithValue }) => {
    try {
      const responses = await Promise.all(
        courseIds.map((courseId) =>
          axios.get(`http://localhost:1911/reviews/course/${courseId}`)
        )
      );

      const statsMap = {};
      responses.forEach((response, index) => {
        statsMap[courseIds[index]] = response.data.stats;
      });

      return statsMap;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialState = {
  stats: {}, // { courseId: stats }
  isLoading: false,
  error: null,
};

const reviewStatsSlice = createSlice({
  name: "reviewStats",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Single course stats
    builder
      .addCase(fetchReviewStats.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchReviewStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stats[action.payload.courseId] = action.payload.stats;
      })
      .addCase(fetchReviewStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Multiple courses stats
    builder
      .addCase(fetchMultipleReviewStats.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMultipleReviewStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stats = { ...state.stats, ...action.payload };
      })
      .addCase(fetchMultipleReviewStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = reviewStatsSlice.actions;
export default reviewStatsSlice.reducer;