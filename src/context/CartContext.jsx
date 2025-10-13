import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db, auth } from "../services/firebaseConfig";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";

const CartContext = createContext();
const CART_STORAGE_KEY = "@checkout_courses";

export const CartProvider = ({ children }) => {
  const [checkoutCourses, setCheckoutCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = auth.currentUser?.uid;

  // 🧩 تحميل البيانات عند تشغيل التطبيق أو تغيّر المستخدم
  useEffect(() => {
    const init = async () => {
      if (userId) {
        await syncWithFirestore();
      } else {
        await loadCheckoutFromStorage();
      }
      setLoading(false);
    };
    init();
  }, [userId]);

  // 💾 الحفظ في AsyncStorage كل مرة يحصل فيها تغيير
  useEffect(() => {
    saveCheckoutToStorage();
  }, [checkoutCourses]);

  // تحميل البيانات من AsyncStorage
  const loadCheckoutFromStorage = async () => {
    try {
      const saved = await AsyncStorage.getItem(CART_STORAGE_KEY);
      if (saved) setCheckoutCourses(JSON.parse(saved));
    } catch (err) {
      console.error("Error loading checkout:", err);
    }
  };

  // الحفظ إلى AsyncStorage
  const saveCheckoutToStorage = async () => {
    try {
      await AsyncStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(checkoutCourses)
      );
    } catch (err) {
      console.error("Error saving checkout:", err);
    }
  };

  // 🔄 المزامنة من Firestore → Local
  const syncWithFirestore = async () => {
    try {
      const checkoutRef = collection(db, "users", userId, "checkout");
      const snapshot = await getDocs(checkoutRef);
      const courses = snapshot.docs.map((docSnap) => ({
        id: docSnap.data().courseId,
        ...docSnap.data(),
      }));
      setCheckoutCourses(courses);
      await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(courses));
    } catch (err) {
      console.error("Error syncing with Firestore:", err);
    }
  };

  // التحقق إذا الكورس موجود بالفعل
  const isInCheckout = (courseId) => {
    return checkoutCourses.some((course) => course.id === courseId);
  };

  // ✅ إضافة كورس جديد
  const addToCheckout = async (course) => {
    if (isInCheckout(course.id)) return false;

    setCheckoutCourses((prev) => [...prev, course]);

    try {
      if (userId) {
        await addDoc(collection(db, "users", userId, "checkout"), {
          courseId: course.id,
          title: course.title,
          price: course.price,
          imageUrl: course.imageUrl || "",
          instructor: course.instructor || "",
          category: course.category || "",
          description: course.description || "",
          dateAdded: new Date(),
        });
      }
    } catch (err) {
      console.error("Error adding course to Firestore:", err);
    }

    return true;
  };

  // ❌ إزالة كورس من الكارت
  const removeFromCheckout = async (courseId) => {
    setCheckoutCourses((prev) => prev.filter((c) => c.id !== courseId));

    try {
      if (userId) {
        const checkoutRef = collection(db, "users", userId, "checkout");
        const snapshot = await getDocs(checkoutRef);
        for (const docSnap of snapshot.docs) {
          if (docSnap.data().courseId === courseId) {
            await deleteDoc(doc(db, "users", userId, "checkout", docSnap.id));
          }
        }
      }
    } catch (err) {
      console.error("Error removing course from Firestore:", err);
    }
  };

  // taransfer checkout courses to myCourses
  const moveCheckoutToMyCourses = async () => {
    try {
      if (!userId) return;

      const userRef = collection(db, "users", userId, "myCourses");

      for (const course of checkoutCourses) {
        await addDoc(userRef, {
          courseId: course.id,
          title: course.title,
          price: course.price,
          imageUrl: course.imageUrl || "",
          instructor: course.instructor || "",
          category: course.category || "",
          description: course.description || "",
          dateEnrolled: new Date(),
          status: "enrolled",
        });
      }

      // بعد ما نضيفهم، نفرغ الـ checkout
      await clearCheckout();

    } catch (err) {
      console.error("Error moving checkout to myCourses:", err);
    }
  };

  // 🧹 مسح الكارت بالكامل
  const clearCheckout = async () => {
    setCheckoutCourses([]);
    try {
      if (userId) {
        const checkoutRef = collection(db, "users", userId, "checkout");
        const snapshot = await getDocs(checkoutRef);
        for (const docSnap of snapshot.docs) {
          await deleteDoc(doc(db, "users", userId, "checkout", docSnap.id));
        }
      }
      await AsyncStorage.removeItem(CART_STORAGE_KEY);
    } catch (err) {
      console.error("Error clearing checkout:", err);
    }
  };

  // 💰 حساب المجموع الكلي
  const getTotalPrice = () => {
    return checkoutCourses.reduce(
      (total, course) => total + (parseFloat(course.price) || 0),
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        checkoutCourses,
        isInCheckout,
        addToCheckout,
        removeFromCheckout,
        clearCheckout,
        getTotalPrice,
        moveCheckoutToMyCourses,
        checkoutCount: checkoutCourses.length,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);