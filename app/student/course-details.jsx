import React, { useState, useEffect } from 'react';
import { 
  View, Text, ScrollView, Image, TouchableOpacity, StatusBar, 
  ActivityIndicator, Alert, Modal 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { courseDetailsStyles as styles } from '../../src/utils/courseDetailsStyles';

import CourseOverviewTab from '../../src/components/CourseDetails/CourseOverviewTab';
import InstructorInfoTab from '../../src/components/CourseDetails/InstructorInfoTab';
import ReviewsTab from '../../src/components/CourseDetails/ReviewsTab';
import { courseService } from '../../src/services/courseService';
import { reviewService } from '../../src/services/reviewService';
import { useAuth } from '../../src/context/AuthContext';
import { useCart } from '../../src/context/CartContext';

// Tabs
const TABS = ['overview', 'instructor', 'reviews'];
export default function CourseDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { user } = useAuth();
  const { enrollInCourse, isEnrolled } = useCart();

  const [activeTab, setActiveTab] = useState('overview'); 
  const [courseData, setCourseData] = useState(null); // Course information
  const [loading, setLoading] = useState(true); // Loading state
  const [avgRating, setAvgRating] = useState({ average: 0, count: 0 }); // Rating info
  const [confirmVisible, setConfirmVisible] = useState(false); // Modal visibility

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        setLoading(true);
          const [course, rating] = await Promise.all([
          courseService.getCourseById(id),
          reviewService.getCourseAverageRating(id)
        ]);
        setCourseData(course);
        setAvgRating(rating);
      } catch {
        Alert.alert('Error', 'Failed to load course details');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);
  const handleEnroll = () => {
    if (!user) return Alert.alert('Login Required', 'Please login to enroll');
    if (!id) return Alert.alert('Error', 'Course ID not found');
    if (isEnrolled(id)) return Alert.alert('Already Added', 'This course is already in checkout');
    setConfirmVisible(true);
  };

  const confirmEnroll = () => {
    if (!courseData) return;
    setConfirmVisible(false);
    const added = enrollInCourse(id, {
      title: courseData.title,
      price: courseData.price,
      imageUrl: courseData.imageUrl,
      instructor: courseData.instructor,
    });
    Alert.alert(added ? 'Success' : 'Already Added', 
      added ? `"${courseData.title}" added to checkout` : 'Course already in checkout'
    );
  };
  // rating star
  const renderStars = (rating) => (
    <View style={styles.ratingStars}>
      {[1,2,3,4,5].map(star => (
        <Ionicons
          key={star}
          name={star <= Math.round(rating) ? 'star' : 'star-outline'}
          size={16}
          color="#FBBF24"
        />
      ))}
    </View>
  );

  if (loading)
    return (
      <View style={[styles.container, { justifyContent:'center', alignItems:'center' }]}>
        <ActivityIndicator size="large" color="#1E40AF" />
        <Text style={{ marginTop:16, color:'#6B7280', fontSize:16 }}>Loading course...</Text>
      </View>
    );

  if (!courseData)
    return (
      <View style={[styles.container, { justifyContent:'center', alignItems:'center', padding:20 }]}>
        <Ionicons name="alert-circle-outline" size={80} color="#E5E7EB" />
        <Text style={{ fontSize:20, fontWeight:'bold', color:'#1F2937', marginTop:16, marginBottom:8 }}>
          Course Not Found
        </Text>
        <TouchableOpacity 
          style={{ backgroundColor:'#1E40AF', paddingHorizontal:32, paddingVertical:14, borderRadius:10 }}
          onPress={() => router.back()}
        >
          <Text style={{ color:'#fff', fontWeight:'600', fontSize:15 }}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );

  const enrolled = isEnrolled(id);

  // render course details
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
       <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom:230 }}>
                 <View style={styles.headerContainer}>
          <Image source={{ uri: courseData.imageUrl }} style={styles.headerImage} />
          <View style={styles.headerOverlay} />
  
          {/* Tabs (Overview / Instructor / Reviews) */}
          <View style={styles.tabsContainer}>
            {TABS.map(tab => (
              <TouchableOpacity
                key={tab}
                style={[styles.tab, activeTab===tab && styles.activeTab]}
                onPress={() => setActiveTab(tab)}
                activeOpacity={0.7}
              >
                <Text style={[styles.tabText, activeTab===tab && styles.activeTabText]}>
                  {tab[0].toUpperCase() + tab.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.titleContainer}>
          <View style={styles.titleRow}>
            <Text style={styles.title} numberOfLines={2}>{courseData.title}</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.priceText}>${courseData.price}</Text>
            </View>
          </View>


          {/* Instructor Info */}
          <View style={styles.instructorRow}>
            <Ionicons name="person-circle-outline" size={18} color="#6B7280" />
            <Text style={styles.instructorText}>By {courseData.instructor}</Text>
          </View>

          {/* Rating Info */}
          <View style={styles.ratingRow}>
            {renderStars(avgRating.average)}
            <Text style={styles.instructorText}>
              {avgRating.average.toFixed(1)} ({avgRating.count} {avgRating.count === 1 ? 'review' : 'reviews'})
            </Text>
          </View>
        </View>
        {/* ===== TABS CONTENT ===== */}
        {activeTab==='overview' && <CourseOverviewTab courseData={courseData} />}
        {activeTab==='instructor' && <InstructorInfoTab instructorData={courseData.instructor} courseData={courseData} />}
        {activeTab==='reviews' && <ReviewsTab courseId={id} />}
      </ScrollView>

      {/* ===== ENROLL BUTTON (BOTTOM FIXED) ===== */}
      <View style={styles.enrollButtonContainer}>
        <TouchableOpacity 
          style={[styles.enrollButton, enrolled && styles.enrollButtonDisabled]} 
          onPress={handleEnroll} 
          activeOpacity={0.8}
          disabled={enrolled}
        >
          <Ionicons name={enrolled ? "checkmark-circle" : "cart"} size={20} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.enrollButtonText}>
            {enrolled ? 'ALREADY IN CHECKOUT' : 'ADD TO CHECKOUT'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* ===== CONFIRMATION MODAL ===== */}
      <Modal visible={confirmVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Ionicons name="cart-outline" size={52} color="#1E40AF" style={styles.modalIconContainer} />
            <Text style={styles.modalTitle}>Add to Checkout?</Text>
            <Text style={styles.modalMessage}>
              Add &quot;{courseData.title}&quot; to your checkout list?
            </Text>

            {/* Modal buttons */}
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButtonCancel} onPress={() => setConfirmVisible(false)}>
                <Text style={styles.modalButtonCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButtonConfirm} onPress={confirmEnroll}>
                <Text style={styles.modalButtonConfirmText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}