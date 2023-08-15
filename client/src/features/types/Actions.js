import { createAsyncThunk } from '@reduxjs/toolkit';
import { searchObjects } from '../../api/EnoviaApi';
import { handleLoading, handleRejected } from '../../utils/StoreUtils';
import { formatRows } from '../../utils/TableUtils';

export const fetchObjects = createAsyncThunk(
  'types/fetchObjects',
  async ({ type, columns }, { getState }) => {
    const state = getState();
    const { pagination } = state.types;
    const data = await searchObjects(
      type,
      pagination.pageSize,
      pagination.pageIndex * pagination.pageSize
    );
    return { data, columns };
  }
);

export const extraReducers = (builders) => {
  builders.addCase(fetchObjects.pending, handleLoading);
  builders.addCase(fetchObjects.fulfilled, (state, action) => {
    state.status = 'succeeded';
    if (!action.payload || action.payload.length === 0) return;
    const { data, columns } = action.payload;
    const rows = formatRows(data, columns);
    if (rows && rows?.length > 0) state.objects = rows;
  });
  builders.addCase(fetchObjects.rejected, handleRejected);
};
