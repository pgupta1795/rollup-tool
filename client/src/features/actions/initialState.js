export const PAGE_SIZE = 30;

const initialState = {
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  actions: [],
  currentPage: 1,
};

export default initialState;
