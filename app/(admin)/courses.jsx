import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { ActivityIndicator, FAB, Snackbar, Text } from "react-native-paper";
import CourseTable from "../../src/components/admin/CourseTable";
import { adminService } from "../../src/services/adminService";

export default function CoursesScreen() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");

  const loadCourses = async (isRefresh = false) => {
    try {
      if (isRefresh) setRefreshing(true);
      else setLoading(true);

      const data = await adminService.getAllCoursesWithStats();
      setCourses(data);
    } catch (error) {
      Alert.alert("Error", `Failed to load courses: ${error.message}`);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const onRefresh = () => loadCourses(true);

  const onEditCourse = (course) => {
    router.push(`/(admin)/edit-course/${course.id}`);
  };

  const onDeleteCourse = (course) => {
    Alert.alert(
      "Confirm Delete",
      `Are you sure you want to delete "${course.title}"? This action cannot be undone.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              setLoading(true);
              await adminService.deleteCourse(course.id);
              setSnackbarMsg("Course deleted successfully");
              setSnackbarVisible(true);
              loadCourses();
            } catch (error) {
              Alert.alert("Error", `Failed to delete course: ${error.message}`);
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {loading && !refreshing ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#2196F3" />
          <Text style={styles.loadingText}>Loading courses...</Text>
        </View>
      ) : (
        <ScrollView
          style={styles.scroll}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {/* Header */}
          <View style={styles.header}>
            <Text variant="headlineMedium" style={styles.title}>
              Courses
            </Text>
            <Text variant="bodyMedium" style={styles.subtitle}>
              {courses.length} courses available
            </Text>
          </View>

          <CourseTable
            courses={courses}
            onEditCourse={onEditCourse}
            onDeleteCourse={onDeleteCourse}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            categoryFilter={categoryFilter}
            onCategoryChange={setCategoryFilter}
            loading={loading}
          />

          <View style={styles.bottomSpacing} />
        </ScrollView>
      )}

      <FAB
        icon="plus"
        label="New Course"
        onPress={() => router.push("/(admin)/create-course")}
        style={styles.fab}
      />

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        style={styles.snackbar}
      >
        {snackbarMsg}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scroll: {
    flex: 1,
  },
  centered: {
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
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  title: {
    color: "#2196F3",
    fontWeight: "600",
    marginBottom: 4,
  },
  subtitle: {
    color: "#666666",
  },
  bottomSpacing: {
    height: 80,
  },
  fab: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: "#2196F3",
  },
  snackbar: {
    backgroundColor: "#F44336",
  },
});
