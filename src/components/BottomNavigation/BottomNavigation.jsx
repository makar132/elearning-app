import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function BottomNav({ active }) {
  return (
    <View style={styles.bottomNavContainer}>
      <View style={styles.bottomNav}>
        <TouchableOpacity
          onPress={() => router.push('/student/dashboard')}
          style={styles.navItem}
          activeOpacity={0.7}
        >
          <Ionicons name="home" size={24} color={active === 'home' ? '#FFFFFF' : '#93A5C5'} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push('/student/my-courses')}
          style={styles.navItem}
          activeOpacity={0.7}
        >
          <Ionicons name="book" size={24} color={active === 'courses' ? '#FFFFFF' : '#93A5C5'} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push('/student/favorites')}
          style={styles.navItem}
          activeOpacity={0.7}
        >
          <Ionicons name="heart" size={24} color={active === 'favorites' ? '#FFFFFF' : '#93A5C5'} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push('/student/profile')}
          style={styles.navItem}
          activeOpacity={0.7}
        >
          <Ionicons name="person" size={24} color={active === 'profile' ? '#FFFFFF' : '#93A5C5'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNavContainer: {
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
    backgroundColor: 'transparent',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#1E40AF', // اللون الأصلي
    borderRadius: 20, // أقل من قبل، مش مستدير قوي
    paddingVertical: 10, // أصغر شوي
    paddingHorizontal: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 6,
  },
});
