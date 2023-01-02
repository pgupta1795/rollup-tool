export const PAGE_SIZE = 10;

const initialState = {
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  objects: [],
  pagination: {
    pageIndex: 0,
    pageSize: PAGE_SIZE,
  },
};

export default initialState;
