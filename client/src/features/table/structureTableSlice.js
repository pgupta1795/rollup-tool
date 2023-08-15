import { createSlice } from '@reduxjs/toolkit';
import {
  formatChildRows,
  formatRows,
  subItemsField,
} from '../../utils/TableUtils';
import { extraReducers } from './Actions';
import initialState from './initialState';

export const structureTable = createSlice({
  name: 'structureTable',
  initialState,
  reducers: {
    setTableData: {
      reducer(state, action) {
        state.tableData = action.payload;
      },
      prepare(rows) {
        return {
          payload: rows,
        };
      },
    },
    saveTableData: {
      reducer(state, action) {
        state.tableData = action.payload;
      },
      prepare(id, response, columns) {
        const rows = formatRows(response?.data, columns);
        const children = formatChildRows(response.children, columns, id);
        if (rows && rows?.length > 0) rows[0][subItemsField] = children || [];
        return {
          payload: rows,
        };
      },
    },
    setCellColors: (state, action) => {
      state.cellColors = action.payload;
    },
  },
  extraReducers,
});

export const getTableData = (state) => state.structureTable.tableData;

export const getObjectsStatus = (state) => state.structureTable.status;

export const getObjectsError = (state) => state.structureTable.error;

export const getCellColors = (state) => state.structureTable.cellColors;

export const { setTableData, setCellColors } = structureTable.actions;

export default structureTable.reducer;
