import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebaseConfig.js';

// sign up
export const register = async ({ fullName, email, password, role = 'student' }) => {
  try {
    // create user in firebase auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // store data in Firestore with your array structure
    await setDoc(doc(db, 'users', user.uid), {
      name: fullName, // Use 'name' to match your updated structure
      email,
      role,
      joinedCourses: [], // Initialize empty arrays
      favorites: [],
      wishlist: [],
      createdAt: new Date()
    });

    return { success: true, user };
  } catch (error) {
    console.error('Registration Error:', error.message);
    return { success: false, error: error.message };
  }
};

// login
export const login = async (email, password) => {
  try {
    // Sign in with Firebase Auth
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Get user data from Firestore
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    const userData = userDoc.exists() ? userDoc.data() : null;

    return {
      success: true,
      user: {
        id: user.uid,
        name: userData?.name || userData?.fullName,
        email: userData?.email || user.email,
        role: userData?.role || 'student',
        joinedCourses: userData?.joinedCourses || [],
        favorites: userData?.favorites || [],
        wishlist: userData?.wishlist || []
      }
    };
  } catch (error) {
    console.error('Login Error:', error.message);
    return { success: false, error: error.message };
  }
};

// logout
export const logout = async () => {
  try {
    await auth.signOut();
    return { success: true };
  } catch (error) {
    console.error('Logout Error:', error.message);
    return { success: false, error: error.message };
  }
};
