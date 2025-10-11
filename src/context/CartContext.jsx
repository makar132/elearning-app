import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create the Context
const CartContext = createContext();
const CART_STORAGE_KEY = '@cart_courses';

export const CartProvider = ({ children }) => {
  // Courses in the cart
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  // Load cart when app starts
  useEffect(() => {
    loadCart();
  }, []);

  // Save cart whenever it changes
  useEffect(() => {
    if (enrolledCourses.length >= 0) {
      saveCart();
    }
  }, [enrolledCourses]);

  // Load cart from storage
  const loadCart = async () => {
    try {
      const saved = await AsyncStorage.getItem(CART_STORAGE_KEY);
      if (saved) setEnrolledCourses(JSON.parse(saved));
    } catch (err) {
      console.error('Error loading cart:', err);
    }
  };

  // Save cart to storage
  const saveCart = async () => {
    try {
      await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(enrolledCourses));
    } catch (err) {
      console.error('Error saving cart:', err);
    }
  };

  // Check if course is already in cart
  const isEnrolled = (courseId) => {
    return enrolledCourses.some(course => course.id == courseId);
  };

  // Add course to cart
  const enrollInCourse = (courseId, courseData) => {
    if (isEnrolled(courseId)) return false; // Don't add if already exists
    setEnrolledCourses(prev => [...prev, { id: courseId, ...courseData }]);
    return true;
  };

  // Remove course from cart
  const unenrollFromCourse = (courseId) => {
    setEnrolledCourses(prev => prev.filter(c => c.id != courseId));
  };

  // Clear all courses from cart
  const clearEnrolledCourses = () => {
    setEnrolledCourses([]);
  };

  //  total price 
  const getTotalPrice = () => {
    return enrolledCourses.reduce((total, course) => total + (parseFloat(course.price) || 0), 0);
  };

  return (
    <CartContext.Provider value={{
      enrolledCourses,        // List of courses
      isEnrolled,             // Check function
      enrollInCourse,         // Add function
      unenrollFromCourse,     // Remove function
      clearEnrolledCourses,   // Clear function
      getTotalPrice,          // Calculate total function
      checkoutCount: enrolledCourses.length  // Number of courses
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook to use Cart anywhere
export const useCart = () => useContext(CartContext);