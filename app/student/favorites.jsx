import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '../../src/context/FavoritesContext';
import styles from '../../src/utils/favoritesStyles';
import { router } from 'expo-router';

export default function Favorites() {
  const { favoriteCourses, toggleFavorite } = useFavorites();

  // لو مفيش كورسات في المفضلة
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
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="heart" size={24} color="#3B82F6" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="person" size={24} color="#93A5C5" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // لو في كورسات في المفضلة
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.pageTitle}>My Favorites</Text>
        <Text style={styles.pageSubtitle}>
          {favoriteCourses.length} Course{favoriteCourses.length > 1 ? 's' : ''}
        </Text>

        {favoriteCourses.map((course) => (
          <View key={course.id} style={styles.card}>
            <Image source={{ uri: course.imageUrl }} style={styles.courseImage} />

            <View style={styles.courseDetails}>
              <Text style={styles.courseTitle} numberOfLines={2}>{course.title}</Text>
              <Text style={styles.instructor}>By {course.instructor}</Text>

              <View style={styles.statsRow}>
                <Text style={styles.lessonsText}>{course.totalLessons || 20} Lessons</Text>
                <Text style={styles.price}>{course.price || '$85'}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={() => toggleFavorite(course)}
            >
              <Ionicons name="heart" size={22} color="#EF4444" />
            </TouchableOpacity>
          </View>
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
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="heart" size={24} color="#3B82F6" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person" size={24} color="#93A5C5" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}