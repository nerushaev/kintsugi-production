import { createSlice } from "@reduxjs/toolkit";
import {
  getProducts,
  addProducts,
  removeProduct,
  getAllProducts,
  getComingSoonProducts,
  getProductsById,
  getProductsByName,
  orderProducts,
  getSimilarProducts,
  getAllProductsName,
  getWishProducts,
  updatePhotoProduct,
  updateProduct,
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
  orderAccepted: false,
  feedback: [],
  response: null,
  productsName: [],
  wishList: [],
  monoPayUrl: ''
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
    removeFromBusket: (state, {payload}) => {
      const resultBusket = state.busket.filter(item => item.product_id !== payload);
      console.log(resultBusket);
      state.busket = resultBusket;
    },
    clearBusket: (state, action) => {
      state.busket = [];
    },
    clearOrderInfo: (state, action) => {
      state.orderId = "";
      state.orderAccepted = false;
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

    builder.addCase(updatePhotoProduct.pending, handlePending);

    builder.addCase(updatePhotoProduct.fulfilled, (state, {payload}) => {
      state.isLoading = false;
      state.error = null;
      state.details.photo_extra = payload.photo_extra;
    });

    builder.addCase(updatePhotoProduct.rejected, handleRejected);
    builder.addCase(updateProduct.pending, handlePending);

    builder.addCase(updateProduct.fulfilled, (state, {payload}) => {
      state.isLoading = false;
      state.error = null;
      state.details = payload;
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
      state.busket = [];
      state.orderAccepted = true;
      state.monoPayUrl = action.payload.payments?.pageUrl;
    });

    builder.addCase(orderProducts.rejected, handleRejected);
    builder.addCase(getAllProductsName.pending, handlePending);

    builder.addCase(getAllProductsName.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.productsName = action.payload.productsName;
    });

    builder.addCase(getAllProductsName.rejected, handleRejected);
    builder.addCase(getWishProducts.pending, (state) =>  {
      state.isLoading = true;
    });

    builder.addCase(getWishProducts.fulfilled, (state, {payload}) => {
      state.isLoading = false;
      state.wishList = payload.products;
    });

    builder.addCase(getWishProducts.rejected, (state, {payload}) => {
      state.isLoading = false;
      state.error = payload;
    });
  }
});

export const { addToBusket, incrementAmount, decrementAmount, clearBusket, clearOrderInfo, removeFromBusket } =
  productsSlice.actions;
export const productsReducer = productsSlice.reducer;
