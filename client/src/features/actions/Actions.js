import { createAsyncThunk } from '@reduxjs/toolkit';
import { getActions } from '../../api/ActionsApi';
import { formatActions } from '../../utils/ActionsUtils';
import { handleLoading, handleRejected } from '../../utils/StoreUtils';
import { PAGE_SIZE } from './initialState';

export const fetchActions = createAsyncThunk(
  'actions/fetchActions',
  async (__, { getState }) => {
    const state = getState();
    const { currentPage } = state.actions;
    const data = await getActions(PAGE_SIZE, (currentPage - 1) * PAGE_SIZE);
    return data;
  }
);

export const extraReducers = (builders) => {
  builders.addCase(fetchActions.pending, handleLoading);
  builders.addCase(fetchActions.fulfilled, (state, action) => {
    state.status = 'succeeded';
    if (!action.payload || action.payload.length === 0) return;
    const formattedActions = formatActions(action.payload);
    state.actions = formattedActions;
  });
  builders.addCase(fetchActions.rejected, handleRejected);
};
