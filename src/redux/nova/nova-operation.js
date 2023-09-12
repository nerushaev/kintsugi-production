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
      console.log(data.data);
      return data.data;
    } catch (error) {
      return ThunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getCities = createAsyncThunk(
  "/cities/get",
  async (city, ThunkAPI) => {
    try {
      const { data } = await novaInstance.post(
        "https://api.novaposhta.ua/v2.0/json/",
        {
          apiKey: NOVA_API_KEY,
          modelName: "Address",
          calledMethod: "getCities",
          methodProperties: {
            FindByString: city,
            Limit: 5,
            Page: 1,
          },
        }
      );
      console.log(data.data);
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
