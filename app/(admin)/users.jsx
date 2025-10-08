import { useEffect, useState } from "react";
import {
    Alert,
    RefreshControl,
    ScrollView,
    StyleSheet,
    View,
} from "react-native";
import { ActivityIndicator, FAB, Snackbar, Text } from "react-native-paper";
import EditUserModal from "../../src/components/admin/EditUserModal";
import UserTable from "../../src/components/admin/UserTable";
import { adminService } from "../../src/services/adminService";

export default function UsersScreen() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");

  const loadUsers = async (isRefresh = false) => {
    try {
      if (isRefresh) setRefreshing(true);
      else setLoading(true);
      const data = await adminService.getAllUsers();
      setUsers(data);
    } catch (error) {
      Alert.alert("Error", "Failed to load users: " + error.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const onRefresh = () => loadUsers(true);

  const onEditUser = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const onUserUpdated = () => {
    setModalVisible(false);
    setSelectedUser(null);
    loadUsers();
    setSnackbarMsg("User updated successfully");
    setSnackbarVisible(true);
  };

  return (
    <View style={styles.container}>
      {loading && !refreshing ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#2196F3" />
          <Text style={styles.loadingText}>Loading users...</Text>
        </View>
      ) : (
        <ScrollView
          style={styles.scroll}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {/* Header */}
          <View style={styles.header}>
            <Text variant="headlineMedium" style={styles.title}>
              Users
            </Text>
            <Text variant="bodyMedium" style={styles.subtitle}>
              {users.length} total users
            </Text>
          </View>

          <UserTable
            users={users}
            onEditUser={onEditUser}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            roleFilter={roleFilter}
            onRoleChange={setRoleFilter}
            loading={loading}
          />

          <View style={styles.bottomSpacing} />
        </ScrollView>
      )}

      <FAB
        icon="account-plus"
        label="Add User"
        onPress={() =>
          Alert.alert(
            "Coming Soon",
            "User creation feature will be available soon."
          )
        }
        style={styles.fab}
      />

      <EditUserModal
        visible={modalVisible}
        onDismiss={() => {
          setModalVisible(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
        onUserUpdated={onUserUpdated}
      />

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        style={styles.snackbar}
      >
        {snackbarMsg}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scroll: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  loadingText: {
    marginTop: 16,
    color: "#666666",
  },
  header: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  title: {
    color: "#2196F3",
    fontWeight: "600",
    marginBottom: 4,
  },
  subtitle: {
    color: "#666666",
  },
  bottomSpacing: {
    height: 80,
  },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 16,
    backgroundColor: "#2196F3",
  },
  snackbar: {
    backgroundColor: "#4CAF50",
  },
});
