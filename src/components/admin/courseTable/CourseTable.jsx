import React from "react";
import { ScrollView, View } from "react-native";
import { Button, Card, Menu, Searchbar, Text } from "react-native-paper";
import CourseTableBody from "./CourseTableBody";
import styles from "./CourseTableStyle";

export default function CourseTable({
  courses,
  totalCount,
  filteredCount,
  onEditCourse,
  onDeleteCourse,
  searchQuery,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  categories = [],
  loading,
}) {
  const [menuVisible, setMenuVisible] = React.useState(false);


  return (
    <Card style={styles.card}>
      <Card.Content style={styles.cardContent}>
        <View style={styles.header}>
          <Text variant="titleLarge" style={styles.headerTitle}>
            Course Management
          </Text>
          <Text style={styles.subtitle}>
            {filteredCount ?? courses.length} of {totalCount ?? courses.length}{" "}
            courses
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
                textColor="#746AEB"
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

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <CourseTableBody
            courses={courses}
            totalCount={totalCount}
            filteredCount={filteredCount}
            onEditCourse={onEditCourse}
            onDeleteCourse={onDeleteCourse}
            searchQuery={searchQuery}
            onSearchChange={onSearchChange}
            categoryFilter={categoryFilter}
            onCategoryChange={onCategoryChange}
            categories={categories}
            loading={loading}
          />
        </ScrollView>
      </Card.Content>
    </Card>
  );
}

