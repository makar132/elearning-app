import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

export const courseDetailsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  headerContainer: {
    position: 'relative',
    height: 250,
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  headerOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(30, 58, 138, 0.5)',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 10,
    borderRadius: 25,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookmarkButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 10,
    borderRadius: 25,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButtonContainer: {
    position: 'absolute',
    top: '40%',
    left: '45%',
  },
  playButton: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 50,
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  tabsContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 0,
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    backgroundColor: 'transparent',
    borderBottomColor: '#1E3A8A',
  },
  tabText: {
    color: '#6B7280',
    fontWeight: '600',
    fontSize: 16,
  },
  activeTabText: {
    color: '#1E3A8A',
    fontWeight: '700',
  },
  contentContainer: {
    padding: 20,
    backgroundColor: '#fff',
  },
  titleContainer: {
    marginBottom: 20,
  },
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a2e',
    flex: 1,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F9FF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  priceText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E3A8A',
    marginLeft: 6,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4F46E5',
    marginLeft: 6,
  },
  instructorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  instructorName: {
    fontSize: 16,
    color: '#1a1a2e',
    fontWeight: '600',
    marginLeft: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  enrollButton: {
    marginTop: 24,
    backgroundColor: '#1E3A8A',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#1E3A8A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  enrollButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});

// ==== Instructor Tab ====
export const instructorTabStyles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#1E40AF', // لون خلفية للوجو الافتراضي
    alignItems: 'center',
    justifyContent: 'center',
  },
  defaultLogoText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '700',
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 4,
  },
  bioText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginTop: 2,
  },
  emailText: {
    fontSize: 14,
    color: '#1E40AF',
    fontWeight: '600',
    textDecorationLine: 'underline',
    marginTop: 6,
  },
});

// ==== Overview Tab ====
export const overviewTabStyles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 22,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    padding: 10,
    borderRadius: 10,
    minWidth: (width - 60) / 2,
  },
  infoText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#374151',
    fontWeight: '600',
  },
  sectionContainer: {
    marginTop: 16,
  },
  dateText: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
});
