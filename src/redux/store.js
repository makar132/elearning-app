import { configureStore } from '@reduxjs/toolkit';
import favorites from './favoritesSlice';
import onboarding from './onboardingSlice';
export const store = configureStore({
  reducer: {
    favorites,
    onboarding,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;