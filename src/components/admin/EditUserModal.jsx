import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Button,
  Card,
  Chip,
  Icon,
  Modal,
  Portal,
  RadioButton,
  Snackbar,
  Text,
  TextInput,
} from "react-native-paper";
import { adminService } from "../../services/adminService";
import ConfirmationModal from "../ConfirmationModal";


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
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [confirm, setConfirm] = useState(false);

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
      setSnackbarMsg("Name and email are required");
      setSnackbarVisible(true);
      return;
    }
    setLoading(true);
    try {
      await adminService.updateUser(user.id, {
        name: editedUser.name.trim(),
        email: editedUser.email.trim().toLowerCase(),
        role: editedUser.role,
      });
      setSnackbarMsg("User updated successfully");
      setSnackbarVisible(true);
      onUserUpdated();
      onDismiss();
    } catch (error) {
      setSnackbarMsg(`Failed to update user: ${error.message}`);
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => setConfirm(true);
  const confirmDelete = async () => {
    setLoading(true);
    try {
      await adminService.deleteUser(user.id);
      setSnackbarMsg("User deleted successfully");
      setSnackbarVisible(true);
      onUserUpdated();
      onDismiss();
    } catch (error) {
      setSnackbarMsg(`Failed to delete user: ${error.message}`);
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
      setConfirm(false);
    }
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
          <Card.Title
            title="Edit User"
            subtitle={`ID: ${user.id}`}
            titleStyle={styles.cardTitle}
            subtitleStyle={styles.cardSubtitle}
          />
          <Card.Content>
            {/* User Stats */}
            <View style={styles.statsContainer}>
              <Chip
                icon={
                  ()=><Icon source="book" size={16}   color="#746AEB" />
                }
                compact
                mode="outlined"
                style={styles.statChip}
                textStyle={styles.statChipText}
                
              >
                {user.joinedCourses?.length || 0} Courses
              </Chip>
              <Chip
                icon={
                  ()=><Icon source="heart" size={16}   color="#746AEB" />
                }
                compact
                mode="outlined"
                style={[styles.statChip]}
                textStyle={styles.statChipText}
              >
                {user.favorites?.length || 0} Favorites
              </Chip>
              <Chip
                icon={
                  ()=><Icon source="cart" size={16}   color="#746AEB" />
                }
                compact
                mode="outlined"
                style={styles.statChip}
                textStyle={styles.statChipText}
              >
                {user.wishlist?.length || 0} Wishlist
              </Chip>
            </View>

            {/* Form Fields */}
            <TextInput
              label="Name"
              value={editedUser.name}
              onChangeText={(text) =>
                setEditedUser((prev) => ({ ...prev, name: text }))
              }
              mode="outlined"
              style={styles.input}
              disabled={loading}
              outlineColor="#333"
              activeOutlineColor="#2196F3"
              textColor="#333"
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
              outlineColor="#E0E0E0"
              activeOutlineColor="#2196F3"
              textColor="#333"
            />

            {/* Role Selection */}
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
                  <RadioButton
                    value="student"
                    disabled={loading}
                    color="#2196F3"
                  />
                  <Text style={styles.radioText}>Student</Text>
                </View>
                <View style={styles.radioOption}>
                  <RadioButton
                    value="admin"
                    disabled={loading}
                    color="#2196F3"
                  />
                  <Text style={styles.radioText}>Admin</Text>
                </View>
              </RadioButton.Group>
            </View>
          </Card.Content>

          <Card.Actions style={styles.actions}>
            <Button
              mode="outlined"
              onPress={handleDelete}
              disabled={loading}
              textColor="#F44336"
              style={styles.deleteButton}
            >
              Delete User
            </Button>
            <View style={styles.rightActions}>
              <Button
                mode="outlined"
                onPress={onDismiss}
                disabled={loading}
                style={styles.cancelButton}
              >
                Cancel
              </Button>
              <Button
                mode="contained"
                onPress={handleSave}
                loading={loading}
                disabled={loading}
                style={styles.saveButton}
              >
                Save Changes
              </Button>
            </View>
          </Card.Actions>
        </Card>
      </Modal>
      <ConfirmationModal
        visible={confirm}
        title="Delete user?"
        message={`Delete "${user?.name}"? This cannot be undone.`}
        confirmText="Delete"
        onConfirm={confirmDelete}
        onCancel={() => setConfirm(false)}
        loading={loading}
      />
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
      >
        {snackbarMsg}
      </Snackbar>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modal: {
    padding: 20,
    justifyContent: "center",
  },
  card: {
    maxWidth: 500,
    alignSelf: "center",
    width: "100%",
    backgroundColor: "#FFFFFF",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  cardTitle: {
    color: "#333333",
    fontWeight: "600",
  },
  cardSubtitle: {
    color: "#666666",
  },
  statsContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 20,
    flexWrap: "wrap",
  },
  statChip: {
    backgroundColor: "#F9FAFB",
    borderColor: "#E0E0E0",
  },
  statChipText: {
    color: "#333333",
  },
  input: {
    marginBottom: 16,
    backgroundColor: "#FFFFFF",
  },
  roleSection: {
    marginTop: 8,
  },
  roleTitle: {
    marginBottom: 12,
    color: "#333333",
    fontWeight: "600",
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  radioText: {
    marginLeft: 8,
    color: "#333333",
  },
  actions: {
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 8,
  },
  rightActions: {
    flexDirection: "row",
    gap: 12,
  },
  deleteButton: {
    borderColor: "#F44336",
  },
  cancelButton: {
    backgroundColor: "#999",
    borderColor: "#E0E0E0",

  },
  saveButton: {
    backgroundColor: "#2196F3",
  },
});
