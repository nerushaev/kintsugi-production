import { createSlice } from "@reduxjs/toolkit";
import { createWaybill, getOrders } from "./order-operations";

const ordersInitialState = {
  orders: [],
  loading: false,
  error: null,
  waybill: '',
}

const handlePending = (state) => {
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const orderSlice = createSlice({
  name: "orders",
  initialState: ordersInitialState,
  extraReducers: {
    [getOrders.pending]: handlePending,
    [getOrders.fulfilled] (state, {payload}) {
      state.orders = payload;
    },
    [getOrders.rejected]: handleRejected,
    [createWaybill.pending]: handlePending,
    [createWaybill.fulfilled] (state, {payload}) {
      state.waybill = payload;
    },
    [createWaybill.rejected]: handleRejected,
  }
})

export const ordersReducer = orderSlice.reducer;