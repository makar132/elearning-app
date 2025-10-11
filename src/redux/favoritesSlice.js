import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: { favoriteCourses: [] },
    reducers: {
        addFavorite(state, action) {
            const course = action.payload; // {id, title, imageUrl, ...}
            if (!state.favoriteCourses.find(c => c.id === course.id)) {
                state.favoriteCourses.push(course);
            }
        },
        removeFavorite(state, action) {
            const courseId = action.payload;
            state.favoriteCourses = state.favoriteCourses.filter(c => c.id !== courseId);
        },
        clearFavorites(state) {
            state.favoriteCourses = [];
        }
    }
});

export const { addFavorite, removeFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
