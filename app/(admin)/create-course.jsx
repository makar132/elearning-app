import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import CourseForm from "../../src/components/admin/CourseForm";
import { courseService } from "../../src/services/courseService";

export default function CreateCourseScreen() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCreate = async (course) => {
    setLoading(true);
    try {
      await courseService.createCourse(course);
      Alert.alert("Success", "Course created successfully!", [
        {
          text: "OK",
          onPress: () => router.push("/(admin)/courses"),
        },
      ]);
    } catch (error) {
      Alert.alert("Error", `Failed to create course: ${error.message}`);
    } finally {
      setLoading(false);
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
            Create New Course
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Fill in the course details below
          </Text>
        </View>
      </View>

      <CourseForm
        onSubmit={handleCreate}
        onCancel={handleCancel}
        loading={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
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
