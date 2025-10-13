
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// key for async storage
const FAVORITES_STORAGE_KEY = '@favorite_courses';

// create context
const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favoriteCourses, setFavoriteCourses] = useState([]);

  // load favorites at start
  useEffect(() => {
    loadFavorites();
  }, []);

  // save favorites when changed
  useEffect(() => {
    saveFavorites();
  }, [favoriteCourses]);

  // load favorites from async storage
  const loadFavorites = async () => {

    const saved = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
    if (saved) {
      setFavoriteCourses(JSON.parse(saved));
    } else {

    }

  };


  // save favorites to async storage
  const saveFavorites = async () => {
    try {
      await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteCourses));
    } catch (err) {
      console.error('Error saving favorites:', err);
    }
  };

  //  check if course is in favorites by id 
  const isFavorite = (courseId) => {
    return favoriteCourses.some(course => course.id === courseId);
  };

  // toggle favorite status
  const toggleFavorite = (course) => {
    if (isFavorite(course.id)) {
      setFavoriteCourses(prev => prev.filter(c => c.id !== course.id)); // remove
    } else {
      setFavoriteCourses(prev => [...prev, course]); // add
    }
  };

  // 🧱 هنا بنوفر البيانات والدوال لكل الصفحات
  return (
    <FavoritesContext.Provider value={{
      favoriteCourses,
      toggleFavorite,
      isFavorite,
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Hook للاستخدام في أي صفحة بسهولة
export const useFavorites = () => useContext(FavoritesContext);