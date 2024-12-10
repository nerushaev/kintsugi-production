import { createAsyncThunk } from "@reduxjs/toolkit";
import { Notify } from "notiflix";
import { AuthInstance, instance } from "../../API/api";

export const getProducts = createAsyncThunk(
  "/products/get",
  async (requestData, ThunkAPI) => {
    const { page, category, search, price } = requestData;
    if (category || search || page || price) {
      try {
        const { data } = await instance.get(
          `/api/products?page=${page}${category ? `&category=${category}` : ""}${
            search ? `&search=${search}` : ""
          }${price ? `&price=${price}` : ""}`
        );
        return data;
      } catch (error) {
        return ThunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const getSearchProducts = createAsyncThunk(
  "/products/getSearch",
  async (search, ThunkAPI) => {
      try {
        const { data } = await instance.get(
          `/api/products?&search=${search}`
        );
        return data;
      } catch (error) {
        return ThunkAPI.rejectWithValue(error.message);
      }
  }
);

export const getAllProductsName = createAsyncThunk(
  "/products/getNames",
  async (_, ThunkAPI) => {
      try {
        const { data } = await instance.get(`/api/products/getNames`);
        return data;
      } catch (error) {
        return ThunkAPI.rejectWithValue(error.message);
      }
    }
);

export const getSimilarProducts = createAsyncThunk(
  "/products/getSimilar",
  async (requestData, ThunkAPI) => {
    const { category } = requestData;
      try {
        const { data } = await instance.get(
          `/api/products?page=1&category=${category}`
        );
        return data;
      } catch (error) {
        return ThunkAPI.rejectWithValue(error.message);
      }
    }
);

export const getBaners = createAsyncThunk(
  "products/getBanners",
  async (requestData, ThunkApi) => {
    try {
      await instance.get(`api/products/banners`);
    } catch (error) {
      return ThunkApi.rejectWithValue(error.message);
    }
  }
);

export const getProductsByName = createAsyncThunk(
  "/products/search",
  async (requestData, ThunkAPI) => {
    const { page, search } = requestData;
    if (search) {
      try {
        const { data } = await instance.get(
          `/api/products/search/${search}/?page=${page}`
        );
        if (data.length < 1) {
          return ThunkAPI.rejectWithValue("empty");
        }
        return data;
      } catch (error) {
        return ThunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const getFilteredProducts = createAsyncThunk(
  "/products/get/filtered",
  async (category, ThunkAPI) => {
    try {
      const { data } = await instance.get(`/api/products?category=${category}`);
      return data;
    } catch (error) {
      return ThunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getAllProducts = createAsyncThunk(
  "/products/get/all",
  async (_, ThunkAPI) => {
    try {
      const { data } = await instance.get("/api/products/all");
      return data;
    } catch (error) {
      return ThunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getProductsById = createAsyncThunk(
  "/products/get/id",
  async (productsId, ThunkAPI) => {
    try {
      const { data } = await instance.get(`/api/products/${productsId}`);
      return data;
    } catch (error) {
      return ThunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getWishProducts = createAsyncThunk(
  "/products/get/wishListProducts",
  async (productsId, ThunkAPI) => {
    try {
      const { data } = await AuthInstance.get(`/api/products/wish/${productsId}`);
      return data;
    } catch (error) {
      return ThunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addProducts = createAsyncThunk(
  "/products/add",
  async (newProduct, ThunkAPI) => {
    try {
      const { data } = await instance.post("/api/products/", newProduct);
      return data;
    } catch (error) {
      Notify.failure(error.response.data)
      return ThunkAPI.rejectWithValue(error.message);
    }
  }
);

export const removeProduct = createAsyncThunk(
  "/products/remove",
  async (productId, ThunkAPI) => {
    try {
      const { data } = await instance.delete(`/api/products/${productId}`);
      return data;
    } catch (error) {
      return ThunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updatePhotoProduct = createAsyncThunk(
  "/products/update/photo",
  async (data, ThunkAPI) => {
    const {_id, formData} = data;
    try {
      const { data } = await instance.put(
        `/api/products/photos/${_id}`,
        formData
      );
      return data;
    } catch (error) {
      return ThunkAPI.rejectWithValue(error.message);
    }
  }
);


export const updateProduct = createAsyncThunk(
  "/products/update",
  async (updateData, ThunkAPI) => {
    const {product_id} = updateData;
    try {
      const { data } = await instance.patch(
        `/api/products/update/${product_id}`,
        updateData
      );
      return data.result;
    } catch (error) {
      return ThunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getComingSoonProducts = createAsyncThunk(
  "/products/get/filtered",
  async (_, ThunkAPI) => {
    try {
      const { data } = await instance.get(`/api/products/comingSoon`);
      return data.products;
    } catch (error) {
      return ThunkAPI.rejectWithValue(error.message);
    }
  }
);

export const orderProducts = createAsyncThunk(
  "/order/addOrder",
  async (formData, ThunkAPI) => {
    try {
      const { data } = await AuthInstance.post(`/api/orders/`, formData);
      if (data) {
        setTimeout(
          Notify.success("Замовлення успішно оформлено!", {
            borderRadius: "0px",
          }),
          20000
        );
      }
      return data;
    } catch (error) {
      if (error) {
        setTimeout(
          Notify.failure(error.statusText, {
            borderRadius: "0px",
          }),
          20000
        );
      }
      return ThunkAPI.rejectWithValue(error.statusText);
    }
  }
);

export const getFavoriteProducts = createAsyncThunk(
  "/products/getFavorite",
  async (_, ThunkAPI) => {
    try {
      const { data } = await instance.get(`/api/products/favorite`);
      console.log(data);
      return data;
    } catch (error) {
      return ThunkAPI.rejectWithValue(error.statusText);
    }
  }
);

export const toggleFavoriteProducts = createAsyncThunk(
  "/products/updateFavorite",
  async ({product_id, favorite}, ThunkAPI) => {
    try {
      const { data } = await AuthInstance.patch(`/api/products/favoriteUpdate`, {product_id, favorite});
      return data;
    } catch (error) {
      return ThunkAPI.rejectWithValue(error.statusText);
    }
  }
);
