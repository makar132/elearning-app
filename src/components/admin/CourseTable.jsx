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

  const fmtDate = (ts) =>
    ts?.toDate ? ts.toDate().toLocaleDateString() : "N/A";

  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.header}>
          <Text variant="titleLarge">Course Management</Text>
          <Text style={styles.subtitle}>
            {filtered.length} of {courses.length} courses
          </Text>
        </View>

        <Searchbar
          placeholder="Search title, instructor, category"
          onChangeText={onSearchChange}
          value={searchQuery}
          style={styles.searchbar}
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
            <DataTable.Header>
              <DataTable.Title style={styles.imageCol}>Image</DataTable.Title>
              <DataTable.Title style={styles.titleCol}>Course</DataTable.Title>
              <DataTable.Title style={styles.categoryCol}>Category</DataTable.Title>
              <DataTable.Title style={styles.priceCol}>Price</DataTable.Title>
              <DataTable.Title numeric style={styles.statCol}>Enroll</DataTable.Title>
              <DataTable.Title numeric style={styles.statCol}>Fav</DataTable.Title>
              <DataTable.Title style={styles.dateCol}>Created</DataTable.Title>
              <DataTable.Title style={styles.actionCol}>Actions</DataTable.Title>
            </DataTable.Header>

            {filtered.map((c) => (
              <DataTable.Row key={c.id} style={styles.row}>
                <DataTable.Cell style={styles.imageCol}>
                  {c.imageUrl ? (
                    <Image source={{ uri: c.imageUrl }} style={styles.image} />
                  ) : (
                    <View style={[styles.image, styles.placeholder]} />
                  )}
                </DataTable.Cell>
                <DataTable.Cell style={styles.titleCol}>
                  <Text variant="bodyMedium">{c.title}</Text>
                  <Text variant="bodySmall" style={styles.instructor}>
                    by {c.instructor}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell style={styles.categoryCol}>
                  <Chip compact mode="outlined">
                    {c.category}
                  </Chip>
                </DataTable.Cell>
                <DataTable.Cell style={styles.priceCol}>${c.price}</DataTable.Cell>
                <DataTable.Cell numeric style={styles.statCol}>
                  {c.enrollmentCount || 0}
                </DataTable.Cell>
                <DataTable.Cell numeric style={styles.statCol}>
                  {c.favoritesCount || 0}
                </DataTable.Cell>
                <DataTable.Cell style={styles.dateCol}>
                  {fmtDate(c.createdAt)}
                </DataTable.Cell>
                <DataTable.Cell style={styles.actionCol}>
                  <IconButton
                    icon="pencil"
                    size={18}
                    onPress={() => onEditCourse(c)}
                    iconColor="#2196F3"
                    disabled={loading}
                  />
                  <IconButton
                    icon="delete"
                    size={18}
                    onPress={() => onDeleteCourse(c)}
                    iconColor="#f44336"
                    disabled={loading}
                  />
                </DataTable.Cell>
              </DataTable.Row>
            ))}

            {filtered.length === 0 && (
              <View style={styles.empty}>
                <Text style={styles.emptyText}>No courses match criteria.</Text>
              </View>
            )}
          </DataTable>
        </ScrollView>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { margin: 16 },
  header: { marginBottom: 16 },
  subtitle: { color: "#666", marginTop: 4 },
  searchbar: { marginBottom: 12 },
  filterContainer: { flexDirection: "row", marginBottom: 16 },
  table: { minWidth: 900 },
  row: { borderBottomWidth: 1, borderBottomColor: "#eee", minHeight: 60 },
  imageCol: { flex: 0.5, minWidth: 60 },
  titleCol: { flex: 2, minWidth: 200 },
  categoryCol: { flex: 1, minWidth: 120 },
  priceCol: { flex: 0.5, minWidth: 80 },
  statCol: { flex: 0.5, minWidth: 80 },
  dateCol: { flex: 1, minWidth: 100 },
  actionCol: { flex: 1, minWidth: 100 },
  image: { width: 40, height: 30, borderRadius: 4, backgroundColor: "#ddd" },
  placeholder: { backgroundColor: "#eee" },
  instructor: { color: "#666", marginTop: 2 },
  empty: { padding: 40, alignItems: "center" },
  emptyText: { color: "#666", textAlign: "center" },
});
