import { Image, View } from "react-native";
import {
  Chip,
  DataTable,
  IconButton,
  Text
} from "react-native-paper";

import styles from "./CourseTableStyle";

const formatDate = (timestamp) => {
  if (!timestamp) return "N/A";
  const dateObj = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return dateObj.toLocaleDateString();
};
export default function CourseTableBody({
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
  return (
    <DataTable style={styles.table}>
      <DataTable.Header style={styles.tableHeader}>
        <DataTable.Title style={styles.imageCol} textStyle={styles.headerText}>
          Image
        </DataTable.Title>
        <DataTable.Title style={styles.titleCol} textStyle={styles.headerText}>
          Course
        </DataTable.Title>
        <DataTable.Title
          style={styles.categoryCol}
          textStyle={styles.headerText}
        >
          Category
        </DataTable.Title>
        <DataTable.Title style={styles.priceCol} textStyle={styles.headerText}>
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
        <DataTable.Title style={styles.dateCol} textStyle={styles.headerText}>
          Created
        </DataTable.Title>
        <DataTable.Title style={styles.actionCol} textStyle={styles.headerText}>
          Actions
        </DataTable.Title>
      </DataTable.Header>

      {courses.map((course) => (
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
            <Chip
              compact
              mode="flat"
              style={styles.categoryChip}
              textStyle={styles.categoryText}
            >
              {course.category}
            </Chip>
          </DataTable.Cell>

          <DataTable.Cell style={styles.priceCol}>
            <Text style={styles.priceText}>${course.price}</Text>
          </DataTable.Cell>

          <DataTable.Cell numeric style={styles.statCol}>
            <Text style={styles.statsText}>{course.enrollmentCount || 0}</Text>
          </DataTable.Cell>

          <DataTable.Cell numeric style={styles.statCol}>
            <Text style={styles.statsText}>{course.favoritesCount || 0}</Text>
          </DataTable.Cell>

          <DataTable.Cell style={styles.dateCol}>
            <Text style={styles.dateText}>{formatDate(course.createdAt)}</Text>
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

      {!loading && filteredCount === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No courses match your criteria.</Text>
        </View>
      )}
    </DataTable>
  );
}
