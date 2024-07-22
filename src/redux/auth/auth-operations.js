import { createAsyncThunk } from "@reduxjs/toolkit";
import { Notify } from "notiflix";
import * as api from "../../API/api";

export const register = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const result = await api.instance.post("/api/auth/register", data);
      setTimeout(
        Notify.success("регістрація пройшла успішно!", {
          borderRadius: "0px",
        }),
        20000
      );
      api.setToken(result.data.token);
      return result.data;
    } catch (error) {
      // if (error) {
      //   setTimeout(
      //     Notify.failure(error.data.message, {
      //       borderRadius: "0px",
      //     }),
      //     20000
      //   );
      // }
      return rejectWithValue(error.response.data);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue, getState }) => {
    try {
      const result = await api.AuthInstance.post("/api/auth/login", data);
      setTimeout(
        Notify.success(`${result.data.user.name} з поверненням!`, {
          borderRadius: "0px",
        }),
        20000
      );

      api.setToken(result.data.token);
      return result.data;
    } catch ({data}) {
      console.log(data);
      return rejectWithValue(data);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await api.AuthInstance.post("/api/auth/logout");
      api.setToken("");
      return;
    } catch (error) {
      if (error) {
        setTimeout(
          Notify.failure(error.message, {
            borderRadius: "0px",
          }),
          20000
        );
      }
      return rejectWithValue(error.error);
    }
  }
);

export const current = createAsyncThunk(
  "auth/current",
  async (_, { rejectWithValue, getState, dispatch }) => {
    try {
      const { auth } = getState();
      api.setToken(auth.token);
      const result = await api.AuthInstance.get("/api/auth/current");
      return result.data.user;
    } catch ({ responce }) {
      dispatch(refreshToken());
      const error = {
        status: responce.status,
        message: responce.data.message,
      };
      return rejectWithValue(error);
    }
  }
);

export const refreshToken = createAsyncThunk(
  "auth/refresh",
  async (_, { rejectWithValue }) => {
    try {
      const result = await api.AuthInstance.get("/api/auth/refresh");
      // return result.data;
      api.setToken(result.data.token);
      return result.data;
    } catch ({ responce }) {
      const error = {
        status: responce.status,
        message: responce.data.message,
      };
      return rejectWithValue(error);
    }
  }
);

export const updateUserDelivery = createAsyncThunk(
  "auth/updateDelivery",
  async (data, { rejectWithValue, getState }) => {
    const { nova, auth } = getState();
    api.setToken(auth.token);
    const newData = {
      city: nova.city,
      cityRef: nova.cityRef,
      warehouse: nova.warehouse,
      recipientWarehouseIndex: nova.recipientWarehouseIndex,
      warehouseRef: nova.warehouseRef,
      warehouseAddress: nova.warehouseAddress,
    };
    try {
      await api.AuthInstance.patch("/api/auth/updateUserDelivery", newData);
      Notify.success("Місто і відділення зміненно!");
      return data;
    } catch ({ responce }) {
      Notify.failure(responce.message);
      const error = {
        status: responce.status,
        message: responce.data.message,
      };
      return rejectWithValue(error);
    }
  }
);

export const restorePassword = createAsyncThunk(
  "auth/restore",
  async (userEmail, { rejectWithValue }) => {
    try {
      api.setToken("");
      const { data } = await api.AuthInstance.patch(
        `/api/auth/restore`,
        userEmail
      );
      return data;
    } catch ({ responce }) {
      const error = {
        status: responce.status,
        message: responce.data.message,
      };
      return rejectWithValue(error);
    }
  }
);

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (newPass, { rejectWithValue }) => {
    try {
      const { data } = await api.AuthInstance.patch(
        `/api/auth/changePassword`,
        newPass
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateUserInfo = createAsyncThunk(
  "auth/updateUser",
  async (newData, { rejectWithValue }) => {
    try {
      const { data } = await api.AuthInstance.patch(
        "/api/auth/updateUser",
        newData
      );
      Notify.success("Ваші данні було зміненно!");
      console.log(data);
      return data;
    } catch ({ data }) {
      Notify.failure(data.message);
      const error = {
        status: data.status,
        message: data.message,
      };
      return rejectWithValue(error);
    }
  }
);

export const addToWishList = createAsyncThunk(
  "user/addToWish",
  async (data, {rejectWithValue}) => {
    try {
      const result = await api.AuthInstance.patch(
        "/api/auth/addToWish",
        data
      )
      return result.data;
    } catch (error) {
      return rejectWithValue(error.data.message);
    }
  }
);

export const removeFromWishList = createAsyncThunk(
  "user/removeFromWish",
  async (data, {rejectWithValue}) => {
    try {
      const result = await api.AuthInstance.patch(
        "/api/auth/removeFromWish",
        data
      )
      return result.data;
    } catch (error) {
      return rejectWithValue(error.data.message);
    }
  }
)


