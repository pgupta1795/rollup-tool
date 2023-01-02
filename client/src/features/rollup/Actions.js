import { createAsyncThunk } from '@reduxjs/toolkit';
import _ from 'lodash';
import {
  modifyAttributeCellColors,
  modifyBestAvailableCellColors,
} from '../../utils/ColorTableUtils';
import {
  BEST_AVAILABLE_DB_NAME,
  rollUpFromParent,
} from '../../utils/RollupUtils';
import {
  getTempCache,
  getTempStructureTableState,
  handleLoading,
  handleRejected,
  noCellColorsCache,
} from '../../utils/StoreUtils';
import { setCacheCellColors } from '../cache/cacheSlice';
import { setTableData } from '../table/structureTableSlice';
import initialState from './initialState';

export const setCheckedForBestAvailable = createAsyncThunk(
  'rollup/setCheckedForBestAvailable',
  async (payload, { dispatch, getState }) => {
    const state = getState();
    const isChecked = payload;
    const newMassChecked = {
      ...state.rollup.massChecked,
      [BEST_AVAILABLE_DB_NAME]: isChecked,
    };
    if (!isChecked) return newMassChecked;
    const { tableData, cellColors } = getTempStructureTableState(state);
    const cache = getTempCache(state);
    const hasNoCache = noCellColorsCache(cache);
    // add the state into cache state only if no cache found
    if (hasNoCache) {
      const { cellColors: cColors } = getTempStructureTableState(state);
      dispatch(setCacheCellColors(cColors));
    }
    // modify cellColors in redux store temporarily
    const newCellColors = modifyBestAvailableCellColors(
      tableData,
      hasNoCache ? cellColors : cache.cellColors
    );
    dispatch(setCacheCellColors(newCellColors));
    return newMassChecked;
  }
);

export const setCheckedForMassField = createAsyncThunk(
  'rollup/setCheckedForMassField',
  async (payload, { dispatch, getState }) => {
    const state = getState();
    const { attribute, isChecked } = payload;
    const newMassChecked = {
      ...state.rollup.massChecked,
      [attribute]: isChecked,
    };
    if (!isChecked) return newMassChecked;
    const { tableData, cellColors } = getTempStructureTableState(state);
    const cache = getTempCache(state);
    const hasNoCache = noCellColorsCache(cache);
    // add the state into cache state only if no cache found
    if (hasNoCache) {
      const { cellColors: cColors } = getTempStructureTableState(state);
      dispatch(setCacheCellColors(cColors));
    }

    // modify tableData in redux store temporarily
    const newRows = [...tableData];
    rollUpFromParent(newRows, attribute);
    dispatch(setTableData(newRows));
    // modify cellColors in redux store temporarily
    const newCellColors = modifyAttributeCellColors(
      newRows,
      hasNoCache ? cellColors : cache.cellColors,
      attribute
    );
    dispatch(setCacheCellColors(newCellColors));
    return newMassChecked;
  }
);

export const handleClickAway = createAsyncThunk(
  'rollup/handleClickAway',
  async (__, { dispatch, getState }) => {
    const state = getState();
    const { tableData, cellColors } = getTempStructureTableState(state);
    const cache = getTempCache(state);
    const hasNoCache = noCellColorsCache(cache);
    if (hasNoCache) return initialState.massChecked;
    const { tableData: cacheTableData, cellColors: cacheCellColors } = cache;
    // Clear cache
    dispatch(setCacheCellColors([]));
    const equal =
      _.isEqual(tableData, cacheTableData) &&
      _.isEqual(cellColors, cacheCellColors);
    if (equal) return initialState.massChecked;
    // rollback tableData from cache tableData
    dispatch(setTableData(cacheTableData));
    return initialState.massChecked;
  }
);

export const extraReducers = (builders) => {
  builders.addCase(setCheckedForBestAvailable.pending, handleLoading);
  builders.addCase(setCheckedForBestAvailable.fulfilled, (state, action) => {
    state.massChecked = action.payload;
  });
  builders.addCase(setCheckedForBestAvailable.rejected, handleRejected);
  builders.addCase(setCheckedForMassField.pending, handleLoading);
  builders.addCase(setCheckedForMassField.fulfilled, (state, action) => {
    state.massChecked = action.payload;
  });
  builders.addCase(setCheckedForMassField.rejected, handleRejected);
  builders.addCase(handleClickAway.pending, handleLoading);
  builders.addCase(handleClickAway.fulfilled, (state, action) => {
    state.massChecked = action.payload;
  });
  builders.addCase(handleClickAway.rejected, handleRejected);
};
