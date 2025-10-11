import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useAuth } from "../../src/context/AuthContext";

export default function InstructorLayout({ children }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.replace("/auth/login");
      } else if (user.role !== "instructor") {
        router.replace("/student/dashboard"); // Or wherever non-instructor should go
      }
    }
  }, [user, isLoading]);

  if (isLoading || !user) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#6366F1" />
      </View>
    );
  }

  // Render children directly; replace with tabs or navigation as needed
  return <>{children}</>;
}
