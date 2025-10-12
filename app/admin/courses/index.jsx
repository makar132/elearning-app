import { router } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";
import { ActivityIndicator, FAB, Snackbar, Text } from "react-native-paper";
import CourseTable from "../../../src/components/admin/courseTable/CourseTable";
import ConfirmationModal from "../../../src/components/ConfirmationModal";
import Pagination from "../../../src/components/Pagination";
import { useCourses } from "../../../src/hooks/useCoursesPage";
import theme, { Colors } from "../../../src/styles/theme";

export default function CoursesScreen() {
  const {
    courses,
    loading,
    refreshing,
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    snackbarVisible,
    setSnackbarVisible,
    snackbarMsg,
    confirm,
    setConfirm,
    deleting,
    currentPage,
    setCurrentPage,
    onRefresh,
    onEditCourse,
    onDeleteCourse,
    confirmDelete,
    categories,
    filtered,
    totalPages,
    currentCourses,
  } = useCourses(); // Use the custom hook

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
          {/* <View style={styles.header}>
            <Text variant="headlineLarge" style={styles.title}>
              Courses
            </Text>
            <Text variant="bodyMedium" style={styles.subtitle}>
              {filtered.length} of {courses.length} courses
            </Text>
          </View> */}

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
  fab: { position: "absolute", bottom: 16, right: 16 },
});
