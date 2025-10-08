import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { FAB } from "react-native-paper";
import CourseForm from "../../src/components/admin/CourseForm";
import { courseService } from "../../src/services/courseService";

export default function CreateCourseScreen() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCreate = async (course) => {
    setLoading(true);
    try {
      await courseService.createCourse(course);
      Alert.alert("Success", "Course created successfully");
      router.push("/(admin)/courses");
    } catch (error) {
      Alert.alert("Error", "Failed to create course: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <CourseForm
        onSubmit={handleCreate}
        onCancel={() => router.back()}
        loading={loading}
      />
      <FAB icon="close" style={styles.fab} onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  fab: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: "#f44336",
  },
});
