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
    console.log("checking user: ", user);
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getRoleColor = (role) => (role === "admin" ? "#D32F2F" : "#4CAF50");

  return (
    <Card style={[styles.card , {flex:1}]}>
      <Card.Content style={[styles.cardContent, { flex: 1 }]}>
        <View style={styles.header}>
          <Text variant="titleLarge" style={styles.headerTitle}>
            User Management
          </Text>
          <Text style={styles.subtitle}>
            {filteredUsers.length} of {users.length} users
          </Text>
        </View>

        <Searchbar
          placeholder="Search users by name or email"
          onChangeText={onSearchChange}
          value={searchQuery}
          style={styles.searchbar}
          inputStyle={styles.searchInput}
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
                style={styles.filterButton}
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

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, width: "100%" }}
          style={{flex:1}}
        >
          <DataTable style={styles.table}>
            <DataTable.Header style={styles.tableHeader}>
              <DataTable.Title
                style={styles.nameColumn}
                textStyle={styles.headerText}
              >
                Name
              </DataTable.Title>
              <DataTable.Title
                style={styles.roleColumn}
                textStyle={styles.headerText}
              >
                Role
              </DataTable.Title>
              <DataTable.Title
                numeric
                style={styles.statsColumn}
                textStyle={styles.headerText}
              >
                Courses
              </DataTable.Title>
              <DataTable.Title
                numeric
                style={styles.statsColumn}
                textStyle={styles.headerText}
              >
                Favorites
              </DataTable.Title>
              <DataTable.Title
                numeric
                style={styles.statsColumn}
                textStyle={styles.headerText}
              >
                Wishlist
              </DataTable.Title>
              <DataTable.Title
                style={styles.actionColumn}
                textStyle={styles.headerText}
              >
                Actions
              </DataTable.Title>
            </DataTable.Header>

            {filteredUsers.map((user) => (
              <DataTable.Row key={user.id} style={styles.row}>
                <DataTable.Cell style={styles.nameColumn}>
                  <View>
                    <Text variant="bodyMedium" style={styles.userName}>
                      {user.name}
                    </Text>
                    <Text style={styles.userEmail} variant="bodySmall">
                      {user.email}
                    </Text>
                  </View>
                </DataTable.Cell>
                <DataTable.Cell style={styles.roleColumn}>
                  <Chip
                    compact
                    mode="outlined"
                    textStyle={{ color: getRoleColor(user.role), fontSize: 12 }}
                    style={[
                      styles.roleChip,
                      { borderColor: getRoleColor(user.role) },
                    ]}
                  >
                    {getRoleDisplayName(user.role)}
                  </Chip>
                </DataTable.Cell>
                <DataTable.Cell numeric style={styles.statsColumn}>
                  <Text style={styles.statsText}>
                    {user.joinedCoursesCount || 0}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell numeric style={styles.statsColumn}>
                  <Text style={styles.statsText}>
                    {user.favoritesCount || 0}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell numeric style={styles.statsColumn}>
                  <Text style={styles.statsText}>
                    {user.wishlistCount || 0}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell style={styles.actionColumn}>
                  <IconButton
                    icon="pencil"
                    size={20}
                    onPress={() => onEditUser(user)}
                    iconColor="#2196F3"
                    disabled={loading}
                    style={styles.editButton}
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
  card: {
    margin: 16,
    backgroundColor: "#FFFFFF",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardContent: {
    padding: 0,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  headerTitle: {
    color: "#333333",
    fontWeight: "600",
  },
  subtitle: {
    color: "#666666",
    marginTop: 4,
  },
  searchbar: {
    margin: 16,
    backgroundColor: "#F9FAFB",
    elevation: 0,
  },
  searchInput: {
    color: "#333333",
  },
  filterContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  filterButton: {
    borderColor: "#E0E0E0",
  },
  table: {
    minWidth: "100%",
    backgroundColor: "#FFFFFF",
  },
  tableHeader: {
    backgroundColor: "#F9FAFB",
  },
  headerText: {
    color: "#333333",
    fontWeight: "600",
  },
  nameColumn: { flex: 2 },
  roleColumn: { flex: 1 },
  statsColumn: { flex: 0.5 },
  actionColumn: { flex: 0.5 },
  row: {
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    paddingVertical: 8,
  },
  userName: {
    color: "#333333",
    fontWeight: "500",
  },
  userEmail: {
    color: "#666666",
    marginTop: 2,
  },
  roleChip: {
    backgroundColor: "#FFFFFF",
  },
  statsText: {
    color: "#333333",
  },
  editButton: {
    margin: 0,
  },
  emptyContainer: {
    padding: 40,
    alignItems: "center",
  },
  emptyText: {
    color: "#666666",
    textAlign: "center",
  },
});
