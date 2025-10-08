/* eslint-disable import/no-unresolved */
import { auth, db } from './firebaseConfig.js';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

// sign up
export const register = async ({ fullName, email, password, role }) => {
  try {
    // create user in firebase auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // store data in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      fullName,
      email,
      role,
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

    // Get user role from Firestore
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    const userData = userDoc.exists() ? userDoc.data() : null;
    const role = userData?.role || 'student'; // default to student if role not found

    return { success: true, user, role };
  } catch (error) {
    console.error('Login Error:', error.message);
    return { success: false, error: error.message };
  }
};
