import { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  // get user when open app
  useEffect(() => {
    const loadUser = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@user');
        if (jsonValue) {
          setUser(JSON.parse(jsonValue));
          setIsLoading(false);
          return;
        }

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          if (currentUser) {
            const userData = {
              uid: currentUser.uid,
              email: currentUser.email,
              displayName: currentUser.displayName || ''
            };
            setUser(userData);
            AsyncStorage.setItem('@user', JSON.stringify(userData));
          } else {
            setUser(null);
            AsyncStorage.removeItem('@user');
          }
          setIsLoading(false);
        });

        return unsubscribe;
      } catch (error) {
        console.error('Failed to load user', error);
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  // store user
  const loginUser = async (firebaseUser) => {
    if (!firebaseUser) return;
    const userData = {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: firebaseUser.displayName || ''
    };
    setUser(userData);
    await AsyncStorage.setItem('@user', JSON.stringify(userData));
  };

  // logout
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      await AsyncStorage.removeItem('@user');
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  // onboarding
  const completeOnboarding = () => setHasCompletedOnboarding(true);

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      return { success: true };
    } catch (error) {
      console.error("Logout error:", error);
      return { success: false, error: error.message };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        hasCompletedOnboarding,
        completeOnboarding,
        loginUser,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
