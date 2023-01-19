import { createAsyncThunk } from '@reduxjs/toolkit';
import { getTypeObjects } from '../../api/TypeObjectApi';
import { handleLoading, handleRejected } from '../../utils/StoreUtils';

export const fetchTypeObjects = createAsyncThunk(
  'typeObjects/fetchTypeObjects',
  async (__, { getState }) => {
    const state = getState();
    const { limit, skip } = state.typeObjects;
    const data = await getTypeObjects(limit, skip);
    return data;
  }
);

export const extraReducers = (builders) => {
  builders.addCase(fetchTypeObjects.pending, handleLoading);
  builders.addCase(fetchTypeObjects.fulfilled, (state, action) => {
    state.status = 'succeeded';
    const rows = action.payload;
    if (rows && rows?.length > 0) state.objects = rows;
  });
  builders.addCase(fetchTypeObjects.rejected, handleRejected);
};
