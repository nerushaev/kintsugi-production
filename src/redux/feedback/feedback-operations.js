import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthInstance } from "../../API/api";

export const addFeedback = createAsyncThunk(
  "/feedback/add",
  async (newData, ThunkAPI) => {
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
  async (productId, ThunkAPI) => {
    const {_id} = productId;
    try {
      const {data} = await AuthInstance.get(`/api/feedback/${_id}`);
      return data;
    } catch (error) {
      return ThunkAPI.rejectWithValue(error.statusText);
    }
  }
);