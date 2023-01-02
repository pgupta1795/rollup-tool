import { createSlice } from '@reduxjs/toolkit';
import { extraReducers } from './Actions';
import initialState from './initialState';

export const actionsSlice = createSlice({
  name: 'actions',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers,
});

export const selectAllActions = (state) => state.actions.actions;
export const getActionsStatus = (state) => state.actions.status;
export const getActionsError = (state) => state.actions.error;

export const { setCurrentPage } = actionsSlice.actions;

export default actionsSlice.reducer;
