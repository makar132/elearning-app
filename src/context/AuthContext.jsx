import { createContext, useContext, useEffect, useState } from 'react';
export const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: load auth state & onboarding flag
    setUser("test");
    setIsLoading(false);
  }, []);

  const completeOnboarding = () => setHasCompletedOnboarding(true);

  return (
    <AuthContext.Provider value={{ user, isLoading, hasCompletedOnboarding, completeOnboarding }}>
      {children}
    </AuthContext.Provider>
  );
}
