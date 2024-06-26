import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthInstance } from "../../API/api";

export const addFeedback = createAsyncThunk(
  "/feedback/add",
  async (newData, ThunkAPI) => {
    console.log(newData);
    try {
      const {data} = await AuthInstance.post(`/api/feedback/add`, newData);
      console.log(data.result);
      return data.result;
    } catch (error) {
      return ThunkAPI.rejectWithValue(error.statusText);
    }
  }
);

export const getFeedback = createAsyncThunk(
  "/feedback/get",
  async (product_id, ThunkAPI) => {
    try {
      const {data} = await AuthInstance.get(`/api/feedback/${product_id.product_id}`);
      return data;
    } catch (error) {
      return ThunkAPI.rejectWithValue(error.statusText);
    }
  }
);

export const removeFeedback = createAsyncThunk(
  "/feedback/remove",
  async (product_id, ThunkAPI) => {
    try {
      const {data} = await AuthInstance.delete(`/api/feedback/remove/${product_id._id}`);
      console.log(data);
      return data;
    } catch (error) {
      return ThunkAPI.rejectWithValue(error.statusText);
    }
  }
)