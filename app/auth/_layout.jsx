import { Stack, usePathname, useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useAuth } from "../../src/context/AuthContext";

export default function AuthLayout() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Only redirect AWAY from login/register when already authenticated; allow /auth
    if (!isLoading && user) {
      // If already authenticated and not on /auth, /auth/login, /auth/register, redirect to role home
      console.log("pathname: ", pathname);
      if (pathname.endsWith("/login") || pathname.endsWith("/register")) {
        const roleToPath = {
          admin: "/admin",
          student: "/student/dashboard",
          instructor: "/instructor",
        };
        router.replace(roleToPath[user.role] || "/student/dashboard");
      }
    }
  }, [user, isLoading]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6366F1" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }} style={styles.stack}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
    </Stack>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
  },
  stack: {
    flex: 1,
  },
});
