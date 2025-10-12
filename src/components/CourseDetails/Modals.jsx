import React from 'react';
import { Modal, View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../utils/ModalStyles'; 

// ReviewsTab.jsx
export function DeleteConfirmModal({ visible, onCancel, onDelete }) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.deleteContainer}>
          <Ionicons name="trash-outline" size={44} color="#DC2626" style={styles.deleteIcon} />
          <Text style={styles.deleteTitle}>Confirm Delete</Text>
          <Text style={styles.deleteMessage}>Are you sure you want to delete this review?</Text>
          <View style={styles.deleteButtons}>
            <Pressable style={styles.buttonCancel} onPress={onCancel}>
              <Text style={styles.buttonCancelText}>Cancel</Text>
            </Pressable>
            <Pressable style={styles.buttonDelete} onPress={onDelete}>
              <Text style={styles.buttonDeleteText}>Delete</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

// course-details.jsx
export function AddToCheckoutModal({ visible, courseTitle, onCancel, onConfirm }) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.checkoutContainer}>
          <Ionicons name="cart-outline" size={52} color="#1E40AF" style={styles.modalIcon} />
          <Text style={styles.checkoutTitle}>Add to Checkout?</Text>
          <Text style={styles.checkoutMessage}>Add "{courseTitle}" to your checkout list?</Text>
          <View style={styles.checkoutButtons}>
            <Pressable style={styles.buttonCancel} onPress={onCancel}>
              <Text style={styles.buttonCancelText}>Cancel</Text>
            </Pressable>
            <Pressable style={styles.buttonAdd} onPress={onConfirm}>
              <Text style={styles.buttonAddText}>Add</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

// ReviewsTab.jsx
export function SuccessModal({ visible, message, onClose }) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.successContainer}>
          <Ionicons name="checkmark-circle" size={52} color="#10B981" style={styles.successIcon} />
          <Text style={styles.successMessage}>{message}</Text>
          <Pressable onPress={onClose} style={styles.successButton}>
            <Text style={styles.successButtonText}>OK</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}