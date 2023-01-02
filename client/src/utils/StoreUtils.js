import toast from '../helper/toast';

/**
 * returns the structure table from redux store state
 * @param {Redux Store state} state
 * @returns
 */
export const getTempStructureTableState = (state) => {
  const tempState = JSON.parse(JSON.stringify(state));
  const { structureTable } = tempState;
  return structureTable;
};

export const getTempCache = (state) => {
  const tempState = JSON.parse(JSON.stringify(state));
  const { cache } = tempState;
  return cache;
};

export const noCache = (cache) =>
  !cache || (cache.tableData?.length === 0 && cache.cellColors?.length === 0);

export const noCellColorsCache = (cache) =>
  !cache || cache.cellColors?.length === 0;

export const noTableDataCache = (cache) =>
  !cache || cache.tableData?.length === 0;

export const handleRejected = (state, action) => {
  state.status = 'failed';
  state.error = action.error.message;
  toast.error(action.error.message);
};

export const handleLoading = (state) => {
  state.status = 'loading';
};

export const handleSaving = (state) => {
  state.status = 'saving';
};
