import { StyleSheet } from 'react-native';

export const MyCoursesStyles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F9FAFB' },
  container: { flex: 1, paddingTop: 50 },
  pageTitle: { fontSize: 28, fontWeight: 'bold', color: '#1F2937', paddingHorizontal: 20, marginBottom: 8 },
  pageSubtitle: { fontSize: 16, color: '#6B7280', paddingHorizontal: 20, marginBottom: 20 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40 },
  emptyTitle: { fontSize: 20, fontWeight: 'bold', color: '#1F2937', marginTop: 16, marginBottom: 8 },
  emptyText: { fontSize: 16, color: '#6B7280', textAlign: 'center' },
  bottomNavContainer: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: 20, paddingBottom: 10, backgroundColor: 'transparent' },
  bottomNav: { flexDirection: 'row', backgroundColor: '#1E40AF', borderRadius: 25, paddingVertical: 12, paddingHorizontal: 10, justifyContent: 'space-around', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 8 },
  navItem: { flex: 1, alignItems: 'center', paddingVertical: 8 },


  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginHorizontal: 20,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  categoryScroll: {
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  categoryItem: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
  },
  categoryItemSelected: {
    backgroundColor: '#1E40AF',
    borderColor: '#1E40AF',
  },
  categoryText: {
    color: '#333',
    fontSize: 14,
  },
  categoryTextSelected: {
    color: '#fff',
    fontSize: 14,
  },
});

export const CourseCardStyles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  cardContent: {
    flexDirection: 'row',
    padding: 16,
  },
  courseImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginRight: 16,
  },
  courseDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  instructor: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 12,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 2,
    borderRadius: 8,
    paddingVertical: 4,
  },
  buttonLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  stats: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 24,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontSize: 13,
    color: '#6B7280',
  },
});
