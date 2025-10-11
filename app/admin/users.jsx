import { useMemo, useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { ActivityIndicator, FAB, Snackbar, Text } from "react-native-paper";
import EditUserModal from "../../src/components/admin/EditUserModal";
import UserTable from "../../src/components/admin/UserTable";
import Pagination from "../../src/components/Pagination";
import { useFirestoreCollection } from "../../src/hooks/useFirestoreCollection";
import theme, { Colors } from "../../src/styles/theme";

const PAGE_SIZE = 10;

export default function UsersScreen() {
  // const [users, setUsers] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const { data: users, loading } = useFirestoreCollection("users");

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(users.length / PAGE_SIZE);

  const currentUsers = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return users.slice(start, start + PAGE_SIZE);
  }, [users, currentPage]);

  // const loadUsers = async (isRefresh = false) => {
  //   try {
  //     if (isRefresh) setRefreshing(true);
  //     else setLoading(true);
  //     const data = await adminService.getAllUsers();
  //     setUsers(data);
  //   } catch (error) {
  //     Alert.alert("Error", "Failed to load users: " + error.message);
  //   } finally {
  //     setLoading(false);
  //     setRefreshing(false);
  //   }
  // };

  // useEffect(() => {
  //   loadUsers();
  // }, []);

  // const onRefresh = () => loadUsers(true);

  const onEditUser = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const onUserUpdated = () => {
    setModalVisible(false);
    // loadUsers();
    setSnackbarMsg("User updated successfully");
    setSnackbarVisible(true);
  };
  if (loading) {
    return (
      <View style={theme.container}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text>Loading users...</Text>
        </View>
      </View>
    );
  }
  return (
    <View style={theme.container}>
      <>
        <ScrollView
          style={styles.scroll}
          // refreshControl={
          //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          // }
        >
          {/* <View style={styles.header}>
            <Text variant="headlineLarge">Users</Text>
            <Text variant="bodyMedium">{users.length} total users</Text>
          </View> */}
          <UserTable
            users={currentUsers}
            onEditUser={onEditUser}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            roleFilter={roleFilter}
            onRoleChange={setRoleFilter}
            loading={loading}
          />
        </ScrollView>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </>

      <FAB
        icon="plus"
        label="Add User"
        onPress={() => Alert.alert("Not implemented")}
        style={styles.fab}
      />

      <EditUserModal
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
        user={selectedUser}
        onUserUpdated={onUserUpdated}
      />

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
      >
        {snackbarMsg}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  scroll: { flex: 1 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: { padding: 16, borderBottomWidth: 1, borderBottomColor: "#ddd" },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 16,
    backgroundColor: "#2196F3",
  },
});
