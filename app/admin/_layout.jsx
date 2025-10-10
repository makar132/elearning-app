import { useRouter } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { useAuth } from "../../src/context/AuthContext";
import theme, { Colors, Typography } from "../../src/styles/theme";

export default function AdminLayout() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) router.replace("auth/login");
      else if (user.role !== "admin") router.replace("student/dashboard");
    }
  }, [user, isLoading]);

  if (isLoading) {
    return (
      <View style={theme.container}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={{ marginTop: 8, ...Typography.body }}>Loading...</Text>
      </View>
    );
  }
  if (!user || user.role !== "admin") return null;

  return (
    <Drawer
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary },
        headerTintColor: "#fff",
        headerTitleStyle: theme.headerTitle,
        drawerActiveTintColor: Colors.primary,
        drawerInactiveTintColor: Colors.textSecondary,
        drawerActiveBackgroundColor: "#E3F2FD",
        drawerItemStyle: theme.drawerItemStyle,
        drawerLabelStyle: theme.drawerLabelStyle,
        headerRight: () => (
          <Button
            mode="text"
            onPress={async () => {
              await logout();
              router.replace("auth/login");
            }}
            labelStyle={{ color: "#fff", ...Typography.body }}
            style={{ marginRight: 16 }}
          >
            Logout
          </Button>
        ),
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: "Dashboard",
          title: "Admin Dashboard",
        }}
      />
      <Drawer.Screen
        name="users"
        options={{
          drawerLabel: "Users",
          title: "Manage Users",
        }}
      />
      <Drawer.Screen
        name="courses"
        options={{
          drawerLabel: "Courses",
          title: "Manage Courses",
        }}
      />
    </Drawer>
  );
}
