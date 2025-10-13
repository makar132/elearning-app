import { router, Stack } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import BottomNav from "../../src/components/BottomNavigation/BottomNavigation";
import { logout } from "../../src/services/authService";
import { FavoritesProvider } from "../../src/context/FavoritesContext";

export default function StudentLayout({ children }) {

  return (

    <FavoritesProvider>
      <View style={styles.container}>
        <Stack
          screenOptions={{
            headerRight: () => (
              <Button
                mode="text"
                onPress={async () => {
                  await logout();
                  router.replace('/auth');
                }}

                style={{ marginRight: 10, padding: 10 }}
                labelStyle={{ color: '#d9534f' }}
              >
                Logout
              </Button>
            )
          }}
        >
          <Stack.Screen name="my-courses" />
          <Stack.Screen name="dashboard" />
          <Stack.Screen name="favorites" />
          <Stack.Screen name="course-details" />
        </Stack>

        <BottomNav />
      </View>
    </FavoritesProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },
});