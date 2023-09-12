import { createSlice } from '@reduxjs/toolkit';

const searchInitialState = '';

const searchSlice = createSlice({
  name: 'search',
  initialState: searchInitialState,
  reducers: {
    setSearch(state, action) {
      return action.payload;
    },
  },
});

export const { setSearch } = searchSlice.actions;
export const searchReducer = searchSlice.reducer;