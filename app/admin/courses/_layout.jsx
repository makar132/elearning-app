import { Stack } from "expo-router/stack";

export default function CoursesLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" options={{ title: "Courses" }} />
      <Stack.Screen name="create-course" options={{ title: "Create Course" }} />
      <Stack.Screen name="[id]" options={{ title: "Edit Course" }} />
    </Stack>
  );
}
