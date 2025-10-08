import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { ActivityIndicator, IconButton, Text } from "react-native-paper";
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
        setLoading(true);
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

  const handleUpdate = async (updatedCourse) => {
    setSaving(true);
    try {
      await courseService.updateCourse(id, updatedCourse);
      Alert.alert("Success", "Course updated successfully!", [
        {
          text: "OK",
          onPress: () => router.push("/(admin)/courses"),
        },
      ]);
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    Alert.alert(
      "Discard Changes",
      "Are you sure you want to discard your changes?",
      [
        { text: "Continue Editing", style: "cancel" },
        {
          text: "Discard",
          style: "destructive",
          onPress: () => router.back(),
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>Loading course...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          size={24}
          onPress={handleCancel}
          iconColor="#333333"
          style={styles.backButton}
        />
        <View style={styles.headerText}>
          <Text variant="headlineSmall" style={styles.title}>
            Edit Course
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            {course?.title}
          </Text>
        </View>
      </View>

      <CourseForm
        initialValues={course}
        onSubmit={handleUpdate}
        onCancel={handleCancel}
        loading={saving}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  loadingText: {
    marginTop: 16,
    color: "#666666",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  backButton: {
    margin: 0,
    marginRight: 8,
  },
  headerText: {
    flex: 1,
  },
  title: {
    color: "#333333",
    fontWeight: "600",
    marginBottom: 2,
  },
  subtitle: {
    color: "#666666",
  },
});
