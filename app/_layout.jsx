'use client';
import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import Toast from "react-native-toast-message";
import { Provider as ReduxProvider, useSelector } from "react-redux";
import { AuthProvider } from "../src/context/AuthContext";
import { CartProvider } from "../src/context/CartContext";
import { store } from "../src/redux/store";

function RootContent() {
  const theme = useSelector((state) => state.theme.theme);
  const backgroundColor = theme === "dark" ? "#121212" : "#F9FAFB";
  const textColor = theme === "dark" ? "#fff" : "#000";

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* غلاف يغطي كل حاجة */}
      <View style={[StyleSheet.absoluteFill, { backgroundColor, zIndex: -1 }]} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor }, // دي بتتحكم في كل الشاشات
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="auth" />
        <Stack.Screen name="student" />
        <Stack.Screen name="admin" />
        <Stack.Screen
          options={{
            title: "AI Chat",
            headerShown: true,
            headerTitleStyle: { fontSize: 18, fontWeight: "bold", color: textColor },
            headerStyle: { backgroundColor },
          }}
          name="aiChat"
        />
      </Stack>
      <Toast />
    </View>
  );
}

export default function RootLayout() {
  return (
    <ReduxProvider store={store}>
      <PaperProvider>
        <AuthProvider>
          <CartProvider>
            <RootContent />
          </CartProvider>
        </AuthProvider>
      </PaperProvider>
    </ReduxProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
