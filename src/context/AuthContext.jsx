import { signOut as firebaseSignOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../services/firebaseConfig";

export const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setIsLoading(true);

      if (firebaseUser) {
        try {
          const snapshot = await getDoc(doc(db, "users", firebaseUser.uid));
          if (snapshot.exists()) {
            const data = snapshot.data();
            const userData = {
              id: firebaseUser.uid,
              name: data.name || data.fullName || "",
              email: data.email || firebaseUser.email || "",
              role: data.role || "student",
              joinedCourses: data.joinedCourses || [],
              favorites: data.favorites || [],
              wishlist: data.wishlist || [],
            };
            setUser(userData);
            setRole(userData.role);
          } else {
            setUser(null);
            setRole(null);
          }
        } catch (err) {
          console.error("Error loading user profile:", err);
          setUser(null);
          setRole(null);
        }
      } else {
        setUser(null);
        setRole(null);
      }

      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const loginUser = (firebaseUser) => {
    // Called after register or login to set local state immediately
    console.log("Login user:", firebaseUser);
    const userData = {
      id: firebaseUser.uid,
      name: firebaseUser.displayName || "",
      email: firebaseUser.email || "",
      role: firebaseUser.role || "student",
      joinedCourses:firebaseUser.joinedCourses || [],
      favorites: firebaseUser.favorites || [],
      wishlist: firebaseUser.wishlist || [],
    };
    setUser(userData);
    setRole(userData.role);
  };

  const logout = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (e) {
      console.error("Logout error:", e);
    }
    setUser(null);
    setRole(null);
  };

  const completeOnboarding = () => setHasCompletedOnboarding(true);

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isLoading,
        hasCompletedOnboarding,
        completeOnboarding,
        loginUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
