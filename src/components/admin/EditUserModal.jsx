import { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import {
    Button,
    Card,
    Chip,
    Modal,
    Portal,
    RadioButton,
    Text,
    TextInput,
} from "react-native-paper";
import { adminService } from "../../services/adminService";

export default function EditUserModal({
  visible,
  onDismiss,
  user,
  onUserUpdated,
}) {
  const [editedUser, setEditedUser] = useState({
    name: "",
    email: "",
    role: "student",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setEditedUser({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "student",
      });
    }
  }, [user]);

  const handleSave = async () => {
    if (!editedUser.name.trim() || !editedUser.email.trim()) {
      Alert.alert("Error", "Name and email are required");
      return;
    }
    setLoading(true);
    try {
      await adminService.updateUser(user.id, {
        name: editedUser.name.trim(),
        email: editedUser.email.trim().toLowerCase(),
        role: editedUser.role,
      });
      Alert.alert("Success", "User updated successfully");
      onUserUpdated();
      onDismiss();
    } catch (error) {
      Alert.alert("Error", "Failed to update user: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete User",
      `Are you sure you want to delete ${user?.name}? This cannot be undone.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            setLoading(true);
            try {
              await adminService.deleteUser(user.id);
              Alert.alert("Success", "User deleted successfully");
              onUserUpdated();
              onDismiss();
            } catch (error) {
              Alert.alert("Error", "Failed to delete user: " + error.message);
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  if (!user) return null;

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modal}
      >
        <Card style={styles.card}>
          <Card.Title title="Edit User" subtitle={`ID: ${user.id}`} />
          <Card.Content>
            <View style={styles.statsContainer}>
              <Chip icon="book" compact mode="outlined">
                {user.joinedCoursesCount} Courses
              </Chip>
              <Chip icon="heart" compact mode="outlined">
                {user.favoritesCount} Favorites
              </Chip>
              <Chip icon="bookmark" compact mode="outlined">
                {user.wishlistCount} Wishlist
              </Chip>
            </View>

            <TextInput
              label="Name"
              value={editedUser.name}
              onChangeText={(text) =>
                setEditedUser((prev) => ({ ...prev, name: text }))
              }
              mode="outlined"
              style={styles.input}
              disabled={loading}
            />
            <TextInput
              label="Email"
              value={editedUser.email}
              onChangeText={(text) =>
                setEditedUser((prev) => ({ ...prev, email: text }))
              }
              keyboardType="email-address"
              autoCapitalize="none"
              mode="outlined"
              style={styles.input}
              disabled={loading}
            />

            <View style={styles.roleSection}>
              <Text variant="titleMedium" style={styles.roleTitle}>
                Role
              </Text>
              <RadioButton.Group
                onValueChange={(value) =>
                  setEditedUser((prev) => ({ ...prev, role: value }))
                }
                value={editedUser.role}
              >
                <View style={styles.radioOption}>
                  <RadioButton value="student" disabled={loading} />
                  <Text>Student</Text>
                </View>
                <View style={styles.radioOption}>
                  <RadioButton value="admin" disabled={loading} />
                  <Text>Admin</Text>
                </View>
              </RadioButton.Group>
            </View>
          </Card.Content>
          <Card.Actions style={styles.actions}>
            <Button
              mode="outlined"
              onPress={handleDelete}
              disabled={loading}
              textColor="#f44336"
            >
              Delete User
            </Button>
            <View style={styles.rightActions}>
              <Button mode="outlined" onPress={onDismiss} disabled={loading}>
                Cancel
              </Button>
              <Button
                mode="contained"
                onPress={handleSave}
                loading={loading}
                disabled={loading}
              >
                Save
              </Button>
            </View>
          </Card.Actions>
        </Card>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modal: { padding: 20 },
  card: { maxWidth: 500, alignSelf: "center", width: "100%" },
  statsContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
    flexWrap: "wrap",
  },
  input: { marginBottom: 12 },
  roleSection: { marginTop: 8 },
  roleTitle: { marginBottom: 8 },
  radioOption: { flexDirection: "row", alignItems: "center", marginBottom: 4 },
  actions: {
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  rightActions: { flexDirection: "row", gap: 8 },
});
