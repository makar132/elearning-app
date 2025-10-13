
import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import { useState } from 'react';
import { Animated, Pressable, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import styles from '../../utils/BottomNav.styles';
import ProfileSidebar from './ProfileSidebar';

const { width } = require('react-native').Dimensions.get('window');
const SIDEBAR_WIDTH = width * 0.75;

const NAV_ITEMS = [
  { key: 'home', icon: 'home', route: '/student/my-courses', pathPattern: '/my-courses' },
  { key: 'courses', icon: 'book', route: '/student/dashboard', pathPattern: '/dashboard' },
  { key: 'chat', icon: 'chatbubble-ellipses', route: '/aiChat', pathPattern: '/aiChat' },
  { key: 'favorites', icon: 'heart', route: '/student/favorites', pathPattern: '/favorites' },
  { key: 'profile', icon: 'person', action: 'sidebar' },
];

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useAuth();
  const { checkoutCount } = useCart();

  const [sidebarVisible, setSidebarVisible] = useState(false);
  const slideAnim = new Animated.Value(SIDEBAR_WIDTH);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
    Animated.timing(slideAnim, {
      toValue: sidebarVisible ? SIDEBAR_WIDTH : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleLogout = async () => {
    toggleSidebar();
    await new Promise(r => setTimeout(r, 300));
    await logout();
    router.replace('/auth');
  };

  const handleNavPress = (item) => {
    if (item.action === 'sidebar') toggleSidebar();
    else if (item.route) router.push(item.route);
  };

  const activeTab = NAV_ITEMS.find(item => item.pathPattern && pathname.startsWith(item.pathPattern))?.key 
|| (sidebarVisible ? 'profile' : '');

  return (
    <>
      <ProfileSidebar
        visible={sidebarVisible}
        slideAnim={slideAnim}
        toggleSidebar={toggleSidebar}
        handleLogout={handleLogout}
        menuItems={[{
          icon: 'briefcase',
          title: 'My Courses',
          onPress: () => { toggleSidebar(); setTimeout(() => router.push('/student/my-courses'), 300); },
        }]}
        checkoutCount={checkoutCount}
      />

      <View style={styles.bottomNavContainer}>
        <View style={styles.bottomNav}>
          {NAV_ITEMS.map(item => {
            const isActive = activeTab === item.key;
            const iconName = item.key === 'chat'
              ? isActive ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline'
              : isActive ? item.icon : `${item.icon}-outline`;

            return (
              <Pressable
                key={item.key}
                onPress={() => handleNavPress(item)}
                style={[styles.navItem, isActive && styles.navItemActive]}
                android_ripple={{ color: 'rgba(255,255,255,0.2)', borderless: true, radius: 28 }}
              >
                <View style={[styles.iconContainer, isActive && styles.iconContainerActive]}>
                  <Ionicons name={iconName} size={24} color={isActive ? '#1E40AF' : '#E0E7FF'} />
                </View>
                {isActive && <View style={styles.activeIndicator} />}
              </Pressable>
            );
          })}
        </View>
      </View>
    </>
  );
}
