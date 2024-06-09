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
    role: "admin",
  },
  token: "",
  isLogin: true,
  loading: false,
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

  extraReducers: (builder) => {
    builder.addCase(refreshToken.pending, (state) => {
      state.loading = false;
      state.error = null;
    });

    builder.addCase(refreshToken.fulfilled, (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
      state.loading = false;
      state.isLogin = true;
    });

    builder.addCase(refreshToken.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error;
      state.isLogin = false;
      state.user = "user";
    });

    builder.addCase(register.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(register.fulfilled, (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
      state.loading = false;
      state.isLogin = true;
    });

    builder.addCase(register.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error;
    });

    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
      state.loading = false;
      state.isLogin = true;
    });

    builder.addCase(login.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error;
      state.user = "user";
    });

    builder.addCase(logout.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(logout.fulfilled, (state, { payload }) => {
      state.user = {};
      state.token = "";
      state.loading = false;
      state.isLogin = false;
    });

    builder.addCase(logout.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    builder.addCase(current.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(current.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.loading = false;
      state.isLogin = true;
    });

    builder.addCase(current.rejected, (state, { error }) => {
      state.loading = false;
      state.error = error;
    });

    builder.addCase(updateUserDelivery.pending, handlePending);

    builder.addCase(updateUserDelivery.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user.delivery = payload;
    });

    builder.addCase(updateUserDelivery.rejected, handleRejected);
    builder.addCase(updateUserInfo.pending, handlePending);

    builder.addCase(updateUserInfo.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user.name = payload.name;
      state.user.email = payload.email;
      state.user.phone = payload.phone;
    });

    builder.addCase(updateUserInfo.rejected, handleRejected);

    builder.addCase(restorePassword.pending, (store) => {
      store.loading = true;
      store.error = null;
    });

    builder.addCase(restorePassword.fulfilled, (store, _) => {
      store.loading = false;
    });

    builder.addCase(restorePassword.rejected, (store, { error }) => {
      store.loading = false;
      store.error = error;
    });
  }
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
