import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Snackbar } from "react-native-paper";
import CourseForm from "../../../src/components/admin/CourseForm";
import { courseService } from "../../../src/services/courseService";
import theme, { Colors } from "../../../src/styles/theme";

export default function EditCourseScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await courseService.getCourseById(id);
        setCourse(data);
      } catch (error) {
        setSnackbarMsg(`Failed to load course: ${error.message}`);
        setSnackbarVisible(true);
        router.back();
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchCourse();
  }, [id]);

  const handleUpdate = async (updated) => {
    setSaving(true);
    try {
      await courseService.updateCourse(id, updated);
      setSnackbarMsg("Course updated successfully");
      setSnackbarVisible(true);
      router.push("/admin/courses");
    } catch (error) {
      setSnackbarMsg(`Failed to update: ${error.message}`);
      setSnackbarVisible(true);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={theme.container}>
      <CourseForm
        initialValues={course}
        onSubmit={handleUpdate}
        onCancel={() => router.back()}
        loading={saving}
      />
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
      >
        {snackbarMsg}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});
