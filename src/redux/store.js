import { configureStore } from '@reduxjs/toolkit';

// Temporary reducer until we add real slices
const tempReducer = (state = { initialized: true }, action) => state;

export const store = configureStore({
  reducer: {
    temp: tempReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;