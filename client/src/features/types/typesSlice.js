import { createSlice } from '@reduxjs/toolkit';
import { extraReducers } from './Actions';
import initialState from './initialState';

export const typesSlice = createSlice({
  name: 'types',
  initialState,
  reducers: {
    setPagination: (state, action) => {
      state.pagination = action.payload;
    },
  },
  extraReducers,
});

export const selectTypeObjects = (state) => state.types.objects;
export const getTypesStatus = (state) => state.types.status;
export const getTypesError = (state) => state.types.error;
export const getPagination = (state) => state.types.pagination;

export const { setPagination } = typesSlice.actions;

export default typesSlice.reducer;
