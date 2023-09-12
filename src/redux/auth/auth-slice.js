import { createSlice } from "@reduxjs/toolkit";
import {
  login,
  current,
  register,
  refreshToken,
  logout,
  restorePassword,
  updateUserDelivery,
  updateUserInfo,
} from "./auth-operations";

const initialState = {
  user: {
    busket: [],
    delivery: {},
  },
  token: "",
  isLogin: true,
  loading: true,
  error: null,
};

const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [refreshToken.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [refreshToken.fulfilled]: (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
      state.loading = false;
      state.isLogin = true;
    },
    [refreshToken.rejected]: (state, { error }) => {
      state.loading = false;
      state.error = error;
      state.isLogin = false;
    },
    [register.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [register.fulfilled]: (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
      state.loading = false;
      state.isLogin = true;
    },
    [register.rejected]: (state, { error }) => {
      state.loading = false;
      state.error = error;
    },
    [login.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [login.fulfilled]: (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
      state.loading = false;
      state.isLogin = true;
    },
    [login.rejected]: (state, { error }) => {
      state.loading = false;
      state.error = error;
    },
    [logout.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [logout.fulfilled]: (state, { payload }) => {
      state.user = {};
      state.token = "";
      state.loading = false;
      state.isLogin = false;
    },
    [logout.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [current.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [current.fulfilled]: (state, { payload }) => {
      state.user = payload;
      state.loading = false;
      state.isLogin = true;
    },
    [current.rejected]: (state, { error }) => {
      state.loading = false;
      state.error = error;
    },
    [updateUserDelivery.pending]: handlePending,
    [updateUserDelivery.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.user.delivery = payload;
    },
    [updateUserDelivery.rejected]: handleRejected,
    [updateUserInfo.pending]: handlePending,
    [updateUserInfo.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.user.name = payload.name;
      state.user.email = payload.email;
      state.user.phone = payload.phone;
    },
    [updateUserInfo.rejected]: handleRejected,
    [restorePassword.pending]: (store) => {
      store.loading = true;
      store.error = null;
    },
    [restorePassword.fulfilled]: (store, _) => {
      store.loading = false;
    },
    [restorePassword.rejected]: (store, { error }) => {
      store.loading = false;
      store.error = error;
    },
  },
});

// [refreshToken.pending]: store => {
//   store.loading = true;
//   store.error = null;
// },
// [refreshToken.fulfilled]: (store, { payload }) => {
//   store.user = payload.user;
//   store.token = payload.token;
//   store.loading = false;
//   store.isLogin = true;
// },
// [refreshToken.rejected]: (store, { error }) => {
//   store.loading = false;
//   store.error = error;
// },
// [restorePassword.pending]: store => {
//   store.loading = true;
//   store.error = null;
// },
// [restorePassword.fulfilled]: (store, _) => {
//   store.loading = false;
// },
// [restorePassword.rejected]: (store, { error }) => {
//   store.loading = false;
//   store.error = error;
// },

export default authSlice.reducer;
