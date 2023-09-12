import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from '../../API/api';

export const getOrders = createAsyncThunk(
  "/orders/get",
  async (_, {getState,rejectWithValue}) => {
    try {
      const { auth } = getState();
      api.setToken(auth.token);
      const {data} = await api.AuthInstance.get('/api/orders/');
      return data.orders;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)

export const createWaybill = createAsyncThunk(
  "/orders/createWaybill",
  async (orderId, {getState,rejectWithValue}) => {
    try {
      const { auth } = getState();
      api.setToken(auth.token);
      const {data} = await api.AuthInstance.post('/api/orders/createWaybill', orderId);
      return data.message;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)

