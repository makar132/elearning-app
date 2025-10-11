import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F9FAFB' 
  },
  
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 20, 
    paddingVertical: 16, 
    backgroundColor: '#fff', 
    borderBottomWidth: 1, 
    borderBottomColor: '#E5E7EB' 
  },
  
  backButton: { 
    padding: 4 
  },
  
  headerTitle: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#1F2937' 
  },
  
  courseCard: { 
    flexDirection: 'row', 
    backgroundColor: '#fff', 
    marginHorizontal: 16, 
    marginTop: 16, 
    borderRadius: 12, 
    padding: 12, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.05, 
    shadowRadius: 4, 
    elevation: 2 
  },
  
  courseImage: { 
    width: 80, 
    height: 80, 
    borderRadius: 8, 
    backgroundColor: '#E5E7EB' 
  },
  
  courseInfo: { 
    flex: 1, 
    marginLeft: 12, 
    justifyContent: 'space-between' 
  },
  
  courseTitle: { 
    fontSize: 15, 
    fontWeight: '600', 
    color: '#1F2937', 
    marginBottom: 4 
  },
  
  courseInstructor: { 
    fontSize: 13, 
    color: '#6B7280', 
    marginBottom: 8 
  },
  
  coursePrice: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#1E40AF' 
  },
  
  removeButton: { 
    padding: 4 
  },
  
  summaryCard: { 
    backgroundColor: '#fff', 
    marginHorizontal: 16, 
    marginTop: 24, 
    borderRadius: 12, 
    padding: 20, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.05, 
    shadowRadius: 4, 
    elevation: 2 
  },
  
  summaryTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#1F2937', 
    marginBottom: 16 
  },
  
  summaryRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 12 
  },
  
  summaryLabel: { 
    fontSize: 15, 
    color: '#6B7280' 
  },
  
  summaryValue: { 
    fontSize: 15, 
    fontWeight: '600', 
    color: '#1F2937' 
  },
  
  divider: { 
    height: 1, 
    backgroundColor: '#E5E7EB', 
    marginVertical: 12 
  },
  
  totalLabel: { 
    fontSize: 17, 
    fontWeight: 'bold', 
    color: '#1F2937' 
  },
  
  totalValue: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#1E40AF' 
  },
  
footer: { 
  position: 'absolute',
  bottom:120, 
  left: 16,
  right: 16,
  backgroundColor: '#fff', 
  paddingHorizontal: 20, 
  paddingVertical: 16,
  borderTopWidth: 1, 
  borderTopColor: '#E5E7EB', 
  borderRadius: 16,
  elevation: 8, 
  shadowColor: '#000', 
  shadowOffset: { width: 0, height: -2 }, 
  shadowOpacity: 0.1, 
  shadowRadius: 8,
  zIndex: 50,
},

  
  totalContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 12 
  },
  
  footerLabel: { 
    fontSize: 14, 
    color: '#6B7280' 
  },
  
  footerTotal: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: '#1E40AF' 
  },
  
  checkoutButton: { 
    backgroundColor: '#1E40AF', 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingVertical: 14, 
    borderRadius: 10, 
    gap: 8 
  },
  
  checkoutButtonText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  
  emptyContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingHorizontal: 40 
  },
  
  emptyTitle: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: '#1F2937', 
    marginTop: 20, 
    marginBottom: 8 
  },
  
  emptySubtitle: { 
    fontSize: 15, 
    color: '#6B7280', 
    textAlign: 'center', 
    marginBottom: 24 
  },
  
  primaryButton: { 
    backgroundColor: '#1E40AF', 
    paddingHorizontal: 32, 
    paddingVertical: 14, 
    borderRadius: 10 
  },
  
  primaryButtonText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: '600' 
  },
  
  modalOverlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.5)', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  
  modalContent: { 
    backgroundColor: '#fff', 
    borderRadius: 16, 
    padding: 24, 
    width: '85%', 
    alignItems: 'center' 
  },
  
  modalTitle: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#1F2937', 
    marginTop: 16, 
    marginBottom: 8 
  },
  
  modalText: { 
    fontSize: 15, 
    color: '#6B7280', 
    textAlign: 'center', 
    marginBottom: 24 
  },
  
  modalButtons: { 
    flexDirection: 'row', 
    gap: 12, 
    width: '100%' 
  },
  
  modalButton: { 
    flex: 1, 
    paddingVertical: 12, 
    borderRadius: 8, 
    alignItems: 'center' 
  },
  
  modalButtonCancel: { 
    backgroundColor: '#F3F4F6' 
  },
  
  modalButtonConfirm: { 
    backgroundColor: '#1E40AF' 
  },
  
  modalButtonTextCancel: { 
    color: '#6B7280', 
    fontWeight: '600', 
    fontSize: 15 
  },
  
  modalButtonTextConfirm: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 15 
  },
});

export default styles;