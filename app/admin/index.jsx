import { router } from "expo-router";
import { useEffect, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Card,
  Chip,
  Snackbar,
  Text,
} from "react-native-paper";
import StatsCard from "../../src/components/admin/StatsCard";
import { adminService } from "../../src/services/adminService";
import theme, { Colors } from "../../src/styles/theme";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStudents: 0,
    totalAdmins: 0,
    totalCourses: 0,
    totalEnrollments: 0,
    popularCourses: [],
    recentUsers: [],
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");

  const loadDashboardData = async (isRefresh = false) => {
    try {
      if (isRefresh) setRefreshing(true);
      else setLoading(true);

      const data = await adminService.getDashboardStats();
      setStats(data);
    } catch (error) {
      setSnackbarMsg(`Failed to load dashboard data: ${error.message}`);
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <View style={theme.container}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Loading dashboard...</Text>
      </View>
    );
  }

  return (
    <View style={theme.container}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => loadDashboardData(true)}
          />
        }
      >
        <View style={styles.header}>
          <Text variant="headlineMedium" style={styles.title}>
            Admin Dashboard
          </Text>
          <Text variant="bodyLarge" style={styles.subtitle}>
            Manage your e-learning platform
          </Text>
        </View>

        <View style={styles.statsSection}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Overview
          </Text>
          <View style={styles.statsRow}>
            <StatsCard
              title="Total Users"
              value={stats.totalUsers}
              subtitle={`${stats.totalStudents} students, ${stats.totalAdmins} admins`}
              icon="👥"
              color="#4CAF50"
              onPress={() => router.push("/admin/users")}
            />
            <StatsCard
              title="Total Courses"
              value={stats.totalCourses}
              subtitle="Available courses"
              icon="📚"
              color="#2196F3"
              onPress={() => router.push("/admin/courses")}
            />
          </View>
          <View style={styles.statsRow}>
            <StatsCard
              title="Total Enrollments"
              value={stats.totalEnrollments}
              subtitle="Course enrollments"
              icon="📊"
              color="#FF9800"
            />
            <StatsCard
              title="Popular Courses"
              value={stats.popularCourses.length}
              subtitle="Top performing"
              icon="⭐"
              color="#9C27B0"
            />
          </View>
        </View>

        {stats.popularCourses.length > 0 && (
          <View style={styles.section}>
            <Text variant="titleLarge" style={styles.sectionTitle}>
              Most Popular Courses
            </Text>
            <Card style={styles.card}>
              <Card.Content>
                {stats.popularCourses.slice(0, 3).map((course) => (
                  <View key={course.id} style={styles.popularItem}>
                    <View style={styles.courseInfo}>
                      <Text variant="titleMedium" style={styles.courseTitle}>
                        {course.title}
                      </Text>
                      <Text variant="bodySmall" style={styles.courseInstructor}>
                        by {course.instructor}
                      </Text>
                    </View>
                    <Chip mode="outlined" compact>
                      {course.enrollmentCount} enrolled
                    </Chip>
                  </View>
                ))}
              </Card.Content>
            </Card>
          </View>
        )}

        <View style={styles.section}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Quick Actions
          </Text>
          <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={{ flexGrow: 1 }}
                      style={styles.quickActions}
                    
          >
            <Button
              mode="contained"
              icon="account-plus"
              onPress={() => router.push("/admin/users")}
              style={styles.button}
            >
              Manage Users
            </Button>
            <Button
              mode="contained"
              icon="book-plus"
              onPress={() => router.push("/admin/courses/create-course")}
              style={styles.button}
            >
              Create Course
            </Button>
            <Button
              mode="contained"
              icon="chart-line"
              onPress={() => router.push("/admin/courses")}
              style={styles.button}
            >
              View All Courses
            </Button>
          </ScrollView>
        </View>
      </ScrollView>
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
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  loadingText: { marginTop: 16, color: "#666" },
  header: { padding: 20, backgroundColor: "#fff", marginBottom: 8 },
  title: { color: "#2196F3", marginBottom: 4 },
  subtitle: { color: "#666" },
  statsSection: { padding: 16 },
  sectionTitle: { marginBottom: 12, color: "#333" },
  statsRow: { flexDirection: "row", marginBottom: 8 },
  card: {
    marginHorizontal: 16,
    marginVertical: 4,
    backgroundColor: "#fff",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  popularItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    margin: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  courseInfo: { flex: 1 },
  courseTitle: { color: "#333" },
  courseInstructor: { color: "#666", marginTop: 2 },
  section: { marginBottom: 16, paddingHorizontal: 16 },
  actions: { flexDirection: "row", justifyContent: "space-around" },
  button: { marginVertical: 4 , marginHorizontal: 8},
  quickActions: { flexDirection: "row" },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 16,
    backgroundColor: "#2196F3",
  },
});
