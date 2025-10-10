import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../services/firebaseConfig.js";
import { login as loginService, register as registerService, logout as logoutService } from "../services/authService.js";

export const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // keep auth state in sync with Firebase (login / logout / session)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setIsLoading(true);

      if (firebaseUser) {
        try {
          const docRef = doc(db, "users", firebaseUser.uid);
          const snapshot = await getDoc(docRef);

          if (snapshot.exists()) {
            const data = snapshot.data();
            const userData = {
              id: firebaseUser.uid,
              name: data.name || "",
              email: data.email || firebaseUser.email,
              role: data.role || "student",
              joinedCourses: data.joinedCourses || [],
              favorites: data.favorites || [],
              wishlist: data.wishlist || [],
            };
            setUser(userData);
          } else {
            // if not user
            setUser({
              id: firebaseUser.uid,
              name: firebaseUser.displayName || "",
              email: firebaseUser.email || "",
              role: "student",
              joinedCourses: [],
              favorites: [],
              wishlist: [],
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }

      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  // wrappers that call the authService and update local state on success
  const login = async (email, password) => {
    const result = await loginService(email, password);
    if (result.success) setUser(result.user);
    return result;
  };

  const register = async (userData) => {
    const result = await registerService(userData);
    if (result.success) setUser(result.user);
    return result;
  };

  const logout = async () => {
    const result = await logoutService();
    if (result.success) setUser(null);
    return result;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
