import AsyncStorage from "@react-native-async-storage/async-storage";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../services/firebaseConfig";

export const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  // get user when open app
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setIsLoading(true);

      if (firebaseUser) {
        try {
          // Get user data from Firestore
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));

          if (userDoc.exists()) {
            const userData = userDoc.data();

            // Set user with the structure expected by admin layout
            setUser({
              id: firebaseUser.uid,
              name: userData.name || userData.fullName, // Handle both field names
              email: userData.email || firebaseUser.email,
              role: userData.role || "student", // Default to student
              // Include the arrays for your structure
              joinedCourses: userData.joinedCourses || [],
              favorites: userData.favorites || [],
              wishlist: userData.wishlist || [],
            });
          } else {
            // User document doesn't exist in Firestore
            console.log("User document not found in Firestore");
            setUser(null);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUser(null);
        }
      } else {
        // User is logged out
        setUser(null);
      }

      setIsLoading(false);
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);

  // store user
  const loginUser = async (firebaseUser) => {
    console.log("firebaseUser: ", firebaseUser);
    if (!firebaseUser) return;
    const userData = {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: firebaseUser.displayName || "",
      role: firebaseUser.role || "student",
      joinedCourses: [],
      favorites: [],
      wishlist: [],
      createdAt: new Date(),
    };
    setUser(userData);
    await AsyncStorage.setItem("@user", JSON.stringify(userData));
  };

  // logout
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      await AsyncStorage.removeItem("@user");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  // onboarding
  const completeOnboarding = () => setHasCompletedOnboarding(true);

  return (
    <AuthContext.Provider
      value={{
        user,
        loginUser,
        isLoading,
        hasCompletedOnboarding,
        completeOnboarding,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
