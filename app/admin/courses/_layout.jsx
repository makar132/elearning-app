import { Stack } from "expo-router/stack";
import theme, { Colors } from "../../../src/styles/theme";

export default function CoursesLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary },
        headerTintColor: "#fff",
        headerTitleStyle: theme.headerTitle,
      }}
    >
      <Stack.Screen name="index" options={{ title: "Courses" }} />
      <Stack.Screen name="create-course" options={{ title: "Create Course" }} />
      <Stack.Screen name="[id]" options={{ title: "Edit Course" }} />
    </Stack>
  );
}
