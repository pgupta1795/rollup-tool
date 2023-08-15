import { createSlice } from '@reduxjs/toolkit';
import { extraReducers } from './Actions';
import initialState from './initialState';

export const rollup = createSlice({
  name: 'rollup',
  initialState,
  reducers: {
    setCheckedForAll: (state, action) => {
      const isChecked = action.payload;
      Object.keys(state.massChecked).forEach((attribute) => {
        state.massChecked[attribute] = isChecked;
      });
    },
  },
  extraReducers,
});

export const { setCheckedForAll } = rollup.actions;

/** If no checkbox selected return error */
export const hasError = (state) =>
  Object.values(state.rollup.massChecked).every((val) => val === false);

export const getCheckedFields = (state) =>
  Object.keys(state.rollup.massChecked).filter(
    (key) => state.rollup.massChecked[key] === true
  );

export const isCheckedForField = (state, field) =>
  state.rollup.massChecked[field];

export const isCheckedForAll = (state) =>
  Object.values(state.rollup.massChecked).every((val) => val === true);

export const isCheckedForAny = (state) =>
  Object.values(state.rollup.massChecked).some((val) => val === true) &&
  Object.values(state.rollup.massChecked).some((val) => val === false);

export default rollup.reducer;
