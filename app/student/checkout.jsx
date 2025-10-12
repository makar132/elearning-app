import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { useCart } from '../../src/context/CartContext';
import styles from '../../src/utils/Checkout.styles';
import { CheckoutHeader, EmptyStateNoButton } from '../../src/components/checkout/CheckoutHeader';
import ConfirmationModals from '../../src/components/checkout/ConfirmationModals';
import CourseList from '../../src/components/checkout/CourseList';

export default function CheckoutScreen() {
  const router = useRouter(); 
  const { enrolledCourses, unenrollFromCourse, clearEnrolledCourses, getTotalPrice } = useCart(); 
  
  const [confirmDeleteId, setConfirmDeleteId] = useState(null); // Store course ID to confirm removal
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Control success checkout modal
  const [processing, setProcessing] = useState(false); 
  const totalPrice = getTotalPrice(); // Calc price

  const handleRemoveCourse = (courseId) => setConfirmDeleteId(courseId); //  delete confirmation

  const confirmRemove = () => {
    unenrollFromCourse(confirmDeleteId); // Remove course from cart
    setConfirmDeleteId(null); // Close confirmation modal
  };

  const handleCheckout = () => {
    if (!enrolledCourses.length) return; 
    setShowSuccessModal(true); // Show success modal
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
 
  if (!enrolledCourses.length) return <EmptyStateNoButton 
    icon="cart-outline" 
    title="Your cart is empty" 
    subtitle="Browse courses and add them to checkout"
  />; 

  return (
    <View style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      <CheckoutHeader itemCount={enrolledCourses.length} /> 

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 250}}
        showsVerticalScrollIndicator={false}
      >
        <CourseList
          enrolledCourses={enrolledCourses} 
          totalPrice={totalPrice} 
          handleRemoveCourse={handleRemoveCourse} // remove course
        />
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.footerLabel}>Total Amount</Text>
          <Text style={styles.footerTotal}>${totalPrice.toFixed(2)}</Text> 
        </View>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={handleCheckout} 
          disabled={processing} 
        >
          <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <ConfirmationModals
        confirmDeleteId={confirmDeleteId} 
        setConfirmDeleteId={setConfirmDeleteId} 
        confirmRemove={confirmRemove} // confirm deletion
        clearEnrolledCourses={clearEnrolledCourses} //  clear cart
        showSuccessModal={showSuccessModal} // Control checkout success modal
        setShowSuccessModal={setShowSuccessModal}
        processing={processing} 
        handleConfirmCheckout={handleConfirmCheckout} // Confirm checkout action
      />
    </View>
  );
}
