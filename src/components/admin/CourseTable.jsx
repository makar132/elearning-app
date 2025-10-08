import React from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import {
  Button,
  Card,
  Chip,
  DataTable,
  IconButton,
  Menu,
  Searchbar,
  Text,
} from "react-native-paper";

export default function CourseTable({
  courses,
  onEditCourse,
  onDeleteCourse,
  searchQuery,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  loading,
}) {
  const [menuVisible, setMenuVisible] = React.useState(false);
  const categories = [...new Set(courses.map((c) => c.category))];

  const filtered = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || course.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    const dateObj = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return dateObj.toLocaleDateString();
  };

  return (
    <Card style={styles.card}>
      <Card.Content style={styles.cardContent}>
        <View style={styles.header}>
          <Text variant="titleLarge" style={styles.headerTitle}>
            Course Management
          </Text>
          <Text style={styles.subtitle}>
            {filtered.length} of {courses.length} courses
          </Text>
        </View>

        <Searchbar
          placeholder="Search by title, instructor, or category"
          onChangeText={onSearchChange}
          value={searchQuery}
          style={styles.searchbar}
          inputStyle={styles.searchInput}
          editable={!loading}
        />

        <View style={styles.filterContainer}>
          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <Button
                mode="outlined"
                onPress={() => setMenuVisible(true)}
                compact
                icon="filter"
                disabled={loading}
                style={styles.filterButton}
              >
                {categoryFilter === "all" ? "All Categories" : categoryFilter}
              </Button>
            }
          >
            <Menu.Item
              title="All Categories"
              onPress={() => {
                onCategoryChange("all");
                setMenuVisible(false);
              }}
            />
            {categories.map((cat) => (
              <Menu.Item
                key={cat}
                title={cat}
                onPress={() => {
                  onCategoryChange(cat);
                  setMenuVisible(false);
                }}
              />
            ))}
          </Menu>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <DataTable style={styles.table}>
            <DataTable.Header style={styles.tableHeader}>
              <DataTable.Title
                style={styles.imageCol}
                textStyle={styles.headerText}
              >
                Image
              </DataTable.Title>
              <DataTable.Title
                style={styles.titleCol}
                textStyle={styles.headerText}
              >
                Course
              </DataTable.Title>
              <DataTable.Title
                style={styles.categoryCol}
                textStyle={styles.headerText}
              >
                Category
              </DataTable.Title>
              <DataTable.Title
                style={styles.priceCol}
                textStyle={styles.headerText}
              >
                Price
              </DataTable.Title>
              <DataTable.Title
                numeric
                style={styles.statCol}
                textStyle={styles.headerText}
              >
                Enrolled
              </DataTable.Title>
              <DataTable.Title
                numeric
                style={styles.statCol}
                textStyle={styles.headerText}
              >
                Favorites
              </DataTable.Title>
              <DataTable.Title
                style={styles.dateCol}
                textStyle={styles.headerText}
              >
                Created
              </DataTable.Title>
              <DataTable.Title
                style={styles.actionCol}
                textStyle={styles.headerText}
              >
                Actions
              </DataTable.Title>
            </DataTable.Header>

            {filtered.map((course) => (
              <DataTable.Row key={course.id} style={styles.row}>
                <DataTable.Cell style={styles.imageCol}>
                  {course.imageUrl ? (
                    <Image
                      source={{ uri: course.imageUrl }}
                      style={styles.courseImage}
                      resizeMode="cover"
                    />
                  ) : (
                    <View style={[styles.courseImage, styles.imagePlaceholder]}>
                      <Text style={styles.placeholderText}>📚</Text>
                    </View>
                  )}
                </DataTable.Cell>
                <DataTable.Cell style={styles.titleCol}>
                  <View>
                    <Text variant="bodyMedium" style={styles.courseTitle}>
                      {course.title}
                    </Text>
                    <Text variant="bodySmall" style={styles.instructorText}>
                      by {course.instructor}
                    </Text>
                  </View>
                </DataTable.Cell>
                <DataTable.Cell style={styles.categoryCol}>
                  <Chip compact mode="outlined" style={styles.categoryChip}>
                    {course.category}
                  </Chip>
                </DataTable.Cell>
                <DataTable.Cell style={styles.priceCol}>
                  <Text style={styles.priceText}>${course.price}</Text>
                </DataTable.Cell>
                <DataTable.Cell numeric style={styles.statCol}>
                  <Text style={styles.statsText}>
                    {course.enrollmentCount || 0}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell numeric style={styles.statCol}>
                  <Text style={styles.statsText}>
                    {course.favoritesCount || 0}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell style={styles.dateCol}>
                  <Text style={styles.dateText}>
                    {formatDate(course.createdAt)}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell style={styles.actionCol}>
                  <View style={styles.actionButtons}>
                    <IconButton
                      icon="pencil"
                      size={18}
                      onPress={() => onEditCourse(course)}
                      iconColor="#2196F3"
                      disabled={loading}
                      style={styles.actionButton}
                    />
                    <IconButton
                      icon="delete"
                      size={18}
                      onPress={() => onDeleteCourse(course)}
                      iconColor="#F44336"
                      disabled={loading}
                      style={styles.actionButton}
                    />
                  </View>
                </DataTable.Cell>
              </DataTable.Row>
            ))}

            {filtered.length === 0 && (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>
                  No courses match your criteria.
                </Text>
              </View>
            )}
          </DataTable>
        </ScrollView>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 16,
    backgroundColor: "#FFFFFF",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardContent: {
    padding: 0,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  headerTitle: {
    color: "#333333",
    fontWeight: "600",
  },
  subtitle: {
    color: "#666666",
    marginTop: 4,
  },
  searchbar: {
    margin: 16,
    backgroundColor: "#F9FAFB",
    elevation: 0,
  },
  searchInput: {
    color: "#333333",
  },
  filterContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  filterButton: {
    borderColor: "#E0E0E0",
  },
  table: {
    minWidth: 900,
    backgroundColor: "#FFFFFF",
  },
  tableHeader: {
    backgroundColor: "#F9FAFB",
  },
  headerText: {
    color: "#333333",
    fontWeight: "600",
  },
  row: {
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    minHeight: 64,
    paddingVertical: 8,
  },
  imageCol: { flex: 0.5, minWidth: 60 },
  titleCol: { flex: 2, minWidth: 200 },
  categoryCol: { flex: 1, minWidth: 120 },
  priceCol: { flex: 0.5, minWidth: 80 },
  statCol: { flex: 0.5, minWidth: 80 },
  dateCol: { flex: 1, minWidth: 100 },
  actionCol: { flex: 1, minWidth: 100 },
  courseImage: {
    width: 50,
    height: 35,
    borderRadius: 6,
    backgroundColor: "#F9FAFB",
  },
  imagePlaceholder: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
  },
  placeholderText: {
    fontSize: 16,
  },
  courseTitle: {
    color: "#333333",
    fontWeight: "500",
    marginBottom: 2,
  },
  instructorText: {
    color: "#666666",
  },
  categoryChip: {
    backgroundColor: "#F9FAFB",
    borderColor: "#E0E0E0",
  },
  priceText: {
    color: "#333333",
    fontWeight: "600",
  },
  statsText: {
    color: "#333333",
  },
  dateText: {
    color: "#666666",
    fontSize: 12,
  },
  actionButtons: {
    flexDirection: "row",
  },
  actionButton: {
    margin: 0,
  },
  emptyState: {
    padding: 40,
    alignItems: "center",
  },
  emptyText: {
    color: "#666666",
    textAlign: "center",
  },
});
