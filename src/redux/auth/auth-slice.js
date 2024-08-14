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
  changePassword,
  addToWishList,
  removeFromWishList,
} from "./auth-operations";

const initialState = {
  user: {
    busket: [],
    delivery: {},
    role: "",
    wishes: []
  },
  token: "",
  isLogin: false,
  isLoading: false,
  error: null,
  response: null,
  location: '',
};

const handlePending = (state) => {
  state.error = null;
  state.isLoading = true;
  state.success = false;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearErrorAndResponse(state, action) {
      state.error = null
      state.response = null
    },
    setLocation(state, {payload}) {
      state.location = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(refreshToken.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(refreshToken.fulfilled, (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
      state.isLoading = false;
      state.isLogin = true;
    });

    builder.addCase(refreshToken.rejected, handleRejected);

    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(register.fulfilled, (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
      state.isLoading = false;
      state.isLogin = true;
    });

    builder.addCase(register.rejected, handleRejected);

    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
      state.isLoading = false;
      state.isLogin = true;
    });

    builder.addCase(login.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
      state.user = "user";
    });

    builder.addCase(logout.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(logout.fulfilled, (state, { payload }) => {
      state.user = {};
      state.token = "";
      state.isLoading = false;
      state.isLogin = false;
    });

    builder.addCase(logout.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    });

    builder.addCase(current.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(current.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.isLoading = false;
      state.isLogin = true;
    });

    builder.addCase(current.rejected, (state, { error }) => {
      state.isLoading = false;
      state.error = error;
    });

    builder.addCase(updateUserDelivery.pending, handlePending);

    builder.addCase(updateUserDelivery.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.user.delivery = payload;
    });

    builder.addCase(updateUserDelivery.rejected, handleRejected);
    builder.addCase(updateUserInfo.pending, handlePending);

    builder.addCase(updateUserInfo.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.user.name = payload.user.name;
      state.user.email = payload.user.email;
      state.user.phone = payload.user.phone;
      state.response = payload.message;
    });

    builder.addCase(updateUserInfo.rejected, handleRejected);

    builder.addCase(restorePassword.pending, (store) => {
      store.isLoading = true;
      store.error = null;
    });

    builder.addCase(restorePassword.fulfilled, (store, {payload}) => {
      store.isLoading = false;
      store.response = payload;
    });

    builder.addCase(restorePassword.rejected, handleRejected);

    builder.addCase(changePassword.pending, handlePending);

    builder.addCase(changePassword.fulfilled, (store, {payload}) => {
      store.isLoading = false;
      store.response = payload.message;
    });

    builder.addCase(changePassword.rejected, (store, {payload}) => {
      store.isLoading = false;
      store.error = payload;
    });
    builder.addCase(addToWishList.pending, (store) =>  {
      store.isLoading = false;
    });

    builder.addCase(addToWishList.fulfilled, (store, {payload}) => {
      store.isLoading = false;
      store.user.wishes = payload.wishes;
    });

    builder.addCase(addToWishList.rejected, (store, {payload}) => {
      store.isLoading = false;
      store.error = payload;
    });
    builder.addCase(removeFromWishList.pending, (store) =>  {
      store.isLoading = false;
    });

    builder.addCase(removeFromWishList.fulfilled, (store, {payload}) => {
      store.isLoading = false;
      store.user.wishes = payload.wishes;
    });

    builder.addCase(removeFromWishList.rejected, (store, {payload}) => {
      store.isLoading = false;
      store.error = payload;
    });

  }
});

export const { clearErrorAndResponse, setLocation } =
  authSlice.actions;
export default authSlice.reducer;
