import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { overviewTabStyles as styles } from '../../utils/courseDetailsStyles';

export default function CourseOverviewTab({ courseData }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Default values for missing data
  const totalLessons = courseData.totalLessons || 100;
  const duration = courseData.duration || '7 Weeks';
  const certificate = courseData.certificate !== false; // true by default
  const discount = courseData.discount || '20';
  const skills = courseData.skills || []; // Only show if exists in Firebase

  const description = courseData.description || 'No description available';
  const shouldShowReadMore = description.length > 150;
  const displayedDescription = isExpanded || !shouldShowReadMore
    ? description
    : description.substring(0, 150) + '...';

  return (
    <View style={styles.container}>
      {/* Description */}
      <Text style={styles.description}>{displayedDescription}</Text>
      {shouldShowReadMore && (
        <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
          <Text style={styles.readMoreText}>
            {isExpanded ? 'Read Less' : 'Read More'}
          </Text>
        </TouchableOpacity>
      )}

      {/* Info Cards Grid */}
      <View style={styles.infoGrid}>
        <View style={styles.infoCard}>
          <View style={styles.infoIconContainer}>
            <Ionicons name="book" size={22} color="#1E40AF" />
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoValue}>{totalLessons}+</Text>
            <Text style={styles.infoLabel}>Lessons</Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoIconContainer}>
            <Ionicons name="ribbon" size={22} color="#059669" />
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoValue}>{certificate ? 'Yes' : 'No'}</Text>
            <Text style={styles.infoLabel}>Certificate</Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoIconContainer}>
            <Ionicons name="time" size={22} color="#DC2626" />
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoValue}>{duration}</Text>
            <Text style={styles.infoLabel}>Duration</Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoIconContainer}>
            <Ionicons name="pricetag" size={22} color="#7C3AED" />
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoValue}>{discount}%</Text>
            <Text style={styles.infoLabel}>Discount</Text>
          </View>
        </View>
      </View>

      {/* Skills Section - Only show if skills exist */}
      {skills && skills.length > 0 && (
        <View style={styles.skillsSection}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skillsContainer}>
            {skills.map((skill, index) => (
              <View key={index} style={styles.skillTag}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Additional Info */}
      <View style={styles.additionalInfo}>
        <View style={styles.infoRow}>
          <Ionicons name="folder-outline" size={20} color="#6B7280" />
          <Text style={styles.infoText}>Category: {courseData.category || 'General'}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Ionicons name="calendar-outline" size={20} color="#6B7280" />
          <Text style={styles.infoText}>
            Created: {courseData.createdAt ? new Date(courseData.createdAt.toDate ? courseData.createdAt.toDate() : courseData.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            }) : 'N/A'}
          </Text>
        </View>
      </View>
    </View>
  );
}