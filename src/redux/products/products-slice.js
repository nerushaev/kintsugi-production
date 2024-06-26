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
  orderId: '',
  liqpay: null,
  feedback: [],
  response: null,
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
        (item) => item.product_id === action.payload
      );
      if (itemInCart) {
        itemInCart.amount++;
      } else {
        state.busket.push({ ...action.payload, amount: 1 });
      }
    },
    incrementAmount: (state, action) => {
      const item = state.busket.find((item) => item.product_id === action.payload);
      if (item.amount) {
        item.amount++;
      }
    },
    decrementAmount: (state, action) => {
      const item = state.busket.find((item) => item.product_id === action.payload);
      if (item.amount === 1) {
        const removeItem = state.busket.filter(
          (item) => item.product_id !== action.payload
        );
        state.busket = removeItem;
      } else {
        item.amount--;
      }
    },
    clearBusket: (state, action) => {
      state.busket = [];
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, handlePending);

    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload.products;
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
      state.liqpay = null;
    });

    builder.addCase(getProducts.rejected, handleRejected);
    builder.addCase(getSimilarProducts.pending, handlePending);

    builder.addCase(getSimilarProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.similarProducts = action.payload.products;
      state.liqpay = null;
    });

    builder.addCase(getSimilarProducts.rejected, handleRejected);
    builder.addCase(getProductsByName.pending, handlePending);

    builder.addCase(getProductsByName.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload.products;
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
    });

    builder.addCase(getProductsByName.rejected, handleRejected);
    builder.addCase(addProducts.pending, handlePending);

    builder.addCase(addProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.items.push(action.payload);
    });

    builder.addCase(addProducts.rejected, handleRejected);

    builder.addCase(removeProduct.pending, (state) => {
      state.isLoading = false;
    });

    builder.addCase(removeProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.items = state.items.filter(
        (product) => product._id !== action.payload._id
      );
    });

    builder.addCase(updateProduct.pending, handlePending);

    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.items = state.items.map((product) =>
        product._id === action.payload._id ? action.payload : product
      );
    });

    builder.addCase(updateProduct.rejected, handleRejected);
    builder.addCase(getAllProducts.pending, handlePending);

    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload.products;
    });

    builder.addCase(getAllProducts.rejected, handleRejected);
    builder.addCase(getComingSoonProducts.pending, handlePending);

    builder.addCase(getComingSoonProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.comingSoonProducts = action.payload;
      // state.currentPage = action.payload.currentPage;
      // state.totalPages = action.payload.totalPages;
    });

    builder.addCase(getComingSoonProducts.rejected, handleRejected);
    builder.addCase(getProductsById.pending, handlePending);

    builder.addCase(getProductsById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.details = action.payload;
    });

    builder.addCase(getProductsById.rejected, handleRejected);
    builder.addCase(orderProducts.pending, handlePending);

    builder.addCase(orderProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.orderId = action.payload.orderId;
      state.liqpay = action.payload.liqpay;
      state.busket = [];
    });

    builder.addCase(orderProducts.rejected, handleRejected);
  }
});

export const { addToBusket, incrementAmount, decrementAmount, clearBusket } =
  productsSlice.actions;
export const productsReducer = productsSlice.reducer;
