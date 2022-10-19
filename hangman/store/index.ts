import { configureStore } from '@reduxjs/toolkit';

import app from './reducers/AppSlice';

const store = configureStore({
  reducer: {
    app,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
