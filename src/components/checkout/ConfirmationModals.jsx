import React from 'react';
import { Modal, View, Text, Pressable, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../utils/Checkout.styles';

export default function ConfirmationModals({
  confirmDeleteId,
  setConfirmDeleteId,
  confirmRemove,
  clearEnrolledCourses,
  showSuccessModal,
  setShowSuccessModal,
  processing,
  handleConfirmCheckout,
  enrolledCourses,
  totalPrice
}) {
  return (
    <>
      <Modal
        visible={confirmDeleteId !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setConfirmDeleteId(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Ionicons name="warning-outline" size={48} color="#DC2626" />
            <Text style={styles.modalTitle}>
              {confirmDeleteId === 'all' ? 'Remove All Courses?' : 'Remove Course?'}
            </Text>
            <Text style={styles.modalText}>
              {confirmDeleteId === 'all' 
                ? 'Are you sure you want to remove all courses from checkout?' 
                : 'Are you sure you want to remove this course from checkout?'}
            </Text>
            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.modalButton, styles.modalButtonCancel]}
                onPress={() => setConfirmDeleteId(null)}
              >
                <Text style={styles.modalButtonTextCancel}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.modalButton, styles.modalButtonConfirm]}
                onPress={() => {
                  if (confirmDeleteId === 'all') clearEnrolledCourses();
                  else confirmRemove();
                  setConfirmDeleteId(null);
                }}
              >
                <Text style={styles.modalButtonTextConfirm}>Remove</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showSuccessModal}
        transparent
        animationType="fade"
        onRequestClose={() => !processing && setShowSuccessModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {processing ? (
              <>
                <ActivityIndicator size="large" color="#1E40AF" />
                <Text style={styles.modalTitle}>Processing...</Text>
              </>
            ) : (
              <>
                <Ionicons name="checkmark-circle" size={64} color="#059669" />
                <Text style={styles.modalTitle}>Enrollment Confirmed!</Text>
                <Text style={styles.modalText}>
                  You have successfully enrolled in {enrolledCourses.length} course(s) for ${totalPrice.toFixed(2)}
                </Text>
                <View style={styles.modalButtons}>
                  <Pressable
                    style={[styles.modalButton, styles.modalButtonConfirm]}
                    onPress={handleConfirmCheckout}
                  >
                    <Text style={styles.modalButtonTextConfirm}>Go to My Courses</Text>
                  </Pressable>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
}
