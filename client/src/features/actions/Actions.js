import { createAsyncThunk } from '@reduxjs/toolkit';
import { getActions } from '../../api/ActionsApi';
import { formatActions } from '../../utils/ActionsUtils';
import { handleLoading, handleRejected } from '../../utils/StoreUtils';

export const fetchActions = createAsyncThunk(
  'actions/fetchActions',
  async () => {
    const data = await getActions();
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
