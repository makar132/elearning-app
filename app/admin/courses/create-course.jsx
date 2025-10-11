import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { FAB, Snackbar } from "react-native-paper";
import CourseForm from "../../../src/components/admin/CourseForm";
import { courseService } from "../../../src/services/courseService";
import theme, { Colors } from "../../../src/styles/theme";

export default function CreateCourseScreen() {
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const router = useRouter();

  const handleCreate = async (course) => {
    setLoading(true);
    try {
      await courseService.createCourse(course);
      setSnackbarMsg("Course created successfully");
      setSnackbarVisible(true);
      router.push("/admin/courses");
    } catch (error) {
      setSnackbarMsg(`Failed to create course: ${error.message}`);
      setSnackbarVisible(true);
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
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
      >
        {snackbarMsg}
      </Snackbar>
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
