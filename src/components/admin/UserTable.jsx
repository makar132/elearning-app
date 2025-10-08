import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
    Button,
    Card,
    Chip,
    DataTable,
    IconButton,
    Menu,
    Searchbar,
    Text,
} from "react-native-paper";
import { getRoleDisplayName } from "../../utils/permissions";

export default function UserTable({
  users,
  onEditUser,
  searchQuery,
  onSearchChange,
  roleFilter,
  onRoleChange,
  loading,
}) {
  const [menuVisible, setMenuVisible] = React.useState(false);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getRoleColor = (role) => (role === "admin" ? "#D32F2F" : "#388E3C");

  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.header}>
          <Text variant="titleLarge">User Management</Text>
          <Text style={styles.subtitle}>
            {filteredUsers.length} of {users.length} users
          </Text>
        </View>

        <Searchbar
          placeholder="Search users by name or email"
          onChangeText={onSearchChange}
          value={searchQuery}
          style={styles.searchbar}
          editable={!loading}
        />

        <View style={styles.filterContainer}>
          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <Button
                mode="outlined"
                onPress={() => setMenuVisible(true)}
                compact
                icon="filter"
                disabled={loading}
              >
                {roleFilter === "all"
                  ? "All Roles"
                  : getRoleDisplayName(roleFilter)}
              </Button>
            }
          >
            <Menu.Item
              title="All Roles"
              onPress={() => {
                onRoleChange("all");
                setMenuVisible(false);
              }}
            />
            <Menu.Item
              title="Students"
              onPress={() => {
                onRoleChange("student");
                setMenuVisible(false);
              }}
            />
            <Menu.Item
              title="Admins"
              onPress={() => {
                onRoleChange("admin");
                setMenuVisible(false);
              }}
            />
          </Menu>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <DataTable style={styles.table}>
            <DataTable.Header>
              <DataTable.Title style={styles.nameColumn}>Name</DataTable.Title>
              <DataTable.Title style={styles.roleColumn}>Role</DataTable.Title>
              <DataTable.Title numeric style={styles.statsColumn}>
                Courses
              </DataTable.Title>
              <DataTable.Title numeric style={styles.statsColumn}>
                Favorites
              </DataTable.Title>
              <DataTable.Title numeric style={styles.statsColumn}>
                Wishlist
              </DataTable.Title>
              <DataTable.Title style={styles.actionColumn}>
                Actions
              </DataTable.Title>
            </DataTable.Header>

            {filteredUsers.map((user) => (
              <DataTable.Row key={user.id} style={styles.row}>
                <DataTable.Cell style={styles.nameColumn}>
                  <View>
                    <Text variant="bodyMedium">{user.name}</Text>
                    <Text style={styles.email} variant="bodySmall">
                      {user.email}
                    </Text>
                  </View>
                </DataTable.Cell>
                <DataTable.Cell style={styles.roleColumn}>
                  <Chip
                    compact
                    mode="outlined"
                    textStyle={{ color: getRoleColor(user.role) }}
                    style={{ borderColor: getRoleColor(user.role) }}
                  >
                    {getRoleDisplayName(user.role)}
                  </Chip>
                </DataTable.Cell>
                <DataTable.Cell numeric style={styles.statsColumn}>
                  {user.joinedCoursesCount || 0}
                </DataTable.Cell>
                <DataTable.Cell numeric style={styles.statsColumn}>
                  {user.favoritesCount || 0}
                </DataTable.Cell>
                <DataTable.Cell numeric style={styles.statsColumn}>
                  {user.wishlistCount || 0}
                </DataTable.Cell>
                <DataTable.Cell style={styles.actionColumn}>
                  <IconButton
                    icon="pencil"
                    size={20}
                    onPress={() => onEditUser(user)}
                    iconColor="#1976D2"
                    disabled={loading}
                  />
                </DataTable.Cell>
              </DataTable.Row>
            ))}

            {filteredUsers.length === 0 && (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  No users found matching the criteria.
                </Text>
              </View>
            )}
          </DataTable>
        </ScrollView>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { margin: 16 },
  header: { marginBottom: 16 },
  subtitle: { color: "#666", marginTop: 4 },
  searchbar: { marginBottom: 12 },
  filterContainer: { flexDirection: "row", marginBottom: 16 },
  table: { minWidth: 700 },
  nameColumn: { flex: 2, minWidth: 200 },
  roleColumn: { flex: 1, minWidth: 100 },
  statsColumn: { flex: 0.5, minWidth: 80 },
  actionColumn: { flex: 0.5, minWidth: 60 },
  row: { borderBottomWidth: 1, borderBottomColor: "#eee" },
  email: { color: "#888", marginTop: 2 },
  emptyContainer: { padding: 40, alignItems: "center" },
  emptyText: { color: "#999", textAlign: "center" },
});
