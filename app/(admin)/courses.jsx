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
      `Delete "${course.title}"? This cannot be undone.`,
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
          <ActivityIndicator size="large" />
          <Text>Loading courses...</Text>
        </View>
      ) : (
        <ScrollView
          style={styles.scroll}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={styles.header}>
            <Text variant="headlineLarge">Courses</Text>
            <Text variant="bodyMedium">{courses.length} courses available</Text>
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
      >
        {snackbarMsg}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scroll: { flex: 1 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: { padding: 16, borderBottomWidth: 1, borderBottomColor: "#ddd" },
  fab: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: "#2196F3",
  },
});
