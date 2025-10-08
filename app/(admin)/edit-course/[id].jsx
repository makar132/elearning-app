import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import CourseForm from "../../../src/components/admin/CourseForm";
import { courseService } from "../../../src/services/courseService";

export default function EditCourseScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await courseService.getCourseById(id);
        setCourse(data);
      } catch (error) {
        Alert.alert("Error", "Failed to load course: " + error.message, [
          { text: "OK", onPress: () => router.back() },
        ]);
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
      Alert.alert("Success", "Course updated successfully");
      router.push("/(admin)/courses");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CourseForm
        initialValues={course}
        onSubmit={handleUpdate}
        onCancel={() => router.back()}
        loading={saving}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});
