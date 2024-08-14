import { createAsyncThunk } from "@reduxjs/toolkit";
import { novaInstance, NOVA_API_KEY } from "../../API/nova";

export const getWarehouses = createAsyncThunk(
  "/warehouses/get",
  async (query, ThunkAPI) => {
    try {
      const { data } = await novaInstance.post(
        "https://api.novaposhta.ua/v2.0/json/",
        {
          apiKey: NOVA_API_KEY,
          modelName: "Address",
          calledMethod: "getWarehouses",
          methodProperties: {
            WarehouseId: query.warehouse,
            CityName: query.city,
            Limit: 5,
            Page: 1,
          },
        }
      );
      console.log(data);
      return data.data;
    } catch (error) {
      return ThunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getCities = createAsyncThunk(
  "/cities/get",
  async (city, ThunkAPI) => {
    console.log(city);
    try {
      const { data } = await novaInstance.post(
        "https://api.novaposhta.ua/v2.0/json/",
        {
          apiKey: NOVA_API_KEY,
          modelName: "Address",
          calledMethod: "searchSettlements",
          methodProperties: {
            CityName: city,
            Limit: 5,
            Page: 1,
          },
        }
      );
      console.log(data);
      return data.data[0].Addresses;
    } catch (error) {
      return ThunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getAddress = createAsyncThunk(
  "/address/get",
  async ({street, ref}, ThunkAPI) => {
    console.log(street);
    console.log(ref);
    try {
      const { data } = await novaInstance.post(
        "https://api.novaposhta.ua/v2.0/json/",
        {
          apiKey: NOVA_API_KEY,
          modelName: "Address",
          calledMethod: "searchSettlementStreets",
          methodProperties: {
            StreetName: street,
            SettlementRef: ref,
            Limit: 5,
            Page: 1,
          },
        }
      );
      console.log(data);
      return data.data[0].Addresses;
    } catch (error) {
      return ThunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getPostboxes = createAsyncThunk(
  "/postmate/get",
  async ({city, postbox}, ThunkAPI) => {
    console.log(city);
    console.log(postbox);
    try {
      const { data } = await novaInstance.post(
        "https://api.novaposhta.ua/v2.0/json/",
        {
          apiKey: NOVA_API_KEY,
          modelName: "Address",
          calledMethod: "getWarehouses",
          methodProperties: {
            FindByString: postbox,
            TypeOfWarehouseRef: "f9316480-5f2d-425d-bc2c-ac7cd29decf0",
            CityName: city,
            Limit: 5,
            Page: 1
          }
        }
      );
      console.log(data);
      return data.data;
    } catch (error) {
      return ThunkAPI.rejectWithValue(error.message);
    }
  }
);
// export const getOrderStatus = createAsyncThunk(
//   "/getOrderStatus",
//   async (data, ThunkAPI) => {
//     try {
//       const data = await novaInstance.post(
//         "https://api.novaposhta.ua/v2.0/json/",
//         {
//           apiKey: NOVA_API_KEY,
//           modelName: "TrackingDocument",
//           calledMethod: "getStatusDocuments",
//           methodProperties: {
//             Documents: data,
//           },
//         }
//       );
//       return data;
//     } catch (error) {
//       return ThunkAPI.rejectWithValue(error.message);
//     }
//   }
// );
