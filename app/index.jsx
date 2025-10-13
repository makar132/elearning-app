import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../src/context/AuthContext";
import {
  hydrateOnboarding,
  selectOnboardingCompleted,
  selectOnboardingHydrated,
} from "../src/redux/onboardingSlice";

export default function Index() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const dispatch = useDispatch();
  const hydrated = useSelector(selectOnboardingHydrated);
  const completed = useSelector(selectOnboardingCompleted);

  // useEffect(() => {
  //   if (isLoading) return;
  //   // Hydrate onboarding flag once
  //   dispatch(hydrateOnboarding());
  // }, []);

  useEffect(() => {
    dispatch(hydrateOnboarding());
  }, [dispatch]);

  useEffect(() => {
    if (isLoading || !hydrated) return;
    // Decide once we know onboarding state and auth
    if (!completed) return router.replace("/onboarding");
    if (!user) return router.replace("/auth");
    const roleRoutes = {
      admin: "/admin",
      student: "/student/my-courses",
      instructor: "/instructor",
    };
    router.replace(roleRoutes[user.role] || "/student/dashboard");
  }, [isLoading, hydrated, completed, user]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#6366F1" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
  },
});
