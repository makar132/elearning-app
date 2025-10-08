import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
    Alert,
    RefreshControl,
    ScrollView,
    StyleSheet,
    View,
} from "react-native";
import {
    ActivityIndicator,
    Button,
    Card,
    Chip,
    FAB,
    Text,
} from "react-native-paper";
import StatsCard from "../../src/components/admin/StatsCard";
import { adminService } from "../../src/services/adminService";

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

  const loadDashboardData = async (isRefresh = false) => {
    try {
      if (isRefresh) setRefreshing(true);
      else setLoading(true);
      const data = await adminService.getDashboardStats();
      setStats(data);
    } catch (error) {
      Alert.alert("Error", "Failed to load dashboard data: " + error.message);
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
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>Loading dashboard...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => loadDashboardData(true)}
          />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <Text variant="headlineMedium" style={styles.title}>
            Admin Dashboard
          </Text>
          <Text variant="bodyLarge" style={styles.subtitle}>
            Manage your e-learning platform
          </Text>
        </View>

        {/* Statistics Cards */}
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
              onPress={() => router.push("/(admin)/users")}
            />
            <StatsCard
              title="Total Courses"
              value={stats.totalCourses}
              subtitle="Available courses"
              icon="📚"
              color="#2196F3"
              onPress={() => router.push("/(admin)/courses")}
            />
          </View>
          <View style={styles.statsRow}>
            <StatsCard
              title="Enrollments"
              value={stats.totalEnrollments}
              subtitle="Total enrollments"
              icon="📊"
              color="#FF9800"
            />
            <StatsCard
              title="Popular"
              value={stats.popularCourses.length}
              subtitle="Top courses"
              icon="⭐"
              color="#9C27B0"
            />
          </View>
        </View>

        {/* Popular Courses */}
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
                      <Text variant="bodySmall" style={styles.instructorText}>
                        by {course.instructor}
                      </Text>
                    </View>
                    <Chip mode="outlined" compact style={styles.enrollmentChip}>
                      {course.enrollmentCount} enrolled
                    </Chip>
                  </View>
                ))}
              </Card.Content>
            </Card>
          </View>
        )}

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Quick Actions
          </Text>
          <View style={styles.actionsContainer}>
            <Button
              mode="contained"
              icon="account-plus"
              onPress={() => router.push("/(admin)/users")}
              style={styles.actionButton}
              contentStyle={styles.buttonContent}
            >
              Manage Users
            </Button>
            <Button
              mode="contained"
              icon="book-plus"
              onPress={() => router.push("/(admin)/create-course")}
              style={styles.actionButton}
              contentStyle={styles.buttonContent}
            >
              Create Course
            </Button>
            <Button
              mode="outlined"
              icon="chart-line"
              onPress={() => router.push("/(admin)/courses")}
              style={styles.actionButton}
              contentStyle={styles.buttonContent}
            >
              All Courses
            </Button>
          </View>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      <FAB
        icon="plus"
        label="New Course"
        onPress={() => router.push("/(admin)/create-course")}
        style={styles.fab}
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
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  title: {
    color: "#2196F3",
    marginBottom: 4,
    fontWeight: "600",
  },
  subtitle: {
    color: "#666666",
  },
  statsSection: {
    padding: 16,
  },
  sectionTitle: {
    marginBottom: 16,
    color: "#333333",
    fontWeight: "600",
  },
  statsRow: {
    flexDirection: "row",
    marginBottom: 12,
    gap: 8,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  popularItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  courseInfo: {
    flex: 1,
  },
  courseTitle: {
    color: "#333333",
    marginBottom: 2,
  },
  instructorText: {
    color: "#666666",
  },
  enrollmentChip: {
    backgroundColor: "#F9FAFB",
  },
  actionsContainer: {
    gap: 12,
  },
  actionButton: {
    marginVertical: 4,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  bottomSpacing: {
    height: 80,
  },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 16,
    backgroundColor: "#2196F3",
  },
});
