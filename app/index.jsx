import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useAuth } from "../src/context/AuthContext";

export default function Index() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    async function decideRoute() {
      try {
        const hasCompletedOnboarding = await AsyncStorage.getItem(
          "hasCompletedOnboarding"
        );

        if (hasCompletedOnboarding !== "true") {
          router.replace("/onboarding");
        } else if (!user) {
          router.replace("/auth/login");
        } else {
          const roleRoutes = {
            admin: "/admin",
            student: "/student/dashboard",
            instructor: "/instructor",
          };
          router.replace(roleRoutes[user.role] || "/student/dashboard");
        }
      } catch (error) {
        console.error("Navigation redirect error:", error);
        // Fallback redirect to onboarding
        router.replace("/onboarding");
      }
    }

    decideRoute();
  }, [user, isLoading]);

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
