import { configureStore } from '@reduxjs/toolkit';
import api from './reduxQuery/api';
import { rtkQueryErrorLogger } from './middleware/errorHandler';

export const store = configureStore({
  reducer: {
    api: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, rtkQueryErrorLogger),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
