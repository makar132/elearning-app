import { Ionicons } from "@expo/vector-icons";
import { Image, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import defaultImg from "../../../assets/images/picture-loading-failed-1.png";
import styles from "../../utils/CourseCard.styles";
export default function CourseCard({
  course,
  onPressDetail,
  onPressEnroll,
  onPressFavorite,
}) {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Image
          source={course.imageUrl ? { uri: course.imageUrl } : defaultImg}
          style={styles.courseImage}
        />

        <View style={styles.courseDetails}>
          <Text style={styles.courseTitle} numberOfLines={2}>
            {course.title}
          </Text>
          <Text style={styles.instructor}>By {course.instructor}</Text>

          <View style={styles.iconRow}>
            <TouchableOpacity
              onPress={() => onPressDetail(course.id)}
              style={styles.iconButton}
            >
              <Ionicons
                name="information-circle-outline"
                size={24}
                color="#1E40AF"
              />
              <Text style={styles.iconLabel}>Details</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => onPressEnroll(course.id)}
              style={styles.iconButton}
            >
              <Ionicons name="book-outline" size={24} color="#1E40AF" />
              <Text style={styles.iconLabel}>Enroll</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => onPressFavorite(course.id)}
              style={styles.iconButton}
            >
              <Ionicons name="heart-outline" size={24} color="#EF4444" />
              <Text style={styles.iconLabel}>Favorite</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Ionicons name="book-outline" size={16} color="#6B7280" />
          <Text style={styles.statText}>
            {course.completedLessons}/{course.totalLessons} Lessons
          </Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="time-outline" size={16} color="#6B7280" />
          <Text style={styles.statText}>{course.duration}</Text>
        </View>
      </View>
    </View>
  );
}
