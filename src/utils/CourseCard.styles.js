import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  iconButton: {
    alignItems: 'center',
    flex: 1,
  },
  iconLabel: {
    fontSize: 12,
    color: '#1E40AF',
    marginTop: 4,
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
