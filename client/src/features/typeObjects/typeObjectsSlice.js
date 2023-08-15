import { createSlice } from '@reduxjs/toolkit';
import { extraReducers } from './Actions';
import initialState from './initialState';

export const typeObjectsSlice = createSlice({
  name: 'typeObjects',
  initialState,
  reducers: {},
  extraReducers,
});

export const selectLocalTypeObjects = (state) => state.typeObjects.objects;
export const getTypeObjectsStatus = (state) => state.typeObjects.status;
export const getTypeObjectsError = (state) => state.typeObjects.error;

export default typeObjectsSlice.reducer;
