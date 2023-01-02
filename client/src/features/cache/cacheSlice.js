import { createSlice } from '@reduxjs/toolkit';

export const cacheInitialState = {
  tableData: [],
  cellColors: [],
};

export const cache = createSlice({
  name: 'cache',
  initialState: cacheInitialState,
  reducers: {
    setCache: (state, action) => {
      const { tableData, cellColors } = action.payload;
      state.tableData = tableData;
      state.cellColors = cellColors;
    },
    setCacheTableData: (state, action) => {
      state.tableData = action.payload;
    },
    setCacheCellColors: (state, action) => {
      state.cellColors = action.payload;
    },
  },
});

export const getCache = (state) => state.cache;

export const getCacheCellColors = (state) => state.cache.cellColors;

export const { setCache, setCacheTableData, setCacheCellColors } =
  cache.actions;

export default cache.reducer;
