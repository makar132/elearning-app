import { router } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";

export default function AdminIndex() {
  useEffect(() => {
    // Auto-redirect to dashboard when accessing /admin
    router.replace("/(admin)/dashboard");
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#2196F3" />
      <Text>Loading Admin Dashboard...</Text>
    </View>
  );
}
