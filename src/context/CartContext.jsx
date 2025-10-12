import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartContext = createContext();
const CART_STORAGE_KEY = '@cart_courses';

export const CartProvider = ({ children }) => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    loadCart();
  }, []);

  useEffect(() => {
    if (enrolledCourses.length >= 0) {
      saveCart();
    }
  }, [enrolledCourses]);

  // Load from storage
  const loadCart = async () => {
    try {
      const saved = await AsyncStorage.getItem(CART_STORAGE_KEY);
      if (saved) setEnrolledCourses(JSON.parse(saved));
    } catch (err) {
      console.error('Error loading cart:', err);
    }
  };

  // Save to storage
  const saveCart = async () => {
    try {
      await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(enrolledCourses));
    } catch (err) {
      console.error('Error saving cart:', err);
    }
  };

  // Check in cart
  const isEnrolled = (courseId) => {
    return enrolledCourses.some(course => course.id === courseId);
  };

  // Add course
  const enrollInCourse = (courseId, courseData) => {
    if (isEnrolled(courseId)) return false;
    setEnrolledCourses(prev => [...prev, { id: courseId, ...courseData }]);
    return true;
  };

  // Remove course
  const unenrollFromCourse = (courseId) => {
    setEnrolledCourses(prev => prev.filter(c => c.id !== courseId));
  };

  // Clear all courses
  const clearEnrolledCourses = () => {
    setEnrolledCourses([]);
  };

  // Calculate total price
  const getTotalPrice = () => {
    return enrolledCourses.reduce((total, course) => total + (parseFloat(course.price) || 0), 0);
  };

  return (
    <CartContext.Provider value={{
      enrolledCourses,
      isEnrolled,
      enrollInCourse,
      unenrollFromCourse,
      clearEnrolledCourses,
      getTotalPrice,
      checkoutCount: enrolledCourses.length
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);