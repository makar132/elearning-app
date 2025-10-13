import React, { useState, useEffect } from "react";
import {
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "../../src/context/CartContext";
import { useAuth } from "../../src/context/AuthContext";
import styles from "../../src/utils/Checkout.styles";
import ConfirmationModals from "../../src/components/checkout/ConfirmationModals";


export default function Checkout() {
  const router = useRouter();
  const { user } = useAuth();

  // من الـ context
  const {
    checkoutCourses,
    removeFromCheckout,
    clearCheckout,
    getTotalPrice,
    moveCheckoutToMyCourses,
    loading: contextLoading,
  } = useCart();

  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [localLoading, setLocalLoading] = useState(false); // لتحكم عرض Loading محلي لو احتجنا

  // total price
  const totalPrice = getTotalPrice();

  // حذف عنصر (يضع id في confirm modal)
  const handleRemoveCourse = (courseId) => setConfirmDeleteId(courseId);

  const confirmRemove = async () => {
    if (!confirmDeleteId) return;
    // دعم للحالة 'all' في حال استخدامها
    if (confirmDeleteId === "all") {
      // تأكّد
      Alert.alert("Clear cart", "Are you sure you want to clear the cart?", [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes",
          onPress: async () => {
            await clearCheckout();
            setConfirmDeleteId(null);
          },
          style: "destructive",
        },
      ]);
      return;
    }

    // حذف واحد
    await removeFromCheckout(confirmDeleteId);
    setConfirmDeleteId(null);
  };

  // فتح مودال التأكيد للـ checkout
  const handleCheckout = () => {
    if (!checkoutCourses?.length) return;
    setShowSuccessModal(true);
  };

  // تنفيذ النقل الفعلي -> moveCheckoutToMyCourses (مع معالجة الحالة)
  const handleConfirmCheckout = async () => {
    if (!checkoutCourses?.length) {
      setShowSuccessModal(false);
      return;
    }

    setProcessing(true);
    try {
      const success = await moveCheckoutToMyCourses(); // دالة في CartContext
      setProcessing(false);
      setShowSuccessModal(false);

      if (success) {
        // نجاح — اودي المستخدم لصفحة My Courses
        router.push("/student/my-courses");
      } else {
        Alert.alert("Error", "Something went wrong during checkout. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setProcessing(false);
      setShowSuccessModal(false);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  // Empty state component
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

  // Loading handling: إذا الـ context لسه بيحمّل بياناته
  if (contextLoading || localLoading) {
    return (
      <View style={[styles.center, { flex: 1 }]}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={{ marginTop: 10, color: "#6B7280" }}>Loading checkout...</Text>
      </View>
    );
  }

  // لو المستخدم مش مسجل دخول
  if (!user) {
    return (
      <EmptyState
        icon="person-circle-outline"
        title="Login Required"
        subtitle="Please login to view checkout"
        buttonText="Go to Login"
        onPress={() => router.push("/auth/login")}
      />
    );
  }

  // لو مفيش عناصر في الكارت
  if (!checkoutCourses || checkoutCourses.length === 0) {
    return (
      <EmptyState
        icon="cart-outline"
        title="Your cart is empty"
        subtitle="Browse courses and add them to checkout"
        buttonText="Browse Courses"
        onPress={() => router.push("/student/dashboard")}
      />
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#F9FAFB" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />

      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={22} color="#1E3A8A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <TouchableOpacity onPress={() => setConfirmDeleteId("all")}>
          <Ionicons name="trash-outline" size={22} color="#DC2626" />
        </TouchableOpacity>
      </View>

      {/* List */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 180 }}
        showsVerticalScrollIndicator={false}
      >
        {checkoutCourses.map((course) => (
          <View key={course.id} style={styles.courseCard}>
            <View style={styles.courseInfo}>
              <Text style={styles.courseTitle} numberOfLines={2}>
                {course.title}
              </Text>
              <Text style={styles.courseInstructor}>{course.instructor || ""}</Text>
            </View>

            <View style={styles.courseMeta}>
              <Text style={styles.coursePrice}>${(parseFloat(course.price) || 0).toFixed(2)}</Text>

              <TouchableOpacity
                onPress={() => handleRemoveCourse(course.id)}
                style={styles.trashButton}
                activeOpacity={0.7}
              >
                <Ionicons name="trash-outline" size={18} color="#DC2626" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Footer */}
      <View style={[styles.footer, { bottom: 40 }]}>
        <View style={styles.totalContainer}>
          <Text style={styles.footerLabel}>Total Amount</Text>
          <Text style={styles.footerTotal}>${totalPrice.toFixed(2)}</Text>
        </View>

        <TouchableOpacity
          style={[styles.checkoutButton, processing && { opacity: 0.7 }]}
          onPress={handleCheckout}
          disabled={processing}
        >
          <Text style={styles.checkoutButtonText}>
            {processing ? "Processing..." : "Proceed to Checkout"}
          </Text>
          <Ionicons name="arrow-forward" size={18} color="#fff" style={{ marginLeft: 8 }} />
        </TouchableOpacity>
      </View>

      {/* Confirmation modals component */}
      <ConfirmationModals
        confirmDeleteId={confirmDeleteId}
        setConfirmDeleteId={setConfirmDeleteId}
        confirmRemove={confirmRemove}
        clearCheckout={clearCheckout}
        showSuccessModal={showSuccessModal}
        setShowSuccessModal={setShowSuccessModal}
        processing={processing}
        handleConfirmCheckout={handleConfirmCheckout}
        checkoutCourses={checkoutCourses}
        totalPrice={totalPrice}
      />
    </View>
  );
}