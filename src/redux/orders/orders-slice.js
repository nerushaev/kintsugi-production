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

  extraReducers: (builder) => {
    builder.addCase(getOrders.pending, handlePending);

    builder.addCase(getOrders.fulfilled, (state, {payload}) => {
      state.orders = payload;
    });

    builder.addCase(getOrders.rejected, handleRejected);
    builder.addCase(createWaybill.pending, handlePending);

    builder.addCase(createWaybill.fulfilled, (state, {payload}) => {
      state.waybill = payload;
    });

    builder.addCase(createWaybill.rejected, handleRejected);
  }
})

export const ordersReducer = orderSlice.reducer;