import { configureStore } from '@reduxjs/toolkit';
import actionsReducer from '../features/actions/actionsSlice';
import cacheReducer from '../features/cache/cacheSlice';
import rollupReducer from '../features/rollup/rollupSlice';
import structureTableReducer from '../features/table/structureTableSlice';
import themeReducer from '../features/theme/themeSlice';
import typesReducer from '../features/types/typesSlice';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    cache: cacheReducer,
    structureTable: structureTableReducer,
    rollup: rollupReducer,
    actions: actionsReducer,
    types: typesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
