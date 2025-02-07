import { configureStore } from '@reduxjs/toolkit';
import { creditApi } from '../api/creditApi';


const store = configureStore({
  reducer: {
    [creditApi.reducerPath]: creditApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(creditApi.middleware)
});

export default store;
