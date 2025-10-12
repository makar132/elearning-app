import React from "react";
import { ScrollView, View } from "react-native";
import { Button, Card, Menu, Searchbar, Text } from "react-native-paper";
import { getRoleDisplayName } from "../../../utils/permissions";
import UserTableBody from "./UserTableBody";
import styles from "./UserTableStyle";

export default function UserTable({
  users,
  totalCount,
  filteredCount,
  onEditUser,
  searchQuery,
  onSearchChange,
  roleFilter,
  onRoleChange,
  loading,
}) {
  const [menuVisible, setMenuVisible] = React.useState(false);

  return (
    <Card style={[styles.card, { flex: 1 }]}>
      <Card.Content style={[styles.cardContent, { flex: 1 }]}>
        <View style={styles.header}>
          <Text variant="titleLarge" style={styles.headerTitle}>
            User Management
          </Text>
          <Text style={styles.subtitle}>
            {filteredCount ?? users.length} of {totalCount ?? users.length}{" "}
            users
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
                textColor="#746AEB"
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
          style={{ flex: 1 }}
        >
          <UserTableBody
            users={users}
            onEditUser={onEditUser}
            loading={loading}
          />
        </ScrollView>
      </Card.Content>
    </Card>
  );
}
