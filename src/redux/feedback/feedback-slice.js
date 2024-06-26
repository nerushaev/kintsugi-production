import { createSlice } from "@reduxjs/toolkit";
import { addFeedback, getFeedback, removeFeedback } from "./feedback-operations";

const initialState = {
  isLoading: false,
  error: null,
  feedback: [],
}

const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const feedbackSlice = createSlice({
  name: "feedback",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(addFeedback.pending, handlePending);
    builder.addCase(addFeedback.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.feedback.push(action.payload);
    });
    builder.addCase(addFeedback.rejected, handleRejected);
    builder.addCase(getFeedback.pending, handlePending);
    builder.addCase(getFeedback.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.feedback = action.payload;
    });
    builder.addCase(getFeedback.rejected, handleRejected);
    builder.addCase(removeFeedback.pending, handlePending);
    builder.addCase(removeFeedback.fulfilled, (state, {payload}) => {
      state.isLoading = false;
      state.error = null;
      state.feedback = state.feedback.filter(item => item._id !== payload._id)
    });
    builder.addCase(removeFeedback.rejected, handleRejected);
  }
});

export const feedbackReducer = feedbackSlice.reducer;