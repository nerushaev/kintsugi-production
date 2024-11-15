import { createSlice } from '@reduxjs/toolkit';

const navigationInitialState = {
  currentLocation: "",
  previousLocation: "",
};

const navigationSlice = createSlice({
  name: 'filter',
  initialState: navigationInitialState,
  reducers: {
    setCurrentLocation(state, action) {
      return state.previousLocation = action.payload;
    },
  },
});

export const { setCurrentLocation } = navigationSlice.actions;
export const navigationReducer = navigationSlice.reducer;