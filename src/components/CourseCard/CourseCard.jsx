import { Ionicons } from "@expo/vector-icons";
import { View, Text, Image, TouchableOpacity } from "react-native";
import defaultImg from "../../../assets/images/picture-loading-failed-1.png";
import styles from "../../utils/CourseCard.styles";
import FavoriteButton from "../../components/CourseCard/FavButton";
import CheckoutButton from "../../components/CourseCard/CheckoutButton";

export default function CourseCard({ course, onPressDetail, onPressEnroll, onPressFavorite, onPressCheckout }) {
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
            {/* Details */}
            <TouchableOpacity onPress={() => onPressDetail(course.id)} style={styles.iconButton}>
              <Ionicons name="information-circle-outline" size={24} color="#1E40AF" />
              <Text style={styles.iconLabel}>Details</Text>
            </TouchableOpacity>



            {/* Checkout */}
            <View style={styles.iconButton}>
              <CheckoutButton course={course} />
              <Text style={styles.iconLabel}>Checkout</Text>
            </View>

            {/* Favorite */}
            <View style={styles.iconButton}>
              <FavoriteButton course={course} />
              <Text style={styles.iconLabel}>Favorite</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}