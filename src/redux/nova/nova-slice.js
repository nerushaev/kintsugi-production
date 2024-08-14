import { createSlice } from "@reduxjs/toolkit";
import { getAddress, getCities, getPostboxes, getWarehouses } from "./nova-operation";

const novaInitialState = {
  city: "",
  cityWarehouse: "",
  cityRef: "",
  warehouse: "",
  recipientWarehouseIndex: "",
  warehouseRef: "",
  warehouseAddress: "",
  postbox: "",
  address: "",
  cities: [],
  warehouses: [],
  postboxes: [],
  addresses: [],
  citiesLoading: false,
  warehousesLoading: false,
  postboxesLoading: false,
  addressLoading: false,
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
    selectCityWarehouse(state, { payload }) {
      state.cityWarehouse = payload;
    },
    selectPostbox(state, { payload }) {
      state.postbox = payload;
    },
    selectAddress(state, { payload }) {
      state.address = payload;
    },
    removeCitiesList(state, _) {
      state.cities = [];
    },
    removeAddressesList(state, _) {
      state.addresses = [];
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
    removePostboxesList(state, _) {
      state.postboxes = [];
    },
    clearDeliveryInfo(state, _) {
      return novaInitialState;
    },
    setNova(state, {payload}) {
      state = payload;
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

    builder.addCase(getPostboxes.pending, (state) => {
      state.postboxLoading = true;
      state.error = null;
    });

    builder.addCase(getPostboxes.fulfilled, (state, { payload }) => {
      state.postboxes = payload;
      state.postboxLoading = false;
    });

    builder.addCase(getPostboxes.rejected, (state, { error }) => {
      state.postboxLoading = false;
      state.error = error;
    });

    builder.addCase(getAddress.pending, (state) => {
      state.addressLoading = true;
      state.error = null;
    });

    builder.addCase(getAddress.fulfilled, (state, { payload }) => {
      state.addresses = payload;
      state.addressLoading = false;
    });

    builder.addCase(getAddress.rejected, (state, { error }) => {
      state.addressLoading = false;
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
  setNova,
  selectCityWarehouse,
  removePostboxesList,
  selectPostbox,
  removeAddressesList,
  selectAddress
} = novaSlice.actions;

export const novaReducer = novaSlice.reducer;
