export const PAGE_SIZE = 10;

const initialState = {
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  objects: [],
  limit: 10,
  skip: 0,
};

export default initialState;
