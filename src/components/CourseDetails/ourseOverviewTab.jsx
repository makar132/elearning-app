import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { overviewTabStyles as styles } from '../../utils/courseDetailsStyles';

export default function CourseOverviewTab({ courseData }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Course Description</Text>
      <Text style={styles.description}>{courseData.description}</Text>

      <View style={styles.infoRow}>
        <View style={styles.infoCard}>
          <Ionicons name="folder-outline" size={20} color="#4F46E5" />
          <Text style={styles.infoText}>{courseData.category}</Text>
        </View>
        
        <View style={styles.infoCard}>
          <Ionicons name="pricetag-outline" size={20} color="#059669" />
          <Text style={styles.infoText}>${courseData.price}</Text>
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.title}>Created At</Text>
        <Text style={styles.dateText}>
          {new Date(courseData.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </Text>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.title}>Updated At</Text>
        <Text style={styles.dateText}>
          {new Date(courseData.updatedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </Text>
      </View>
    </View>
  );
}