import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { courseDetailsStyles as styles } from '../../src/utils/courseDetailsStyles';
import CourseOverviewTab from '../../src/components/CourseDetails/ourseOverviewTab';
import InstructorInfoTab from '../../src/components/CourseDetails/InstructorInfoTab';
import { courseService } from '../../src/services/courseService';

export default function CourseDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCourseData = async () => {
      if (params.id) {
        try {
          setLoading(true);
          const course = await courseService.getCourseById(params.id);
          setCourseData(course);
        } catch (error) {
          console.error('Error loading course:', error);
          setCourseData(null);
        } finally {
          setLoading(false);
        }
      }
    };
    loadCourseData();
  }, [params.id]);

  const handleBookmark = () => setIsBookmarked(!isBookmarked);
  const handleEnroll = () => console.log('Enrolling in course:', courseData?.title);

  if (loading) return (
    <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
      <ActivityIndicator size="large" color="#1E40AF" />
      <Text style={{ marginTop: 16, color: '#6B7280', fontSize: 16 }}>Loading course details...</Text>
    </View>
  );

  if (!courseData) return (
    <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', padding: 20 }]}>
      <Ionicons name="alert-circle-outline" size={80} color="#E5E7EB" />
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1F2937', marginTop: 16, marginBottom: 8 }}>
        Course Not Found
      </Text>
      <TouchableOpacity style={{ backgroundColor: '#1E40AF', paddingHorizontal: 32, paddingVertical: 14, borderRadius: 10 }}
        onPress={() => router.back()}>
        <Text style={{ color: '#fff', fontWeight: '600', fontSize: 15 }}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Image source={{ uri: courseData.imageUrl }} style={styles.headerImage} />
          <View style={styles.headerOverlay} />

          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.bookmarkButton} onPress={handleBookmark}>
            <Ionicons name={isBookmarked ? "bookmark" : "bookmark-outline"} size={24} color="#fff" />
          </TouchableOpacity>

          <View style={styles.playButtonContainer}>
            <TouchableOpacity style={styles.playButton}>
              <Ionicons name="play" size={24} color="#1e3a8a" />
            </TouchableOpacity>
          </View>

          <View style={styles.tabsContainer}>
            <TouchableOpacity style={[styles.tab, activeTab === 'overview' && styles.activeTab]} onPress={() => setActiveTab('overview')}>
              <Text style={[styles.tabText, activeTab === 'overview' && styles.activeTabText]}>Overview</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.tab, activeTab === 'instructor' && styles.activeTab]} onPress={() => setActiveTab('instructor')}>
              <Text style={[styles.tabText, activeTab === 'instructor' && styles.activeTabText]}>Instructor</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Content */}
        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <View style={styles.titleSection}>
              <Text style={styles.title}>{courseData.title}</Text>
          
            </View>
          </View>

          {activeTab === 'overview' ? (
            <CourseOverviewTab courseData={courseData} />
          ) : (
            <InstructorInfoTab instructorData={courseData.instructor} courseData={courseData} />
          )}

          <TouchableOpacity style={styles.enrollButton} onPress={handleEnroll}>
            <Text style={styles.enrollButtonText}>MAKE AN ENROLLMENT</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
