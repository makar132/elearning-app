import { View } from "react-native";
import { Chip, DataTable, IconButton, Text } from "react-native-paper";
import { getRoleDisplayName } from "../../../utils/permissions";
import styles from "./UserTableStyle";

export default function UserTableBody({ users, onEditUser, loading }) {
  const getRoleColor = (role) => (role === "admin" ? "#D32F2F" : "#4CAF50");

  return (
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

      {users.map((user) => (
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
              {Array.isArray(user.joinedCourses)
                ? user.joinedCourses.length
                : 0}
            </Text>
          </DataTable.Cell>
          <DataTable.Cell numeric style={styles.statsColumn}>
            <Text style={styles.statsText}>
              {Array.isArray(user.favorites) ? user.favorites.length : 0}
            </Text>
          </DataTable.Cell>
          <DataTable.Cell numeric style={styles.statsColumn}>
            <Text style={styles.statsText}>
              {Array.isArray(user.wishlist) ? user.wishlist.length : 0}
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

      {!loading && users.length === 0 && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            No users found matching the criteria.
          </Text>
        </View>
      )}
    </DataTable>
  );
}
