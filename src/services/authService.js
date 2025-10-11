import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db } from './firebaseConfig.js';

// Sign up
export const register = async ({ fullName, email, password, role = 'student' }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userData = {
      name: fullName,
      email:email.toLowerCase(),
      role,
      joinedCourses: [],
      favorites: [],
      wishlist: [],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await setDoc(doc(db, 'users', user.uid), userData);
    return { success: true, user: { id: user.uid, ...userData } };
  } catch (error) {
    console.error('Registration Error:', error.message);
    return { success: false, error: error.message };
  }
};

// Login
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userDoc = await getDoc(doc(db, 'users', user.uid));
    const userData = userDoc.exists() ? userDoc.data() : {};

    return {
      success: true,
      user: {
        id: user.uid,
        ...userData,
        email: userData.email || user.email,
        role: userData.role || 'student',
      },
    };
  } catch (error) {
    console.error('Login Error:', error.message);
    return { success: false, error: error.message };
  }
};

// Logout
export const logout = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error('Logout Error:', error.message);
    return { success: false, error: error.message };
  }
};
