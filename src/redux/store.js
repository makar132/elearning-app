import { configureStore } from '@reduxjs/toolkit';
import favorites from './favoritesSlice';
import language from './langSlice';
import onboarding from './onboardingSlice';
import theme from './themeSlice';
export const store = configureStore({
  reducer: {
    favorites,
    onboarding,
    language,
    theme
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;