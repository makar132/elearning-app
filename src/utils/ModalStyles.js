import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Alert Modal
  alertContainer: { backgroundColor: '#fff', borderRadius: 12, padding: 20, width: '80%' },
  alertMessage: { fontSize: 15, color: '#1F2937', textAlign: 'center', marginBottom: 16 },
  alertButton: { backgroundColor: '#1E40AF', paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
  alertButtonText: { color: '#fff', fontWeight: '600', fontSize: 15 },

  // Confirm Modal
  confirmContainer: { backgroundColor: '#fff', borderRadius: 16, padding: 24, width: '85%', alignItems: 'center' },
  modalIcon: { marginBottom: 16 },
  confirmTitle: { fontSize: 20, fontWeight: '700', color: '#1F2937', marginBottom: 8, textAlign: 'center' },
  confirmMessage: { fontSize: 15, color: '#6B7280', textAlign: 'center', marginBottom: 24 },
  confirmButtons: { flexDirection: 'row', gap: 12, width: '100%' },

  // Delete Modal
  deleteContainer: { backgroundColor: '#fff', borderRadius: 16, padding: 24, width: '85%', alignItems: 'center' },
  deleteIcon: { marginBottom: 16 },
  deleteTitle: { fontSize: 18, fontWeight: '700', color: '#1F2937', marginBottom: 8, textAlign: 'center' },
  deleteMessage: { fontSize: 14, color: '#6B7280', textAlign: 'center', marginBottom: 24 },
  deleteButtons: { flexDirection: 'row', gap: 12, width: '100%' },

  // Checkout Modal
  checkoutContainer: { backgroundColor: '#fff', borderRadius: 16, padding: 24, width: '85%', alignItems: 'center' },
  checkoutTitle: { fontSize: 20, fontWeight: '700', color: '#1F2937', marginBottom: 8, textAlign: 'center' },
  checkoutMessage: { fontSize: 15, color: '#6B7280', textAlign: 'center', marginBottom: 24 },
  checkoutButtons: { flexDirection: 'row', gap: 12, width: '100%' },

  // Success Modal
  successContainer: { backgroundColor: '#fff', borderRadius: 16, padding: 24, width: '85%', alignItems: 'center' },
  successIcon: { marginBottom: 16 },
  successMessage: { fontSize: 15, color: '#1F2937', textAlign: 'center', marginBottom: 20, fontWeight: '600' },
  successButton: { backgroundColor: '#10B981', paddingHorizontal: 32, paddingVertical: 10, borderRadius: 8 },
  successButtonText: { color: '#fff', fontWeight: '600', fontSize: 15 },

  // Error Modal
  errorContainer: { backgroundColor: '#fff', borderRadius: 16, padding: 24, width: '85%', alignItems: 'center' },
  errorIcon: { marginBottom: 16 },
  errorMessage: { fontSize: 15, color: '#1F2937', textAlign: 'center', marginBottom: 20, fontWeight: '600' },
  errorButton: { backgroundColor: '#DC2626', paddingHorizontal: 32, paddingVertical: 10, borderRadius: 8 },
  errorButtonText: { color: '#fff', fontWeight: '600', fontSize: 15 },

  // Shared button styles
  buttonCancel: { flex: 1, paddingVertical: 12, borderRadius: 8, alignItems: 'center', backgroundColor: '#F3F4F6' },
  buttonCancelText: { color: '#6B7280', fontWeight: '600', fontSize: 15 },
  buttonConfirm: { flex: 1, paddingVertical: 12, borderRadius: 8, alignItems: 'center', backgroundColor: '#1E40AF' },
  buttonConfirmText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  buttonDelete: { flex: 1, paddingVertical: 12, borderRadius: 8, alignItems: 'center', backgroundColor: '#DC2626' },
  buttonDeleteText: { color: '#fff', fontWeight: '600', fontSize: 15 },
  buttonAdd: { flex: 1, paddingVertical: 12, borderRadius: 8, alignItems: 'center', backgroundColor: '#1E40AF' },
  buttonAddText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
