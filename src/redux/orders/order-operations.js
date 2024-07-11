import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from '../../API/api';

export const getOrders = createAsyncThunk(
  "/orders/get",
  async (ordersId, {getState,rejectWithValue}) => {
    try {
      const {data} = await api.AuthInstance.post('/api/orders/get', ordersId);
      return data.order;
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

// export const getSignature = createAsyncThunk(
//   "order/getSignature",
//   async(products, {getState, rejectWithValue}) => {
//     try {
//       const result = await api.AuthInstance.post(
//         `api/orders/createSignature`,
//         { products: orderData.products }
//       );
//       if (result.data) {
//         setData(result.data.data);
//         setSignature(result.data.signature);
//       }
//     } catch (error) {}
//   }
// )

