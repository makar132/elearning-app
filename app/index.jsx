import { router } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { useAuth } from "../src/context/AuthContext";
import { checkAdminPermission } from "../src/utils/permissions";

export default function RootIndex() {
  const { user, isLoading } = useAuth();
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    // Don't navigate while auth is loading
    if (isLoading || isNavigating) return;

    const handleNavigation = () => {
      setIsNavigating(true);

      try {
        if (!user) {
          // No user logged in - go to onboarding/login flow
          router.replace("/onboarding");
        } else {
          // User is logged in - route based on role
          if (checkAdminPermission(user)) {
            // Admin user - go to admin dashboard
            router.replace("/(admin)/dashboard");
          } else {
            // Regular user - go to student app
            router.replace("/(student)");
          }
        }
      } catch (error) {
        console.error("Navigation error:", error);
        // Fallback navigation
        router.replace("/onboarding");
      }
    };

    // Small delay to ensure smooth transition
    const timer = setTimeout(handleNavigation, 100);
    return () => clearTimeout(timer);
  }, [user, isLoading, isNavigating]);

  // Show loading screen while determining route
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* App Logo/Icon */}
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>📚</Text>
          <Text variant="headlineLarge" style={styles.appName}>
            ELearning
          </Text>
          <Text variant="bodyMedium" style={styles.tagline}>
            Learn. Grow. Succeed.
          </Text>
        </View>

        {/* Loading Indicator */}
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2196F3" />
          <Text style={styles.loadingText}>
            {isLoading
              ? "Checking authentication..."
              : "Preparing your experience..."}
          </Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text variant="bodySmall" style={styles.footerText}>
          Welcome to ELearning Platform
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 60,
  },
  logo: {
    fontSize: 80,
    marginBottom: 16,
  },
  appName: {
    color: "#2196F3",
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
  },
  tagline: {
    color: "#666666",
    textAlign: "center",
    fontStyle: "italic",
  },
  loadingContainer: {
    alignItems: "center",
    gap: 16,
  },
  loadingText: {
    color: "#666666",
    textAlign: "center",
    fontSize: 16,
  },
  footer: {
    paddingBottom: 40,
    paddingHorizontal: 32,
  },
  footerText: {
    color: "#999999",
    textAlign: "center",
  },
});
