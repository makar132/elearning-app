import React from "react";
import { Modal, View, Text, Pressable, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../utils/Checkout.styles";

export default function ConfirmationModals({
  confirmDeleteId,
  setConfirmDeleteId,
  confirmRemove,
  clearEnrolledCourses,
  showSuccessModal,
  setShowSuccessModal,
  processing,
  handleConfirmCheckout,
}) {
  return (
    <>
      {/* Delete Modal */}
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
              {confirmDeleteId === "all" ? "Remove All?" : "Remove Course?"}
            </Text>
            <Text style={styles.modalText}>
              {confirmDeleteId === "all"
                ? "Remove all courses from cart?"
                : "Remove this course from cart?"}
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
                  if (confirmDeleteId === "all") clearEnrolledCourses();
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

      {/* Payment Confirmation Modal */}
      <Modal
        visible={showSuccessModal && !processing}
        transparent
        animationType="fade"
        onRequestClose={() => setShowSuccessModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Ionicons name="card-outline" size={64} color="#1E40AF" />
            <Text style={styles.modalTitle}>Confirm Payment</Text>
            <Text style={styles.modalText}>
              Are you sure you want to proceed with the payment?
            </Text>

            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.modalButton, styles.modalButtonCancel]}
                onPress={() => setShowSuccessModal(false)}
              >
                <Text style={styles.modalButtonTextCancel}>Cancel</Text>
              </Pressable>

              <Pressable
                style={[styles.modalButton, styles.modalButtonConfirm]}
                onPress={handleConfirmCheckout}
              >
                <Text style={styles.modalButtonTextConfirm}>
                  Confirm Payment
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Processing Modal */}
      <Modal visible={processing} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ActivityIndicator size="large" color="#1E40AF" />
            <Text style={styles.modalTitle}>Processing Payment...</Text>
          </View>
        </View>
      </Modal>
    </>
  );
}