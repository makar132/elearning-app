import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const KEY = 'hasCompletedOnboarding';

export const hydrateOnboarding = createAsyncThunk(
  'onboarding/hydrate',
  async () => {
    const v = await AsyncStorage.getItem(KEY);
    return v === 'true';
  }
);

export const completeOnboarding = createAsyncThunk(
  'onboarding/complete',
  async () => {
    await AsyncStorage.setItem(KEY, 'true');
    return true;
  }
);

export const resetOnboarding = createAsyncThunk(
  'onboarding/reset',
  async () => {
    await AsyncStorage.removeItem(KEY);
    return false;
  }
);

const slice = createSlice({
  name: 'onboarding',
  initialState: { completed: false, hydrated: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(hydrateOnboarding.fulfilled, (state, action) => {
        state.completed = action.payload;
        state.hydrated = true;
      })
      .addCase(hydrateOnboarding.rejected, (state) => {
        state.completed = false; // safe default
        state.hydrated = true;
      })
      .addCase(completeOnboarding.fulfilled, (state) => {
        state.completed = true;
      })
      .addCase(resetOnboarding.fulfilled, (state) => {
        state.completed = false;
      });
  },
});

export const selectOnboardingCompleted = (s) => s.onboarding.completed;
export const selectOnboardingHydrated = (s) => s.onboarding.hydrated;
export default slice.reducer;
