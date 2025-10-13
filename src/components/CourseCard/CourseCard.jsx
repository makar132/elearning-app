import { Ionicons } from "@expo/vector-icons";
import { View, Text, Image, TouchableOpacity } from "react-native";
import defaultImg from "../../../assets/images/picture-loading-failed-1.png";
import styles from "../../utils/CourseCard.styles";
import FavoriteButton from "./FavButton";
export default function CourseCard({ course, onPressDetail, onPressEnroll, onPressFavorite }) {
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
            <TouchableOpacity onPress={() => onPressDetail(course.id)} style={styles.iconButton}>
              <Ionicons name="information-circle-outline" size={24} color="#1E40AF" />
              <Text style={styles.iconLabel}>Details</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => onPressEnroll(course.id)} style={styles.iconButton}>
              <Ionicons name="book-outline" size={24} color="#1E40AF" />
              <Text style={styles.iconLabel}>Enroll</Text>
            </TouchableOpacity>

            {/* Favorite */}
            <View style={styles.iconButton}>
              <FavoriteButton course={course} />
              <Text style={styles.iconLabel}>Favorite</Text>
            </View>
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
