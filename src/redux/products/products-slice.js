import { createSlice } from "@reduxjs/toolkit";
import {
  getProducts,
  addProducts,
  removeProduct,
  updateProduct,
  getAllProducts,
  getComingSoonProducts,
  getProductsById,
  getProductsByName,
  orderProducts,
  getSimilarProducts,
} from "./products-operation";

const productsInitialState = {
  items: [],
  isLoading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  comingSoonProducts: [],
  busket: [],
  details: [],
  banners: [],
  similarProducts: [],
};

const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const productsSlice = createSlice({
  name: "products",
  initialState: productsInitialState,
  reducers: {
    addToBusket(state, action) {
      const itemInCart = state.busket.find(
        (item) => item._id === action.payload
      );
      if (itemInCart) {
        itemInCart.amount++;
      } else {
        state.busket.push({ ...action.payload, amount: 1 });
      }
    },
    incrementAmount: (state, action) => {
      const item = state.busket.find((item) => item._id === action.payload);
      if (item.amount) {
        item.amount++;
      }
    },
    decrementAmount: (state, action) => {
      const item = state.busket.find((item) => item._id === action.payload);
      if (item.amount === 1) {
        const removeItem = state.busket.filter(
          (item) => item._id !== action.payload
        );
        state.busket = removeItem;
      } else {
        item.amount--;
      }
    },
  },
  extraReducers: {
    [getProducts.pending]: handlePending,
    [getProducts.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload.products;
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
    },
    [getProducts.rejected]: handleRejected,
    [getSimilarProducts.pending]: handlePending,
    [getSimilarProducts.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.similarProducts = action.payload.products;
    },
    [getSimilarProducts.rejected]: handleRejected,
    [getProductsByName.pending]: handlePending,
    [getProductsByName.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload.products;
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
    },
    [getProductsByName.rejected]: handleRejected,
    [addProducts.pending]: handlePending,
    [addProducts.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items.push(action.payload);
    },
    [addProducts.rejected]: handleRejected,
    [removeProduct.pending]: (state) => {
      state.isLoading = false;
    },
    [removeProduct.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = state.items.filter(
        (product) => product._id !== action.payload._id
      );
    },
    [updateProduct.pending]: handlePending,
    [updateProduct.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = state.items.map((product) =>
        product._id === action.payload._id ? action.payload : product
      );
    },
    [updateProduct.rejected]: handleRejected,
    [getAllProducts.pending]: handlePending,
    [getAllProducts.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload.products;
    },
    [getAllProducts.rejected]: handleRejected,
    [getComingSoonProducts.pending]: handlePending,
    [getComingSoonProducts.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.comingSoonProducts = action.payload;
      // state.currentPage = action.payload.currentPage;
      // state.totalPages = action.payload.totalPages;
    },
    [getComingSoonProducts.rejected]: handleRejected,
    [getProductsById.pending]: handlePending,
    [getProductsById.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.details = action.payload;
    },
    [getProductsById.rejected]: handleRejected,
    [orderProducts.pending]: handlePending,
    [orderProducts.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.busket = [];
    },
    [orderProducts.rejected]: handleRejected,
  },
});

export const { addToBusket, incrementAmount, decrementAmount } =
  productsSlice.actions;
export const productsReducer = productsSlice.reducer;
