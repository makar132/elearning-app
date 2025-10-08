import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { Platform } from 'react-native';

const firebaseConfig = {
    apiKey: "AIzaSyDu6tbrbE60pN_x4ggYrBNFMGX_psmvi3c",
    authDomain: "e-learning-5e805.firebaseapp.com",
    projectId: "e-learning-5e805",
    storageBucket: "e-learning-5e805.firebasestorage.app",
    messagingSenderId: "797294355621",
    appId: "1:797294355621:web:eb551fe01a5d2acda7994c"
};

const app = initializeApp(firebaseConfig);

let auth;
if (Platform.OS === 'web') {
    const { getAuth } = require('firebase/auth');
    auth = getAuth(app);
} else {
    const { initializeAuth, getReactNativePersistence } = require('firebase/auth');
    auth = initializeAuth(app, {
        persistence: getReactNativePersistence(ReactNativeAsyncStorage)
    });
}

export { auth };
export const db = getFirestore(app);
