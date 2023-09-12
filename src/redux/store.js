import { configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./auth/auth-slice";
import { productsReducer } from "./products/products-slice";
import { filterReducer } from "./filter/filter-slice";
import { searchReducer } from "./search/search-slice";
import { novaReducer } from "./nova/nova-slice";
import { ordersReducer } from "./orders/orders-slice";

const persistAuthConfig = {
  key: ["token"],
  storage,
  whitelist: ["token"],
};

const persistProductsConfig = {
  key: ["busket"],
  storage,
  whitelist: ["busket"],
};

const persistedAuthReducer = persistReducer(persistAuthConfig, authReducer);
const persistedProductsReducer = persistReducer(
  persistProductsConfig,
  productsReducer
);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    products: persistedProductsReducer,
    filter: filterReducer,
    search: searchReducer,
    nova: novaReducer,
    orders: ordersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
