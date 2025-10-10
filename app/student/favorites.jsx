import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Image, SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native';
import { Card, IconButton, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../src/utils/favoritesStyles';

export default function Favorites() {
  const favoriteCourses = useSelector((state) => state.favorites.favoriteCourses);
  const dispatch = useDispatch();

  const handleRemoveFavorite = (courseId) => {
    dispatch({ type: 'favorites/removeFavorite', payload: courseId });
  };

  if (favoriteCourses.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.pageTitle}>Favorites</Text>
        </View>
        <View style={styles.emptyContainer}>
          <Ionicons name="heart-outline" size={80} color="#E5E7EB" />
          <Text style={styles.emptyTitle}>No Favorites Yet</Text>
          <Text style={styles.emptyText}>Start adding courses to your favorites!</Text>
        </View>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem} onPress={() => router.push('/student/dashboard')}>
            <Ionicons name="home" size={24} color="#93A5C5" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => router.push('/student/my-courses')}>
            <Ionicons name="book" size={24} color="#93A5C5" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => router.push('/student/favorites')}>
            <Ionicons name="heart" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="person" size={24} color="#93A5C5" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.pageTitle}>Favorites</Text>
        <Text style={styles.pageSubtitle}>
          {favoriteCourses.length} Course{favoriteCourses.length > 1 ? 's' : ''}
        </Text>

        {favoriteCourses.map((course) => (
          <Card key={course.id} style={styles.card}>
            <TouchableOpacity style={styles.cardContent}>
              <Image source={{ uri: course.image }} style={styles.courseImage} />
              
              <View style={styles.courseDetails}>
                <Text style={styles.courseTitle} numberOfLines={2}>{course.title}</Text>
                <Text style={styles.instructor}>By {course.instructor}</Text>
                <View style={styles.ratingContainer}>
                  <Text style={styles.stars}>⭐⭐⭐⭐⭐</Text>
                </View>
                <View style={styles.statsRow}>
                  <View style={styles.statItem}>
                    <Ionicons name="book-outline" size={14} color="#6B7280" />
                    <Text style={styles.statText}>{course.totalLessons || 100} Lessons</Text>
                  </View>
                  <Text style={styles.price}>{course.price || '85$'}</Text>
                </View>
              </View>

              <IconButton
                icon="heart"
                iconColor="#EF4444"
                size={24}
                onPress={() => handleRemoveFavorite(course.id)}
                style={styles.favoriteButton}
              />
            </TouchableOpacity>
          </Card>
        ))}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/student/dashboard')}>
          <Ionicons name="home" size={24} color="#93A5C5" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/student/my-courses')}>
          <Ionicons name="book" size={24} color="#93A5C5" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/student/favorites')}>
          <Ionicons name="heart" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person" size={24} color="#93A5C5" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
