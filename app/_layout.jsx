'use client';
import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import Toast from "react-native-toast-message";
import { Provider as ReduxProvider } from "react-redux";
import { AuthProvider } from "../src/context/AuthContext";
import { CartProvider } from "../src/context/CartContext"; 
import { store } from "../src/redux/store";

export default function RootLayout() {
  return (
    <ReduxProvider store={store}>
      <PaperProvider>
        <AuthProvider>
          <CartProvider>
          
            <View style={styles.container}>
              <Stack screenOptions={{ headerShown: false }} style={styles.stack}>
                <Stack.Screen name="index" />
                <Stack.Screen name="onboarding" />
                <Stack.Screen name="auth" />
                <Stack.Screen name="student" />
                <Stack.Screen name="instructor" />
                <Stack.Screen name="admin" />
                <Stack.Screen
                  options={{
                    title: "AI Chat",
                    headerShown: true,
                    headerTitleStyle: { fontSize: 18, fontWeight: "bold" },
                  }}
                  name="aiChat"
                />
              </Stack>
              <Toast />
            </View>
          </CartProvider>
        </AuthProvider>
      </PaperProvider>
    </ReduxProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  stack: {
    flex: 1,
  },
});





