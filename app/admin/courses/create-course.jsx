import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { FAB } from "react-native-paper";
import CourseForm from "../../../src/components/admin/CourseForm";
import { courseService } from "../../../src/services/courseService";
import theme, { Colors } from "../../../src/styles/theme";

export default function CreateCourseScreen() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCreate = async (course) => {
    setLoading(true);
    try {
      await courseService.createCourse(course);
      Alert.alert("Success", "Course created successfully");
      router.push("/admin/courses");
    } catch (error) {
      Alert.alert("Error", "Failed to create course: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={theme.container}>
      <CourseForm
        onSubmit={handleCreate}
        onCancel={() => router.back()}
        loading={loading}
      />
      <FAB
        icon="close"
        style={[styles.fab, { backgroundColor: Colors.secondary }]}
        onPress={() => router.back()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  fab: {
    position: "absolute",
    bottom: 16,
    right: 16,
  },
});
