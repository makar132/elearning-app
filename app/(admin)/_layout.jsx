import { router } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { useEffect } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { useAuth } from "../../src/context/AuthContext";
import { checkAdminPermission } from "../../src/utils/permissions";

export default function AdminLayout() {
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !checkAdminPermission(user)) {
      router.replace("/login");
    }
  }, [user, isLoading]);

  // Show loading while checking auth
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // Redirect if not admin
  if (!checkAdminPermission(user)) {
    return null;
  }

  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        drawerActiveTintColor: "#2196F3",
        drawerInactiveTintColor: "#666",
        headerStyle: {
          backgroundColor: "#2196F3",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Drawer.Screen
        name="dashboard"
        options={{
          drawerLabel: "Dashboard",
          title: "Admin Dashboard",
          drawerIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>📊</Text>
          ),
        }}
      />
      <Drawer.Screen
        name="users"
        options={{
          drawerLabel: "Manage Users",
          title: "User Management",
          drawerIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>👥</Text>
          ),
        }}
      />
      <Drawer.Screen
        name="courses"
        options={{
          drawerLabel: "Manage Courses",
          title: "Course Management",
          drawerIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>📚</Text>
          ),
        }}
      />
      <Drawer.Screen
        name="create-course"
        options={{
          drawerLabel: "Create Course",
          title: "Create New Course",
          drawerIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>➕</Text>
          ),
        }}
      />
    </Drawer>
  );
}
