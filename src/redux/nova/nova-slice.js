import { createSlice } from "@reduxjs/toolkit";
import { getCities, getWarehouses } from "./nova-operation";

const novaInitialState = {
  city: "",
  cityRef: "",
  warehouse: "",
  recipientWarehouseIndex: "",
  warehouseRef: "",
  warehouseAddress: "",
  cities: [],
  warehouses: [],
  citiesLoading: false,
  warehousesLoading: false,
  error: null,
};

// const handlePending = (state) => {
//   state.loading = true;
// };

// const handleRejected = (state, action) => {
//   state.loading = false;
//   state.error = action.payload;
// };

const novaSlice = createSlice({
  name: "nova",
  initialState: novaInitialState,

  reducers: {
    selectCity(state, { payload }) {
      state.city = payload.city;
      state.cityRef = payload.cityRef;
    },
    removeCitiesList(state, _) {
      state.cities = [];
    },
    selectWarehouse(state, { payload }) {
      state.warehouseAddress = payload.ShortAddress;
      state.warehouseRef = payload.Ref;
      state.recipientWarehouseIndex = payload.WarehouseIndex;
      state.warehouse = payload.Description;
    },
    removeWarehousesList(state, _) {
      state.warehouses = [];
    },
    clearDeliveryInfo(state, _) {
      return novaInitialState;
    }
  },

  extraReducers: (builder) => {
    builder.addCase(getWarehouses.pending, (state) => {
      state.warehousesLoading = true;
      state.error = null;
    });

    builder.addCase(getWarehouses.fulfilled, (state, { payload }) => {
      state.warehouses = payload;
      state.warehousesLoading = false;
    });

    builder.addCase(getWarehouses.rejected, (state, { error }) => {
      state.warehousesLoading = false;
      state.error = error;
    });

    builder.addCase(getCities.pending, (state) => {
      state.citiesLoading = true;
      state.error = null;
    });

    builder.addCase(getCities.fulfilled, (state, { payload }) => {
      state.cities = payload;
      state.citiesLoading = false;
    });

    builder.addCase(getCities.rejected, (state, { error }) => {
      state.citiesLoading = false;
      state.error = error;
    });
  }
});

export const {
  selectCity,
  removeCitiesList,
  selectWarehouse,
  removeWarehousesList,
  clearDeliveryInfo,
} = novaSlice.actions;

export const novaReducer = novaSlice.reducer;
