import { router } from "expo-router";
import { useEffect, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import { ActivityIndicator, FAB, Snackbar, Text } from "react-native-paper";
import CourseTable from "../../../src/components/admin/CourseTable";
import ConfirmationModal from "../../../src/components/ConfirmationModal";
import { adminService } from "../../../src/services/adminService";
import theme, { Colors } from "../../../src/styles/theme";

export default function CoursesScreen() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [confirm, setConfirm] = useState({ open: false, course: null });
  const [deleting, setDeleting] = useState(false);

  const loadCourses = async (isRefresh = false) => {
    try {
      if (isRefresh) setRefreshing(true);
      else setLoading(true);

      const data = await adminService.getAllCoursesWithStats();
      setCourses(data);
    } catch (error) {
      setSnackbarMsg(`Failed to load courses: ${error.message}`);
      setSnackbarVisible(true);
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
    router.push(`/admin/courses/${course.id}`);
  };

  const onDeleteCourse = (course) => {
    setConfirm({ open: true, course });
  };

  const confirmDelete = async () => {
    if (!confirm.course) return;
    try {
      setDeleting(true);
      await adminService.deleteCourse(confirm.course.id);
      setSnackbarMsg("Course deleted successfully");
      setSnackbarVisible(true);
      await loadCourses();
    } catch (error) {
      setSnackbarMsg(`Failed to delete course: ${error.message}`);
      setSnackbarVisible(true);
    } finally {
      setDeleting(false);
      setConfirm({ open: false, course: null });
    }
  };

  return (
    <View style={theme.container}>
      {loading && !refreshing ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={Colors.primary} />
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
            <Text variant="headlineLarge" style={styles.title}>
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
        </ScrollView>
      )}

      <FAB
        icon="plus"
        label="New Course"
        onPress={() => router.push("/admin/courses/create-course")}
        style={[styles.fab, { backgroundColor: Colors.primary }]}
      />

      <ConfirmationModal
        visible={confirm.open}
        title="Delete course?"
        message={
          confirm.course
            ? `Delete "${confirm.course.title}"? This cannot be undone.`
            : "This action cannot be undone."
        }
        confirmText="Delete"
        cancelText="Cancel"
        loading={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setConfirm({ open: false, course: null })}
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
  title: { color: "#1E3A8A", marginBottom: 4 },
  subtitle: { color: "#666" },
  fab: {
    position: "absolute",
    bottom: 16,
    right: 16,
  },
});
