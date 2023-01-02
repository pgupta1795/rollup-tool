import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllChildren } from '../../api/EnoviaApi';
import { updateTypeObjectById } from '../../api/TypeObjectApi';
import Constants from '../../helper/Constants';
import toast from '../../helper/toast';
import { getCellColors } from '../../utils/ColorTableUtils';
import {
  getTempCache,
  getTempStructureTableState,
  handleLoading,
  handleRejected,
  handleSaving,
  noCache,
  noTableDataCache,
} from '../../utils/StoreUtils';
import {
  formatChildRows,
  formatRows,
  saveRelatedEndItem,
  subItemsField,
  updateAttributes,
  updateRelatedEndItem,
  updateTableCell,
} from '../../utils/TableUtils';
import { setCacheTableData } from '../cache/cacheSlice';

export const fetchObjects = createAsyncThunk(
  'structureTable/fetchObjects',
  async ({ type, id, columns }, { dispatch, getState }) => {
    const state = getState();
    const data = await getAllChildren(type, id);
    const rows = formatRows(data?.data, columns);
    const children = formatChildRows(data.children, columns, id);
    if (rows && rows?.length > 0) rows[0][subItemsField] = children || [];
    // fetch the cell colors from tableData
    const cache = getTempCache(state);
    const hasNoCache = noCache(cache);
    dispatch(setCacheTableData(rows));
    const calculatedCellColors = hasNoCache ? getCellColors(rows, columns) : [];
    return { tableData: rows, cellColors: calculatedCellColors };
  }
);

export const handleRowEdit = createAsyncThunk(
  'structureTable/handleRowEdit',
  async (dataItem, { dispatch, getState }) => {
    const state = getState();
    const { tableData } = getTempStructureTableState(state);
    const cache = getTempCache(state);
    const hasNoCache = noTableDataCache(cache);
    const oldRows = hasNoCache ? tableData : cache.tableData;
    const newRows = await updateAttributes(dataItem, tableData, oldRows);
    dispatch(setCacheTableData(newRows));
    return newRows || tableData;
  }
);

export const handleEndItemChange = createAsyncThunk(
  'structureTable/handleEndItemChange',
  async ({ dataItem, column, newValue }, { getState }) => {
    const { tableData: newRows } = getTempStructureTableState(getState());
    updateTableCell(newRows, dataItem.id, column.id, newValue);
    updateRelatedEndItem(newRows, dataItem.id, column.id, newValue);
    toast.info(
      `All Children and parent of ${dataItem.title} will be marked as End Item FALSE`
    );
    await saveRelatedEndItem(newRows, dataItem.id, Constants.ENDITEM);
    await updateTypeObjectById(
      dataItem.id,
      Constants.ENDITEM,
      dataItem[Constants.ENDITEM]
    );
    return newRows;
  }
);

export const extraReducers = (builders) => {
  builders.addCase(fetchObjects.pending, handleLoading);
  builders.addCase(fetchObjects.fulfilled, (state, action) => {
    state.status = 'succeeded';
    if (!action.payload || action.payload.length === 0) return;
    const { tableData, cellColors } = action.payload;
    state.tableData = tableData;
    state.cellColors = cellColors;
  });
  builders.addCase(fetchObjects.rejected, handleRejected);
  builders.addCase(handleRowEdit.pending, handleSaving);
  builders.addCase(handleRowEdit.fulfilled, (state, action) => {
    state.status = 'succeeded';
    state.tableData = action.payload;
  });
  builders.addCase(handleRowEdit.rejected, handleRejected);
  builders.addCase(handleEndItemChange.pending, handleSaving);
  builders.addCase(handleEndItemChange.fulfilled, (state, action) => {
    state.status = 'succeeded';
    state.tableData = action.payload;
  });
  builders.addCase(handleEndItemChange.rejected, handleRejected);
};
