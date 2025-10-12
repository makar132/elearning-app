import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { courseDetailsStyles as styles } from '../../utils/courseDetailsStyles';

const TABS = ['overview', 'instructor', 'reviews'];

const renderStars = (rating) => (
  <View style={styles.ratingStars}>
    {[1, 2, 3, 4, 5].map(star => (
      <Ionicons
        key={star}
        name={star <= Math.round(rating) ? 'star' : 'star-outline'}
        size={16}
        color="#FBBF24"
      />
    ))}
  </View>
);

export default function CourseHeaderInfo({ course, avgRating, activeTab, onTabChange }) {
  return (
    <>
      <View style={styles.headerContainer}>
        <Image source={{ uri: course.imageUrl }} style={styles.headerImage} />
        <View style={styles.headerOverlay} />

        <View style={styles.tabsContainer}>
          {TABS.map(tab => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => onTabChange(tab)}
              activeOpacity={0.7}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                {tab[0].toUpperCase() + tab.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.titleContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={2}>
            {course.title}
          </Text>
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>${course.price}</Text>
          </View>
        </View>

        <View style={styles.instructorRow}>
          <Ionicons name="person-circle-outline" size={18} color="#6B7280" />
          <Text style={styles.instructorText}>By {course.instructor}</Text>
        </View>

        <View style={styles.ratingRow}>
          {renderStars(avgRating.average)}
          <Text style={styles.instructorText}>
            {avgRating.average.toFixed(1)} ({avgRating.count}{' '}
            {avgRating.count === 1 ? 'review' : 'reviews'})
          </Text>
        </View>
      </View>
    </>
  );
}