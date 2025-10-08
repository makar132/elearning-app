import { router } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { useAuth } from "../../src/context/AuthContext";
import { checkAdminPermission } from "../../src/utils/permissions";

export default function AdminLayout() {
  const { user, isLoading } = useAuth();

  console.log("AdminLayout user:", user);
  console.log("checkAdminPermission:", checkAdminPermission(user));
  useEffect(() => {
    if (!isLoading && !checkAdminPermission(user)) {
      router.replace("/login");
    }
  }, [user, isLoading]);

  // Show loading while checking auth
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  // Redirect if not admin
  if (!checkAdminPermission(user)) {
    return null;
  }

  return (
    <Drawer
      initialRouteName="dashboard"
      screenOptions={{
        headerShown: true,
        drawerActiveTintColor: "#2196F3",
        drawerInactiveTintColor: "#666666",
        drawerActiveBackgroundColor: "#E3F2FD",
        drawerInactiveBackgroundColor: "transparent",
        headerStyle: {
          backgroundColor: "#2196F3",
          elevation: 4,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
        },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: {
          fontWeight: "600",
          fontSize: 18,
        },
        drawerStyle: {
          backgroundColor: "#FFFFFF",
          width: 280,
        },
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: "500",
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

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  loadingText: {
    marginTop: 16,
    color: "#666666",
  },
});
