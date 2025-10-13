import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../../context/AuthContext";
import styles from "../../utils/BottomNav.styles";
import { useFavorites } from "../../context/FavoritesContext";
import { useCart } from "../../context/CartContext";

const { width } = Dimensions.get("window");
const SIDEBAR_WIDTH = width * 0.55;

const ProfileSidebar = ({ visible, toggleSidebar, handleLogout, menuItems = [], checkoutCount = 0 }) => {
  const { user } = useAuth();
  const { favoriteCourses } = useFavorites();
  const { enrolledCourses } = useCart();

  // ✅ تأكيد إن القيم arrays حتى لو undefined
  const favoritesList = Array.isArray(favoriteCourses) ? favoriteCourses : [];
  const enrolledList = Array.isArray(enrolledCourses) ? enrolledCourses : [];

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={toggleSidebar} statusBarTranslucent>
      <StatusBar backgroundColor="rgba(0,0,0,0.3)" barStyle="dark-content" />

      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={toggleSidebar}>
        <View style={[styles.sidebar, { width: SIDEBAR_WIDTH, position: 'absolute', right: 0 }]}>

          {/* Header */}
          <View style={styles.sidebarHeader}>
            <TouchableOpacity style={styles.closeButton} onPress={toggleSidebar}>
              <Ionicons name="close" size={24} color="#FFFFFF" />
            </TouchableOpacity>

            <View style={styles.profileSection}>
              {user?.photoURL ? (
                <Image source={{ uri: user.photoURL }} style={styles.profileImage} />
              ) : (
                <View style={[styles.profileImage, styles.profileImagePlaceholder]}>
                  <Text style={styles.profileInitial}>{(user?.name || user?.email || "U")[0].toUpperCase()}</Text>
                </View>
              )}
              <View style={styles.userInfo}>
                <Text style={styles.userName} numberOfLines={1}>{user?.name || "User"}</Text>
                <Text style={styles.userEmail} numberOfLines={1}>{user?.email || "user@example.com"}</Text>
              </View>
            </View>
          </View>

          {/* Content */}
          <View style={{ flex: 1, justifyContent: "space-between" }}>
            <ScrollView style={styles.sidebarContent} showsVerticalScrollIndicator={false}>
              {menuItems.map((item, index) => (
                <TouchableOpacity key={index} style={styles.menuItem} onPress={item.onPress} activeOpacity={0.7}>
                  <View style={styles.menuItemContent}>
                    <View style={styles.menuIconContainer}>
                      <Ionicons name={item.icon} size={22} color="#1E40AF" />
                    </View>
                    <Text style={styles.menuItemText}>{item.title}</Text>
                  </View>
                </TouchableOpacity>
              ))}
              {/* My Courses */}
              <TouchableOpacity
                style={[styles.menuItem, { marginTop: 20 }]}
                onPress={() => {
                  toggleSidebar();
                  setTimeout(() => router.push("/student/my-courses"), 300);
                }}
                activeOpacity={0.7}
              >
                <View style={styles.menuItemContent}>
                  <View style={[styles.menuIconContainer, { position: "relative" }]}>
                    <Ionicons name="book-outline" size={22} color="#1E40AF" />
                    {enrolledList.length > 0 && (
                      <View style={styles.cartIconBadge}>
                        <Text style={styles.cartIconBadgeText}>{enrolledList.length}</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.menuItemText}>My Courses</Text>
                </View>
              </TouchableOpacity>




              {/* Favorites */}
              <TouchableOpacity
                style={[styles.menuItem, { marginTop: 10 }]}
                onPress={() => {
                  toggleSidebar();
                  setTimeout(() => router.push("/student/favorites"), 300);
                }}
                activeOpacity={0.7}
              >
                <View style={styles.menuItemContent}>
                  <View style={[styles.menuIconContainer, { position: "relative" }]}>
                    <Ionicons name="heart-outline" size={22} color="#1E40AF" />
                    {favoritesList.length > 0 && (
                      <View style={styles.cartIconBadge}>
                        <Text style={styles.cartIconBadgeText}>{favoritesList.length}</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.menuText}>Favorites</Text>
                </View>
              </TouchableOpacity>



              {/* Checkout */}
              <TouchableOpacity
                style={[styles.menuItem, { marginTop: 20 }]}
                onPress={() => {
                  toggleSidebar();
                  setTimeout(() => router.push("/student/checkout"), 300);
                }}
                activeOpacity={0.7}
              >
                <View style={styles.menuItemContent}>
                  <View style={[styles.menuIconContainer, { position: "relative" }]}>
                    <Ionicons name="cart-outline" size={22} color="#1E40AF" />
                    {checkoutCount > 0 && (
                      <View style={styles.cartIconBadge}>
                        <Text style={styles.cartIconBadgeText}>{checkoutCount}</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.menuItemText}>Checkout</Text>
                </View>
              </TouchableOpacity>
            </ScrollView>

            {/* Logout */}
            <View style={styles.logoutContainer}>
              <TouchableOpacity onPress={handleLogout} style={styles.logoutButton} activeOpacity={0.7}>
                <Ionicons name="log-out" size={20} color="#DC2626" />
                <Text style={styles.logoutButtonText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default ProfileSidebar;