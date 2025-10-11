import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import { ActivityIndicator, FAB, Snackbar, Text } from "react-native-paper";
import CourseTable from "../../../src/components/admin/CourseTable";
import ConfirmationModal from "../../../src/components/ConfirmationModal";
import Pagination from "../../../src/components/Pagination";
import { adminService } from "../../../src/services/adminService";
import theme, { Colors } from "../../../src/styles/theme";

const PAGE_SIZE = 10;

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

  const [currentPage, setCurrentPage] = useState(1);

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

  const onEditCourse = (course) => router.push(`/admin/courses/${course.id}`);
  const onDeleteCourse = (course) => setConfirm({ open: true, course });

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

  const categories = useMemo(
    () => [...new Set(courses.map((c) => c.category).filter(Boolean))],
    [courses]
  );

  const filtered = useMemo(() => {
    const q = (searchQuery ?? "").trim().toLowerCase();
    return courses.filter((course) => {
      const titleL = (course.titleLower ?? course.title ?? "")
        .toString()
        .toLowerCase();
      const categoryL = (course.categoryLower ?? course.category ?? "")
        .toString()
        .toLowerCase();
      const instructorL = (course.instructor ?? "").toString().toLowerCase();

      const matchesSearch =
        q.length === 0 ||
        titleL.includes(q) ||
        categoryL.includes(q) ||
        instructorL.includes(q);

      const matchesCategory =
        categoryFilter === "all" ||
        (course.categoryLower ?? course.category ?? "")
          .toString()
          .toLowerCase() === categoryFilter.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [courses, searchQuery, categoryFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentCourses = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, categoryFilter]);
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [totalPages, currentPage]);

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
              {filtered.length} of {courses.length} courses
            </Text>
          </View>

          <CourseTable
            courses={currentCourses}
            totalCount={courses.length}
            filteredCount={filtered.length}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            categoryFilter={categoryFilter}
            onCategoryChange={setCategoryFilter}
            categories={categories}
            loading={loading}
            onEditCourse={onEditCourse}
            onDeleteCourse={onDeleteCourse}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
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
