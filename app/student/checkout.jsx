import React, { useState } from 'react';
import { StatusBar, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../../src/context/CartContext';
import { useAuth } from '../../src/context/AuthContext';
import styles from '../../src/utils/Checkout.styles';

import CheckoutHeader from '../../src/components/checkout/CheckoutHeader';
import CourseList from '../../src/components/checkout/CourseList';
import ConfirmationModals from '../../src/components/checkout/ConfirmationModals';

export default function CheckoutScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { enrolledCourses, unenrollFromCourse, clearEnrolledCourses } = useCart();
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [processing, setProcessing] = useState(false);

  const totalPrice = enrolledCourses.reduce((sum, course) => sum + (parseFloat(course.price) || 0), 0);

  const handleRemoveCourse = (courseId) => setConfirmDeleteId(courseId);
  const confirmRemove = () => {
    unenrollFromCourse(confirmDeleteId);
    setConfirmDeleteId(null);
  };

  const handleCheckout = () => {
    if (!enrolledCourses.length) return;
    setShowSuccessModal(true);
  };

  const handleConfirmCheckout = () => {
    if (!enrolledCourses.length) return setShowSuccessModal(false);

    setProcessing(true);
    setTimeout(() => {
      clearEnrolledCourses();
      setProcessing(false);
      setShowSuccessModal(false);
      router.push('/student/my-courses');
    }, 500);
  };


  const EmptyState = ({ icon, title, subtitle, buttonText, onPress }) => (
    <View style={styles.emptyContainer}>
      <Ionicons name={icon} size={80} color="#E5E7EB" />
      <Text style={styles.emptyTitle}>{title}</Text>
      <Text style={styles.emptySubtitle}>{subtitle}</Text>
      <TouchableOpacity style={styles.primaryButton} onPress={onPress}>
        <Text style={styles.primaryButtonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );

  if (!user) return <EmptyState icon="person-circle-outline" title="Login Required" subtitle="Please login to view checkout" buttonText="Go to Login" 
  onPress={() => router.push('/auth/login')} />;

  if (!enrolledCourses.length) return <EmptyState icon="cart-outline" title="Your cart is empty" subtitle="Browse courses and add them to checkout" buttonText="Browse Courses"
  onPress={() => router.push('/student/dashboard')} />;

  // 
  return (
    <View style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      <CheckoutHeader itemCount={enrolledCourses.length} onClearAll={() => setConfirmDeleteId('all')} />

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 250 }} showsVerticalScrollIndicator={false}>
        <CourseList enrolledCourses={enrolledCourses} totalPrice={totalPrice} handleRemoveCourse={handleRemoveCourse} />
      </ScrollView>

      <View style={[styles.footer, { bottom: 100}]}>
        <View style={styles.totalContainer}>
          <Text style={styles.footerLabel}>Total Amount</Text>
          <Text style={styles.footerTotal}>${totalPrice.toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout} disabled={processing}>
          <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <ConfirmationModals
        confirmDeleteId={confirmDeleteId}
        setConfirmDeleteId={setConfirmDeleteId}
        confirmRemove={confirmRemove}
        clearEnrolledCourses={clearEnrolledCourses}
        showSuccessModal={showSuccessModal}
        setShowSuccessModal={setShowSuccessModal}
        processing={processing}
        handleConfirmCheckout={handleConfirmCheckout}
        enrolledCourses={enrolledCourses}
        totalPrice={totalPrice}
      />
    </View>
  );
}
