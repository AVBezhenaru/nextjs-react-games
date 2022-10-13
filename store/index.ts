import { configureStore } from '@reduxjs/toolkit';

import user from './userSlice';

export const store = configureStore({
  reducer: {
    user,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
