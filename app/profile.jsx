import { useRouter } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../src/context/AuthContext";
import { logout } from "../src/services/authService";

export default function Profile() {
  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/auth");
    } catch (error) {
      alert("Error logging out: " + error.message);
    }
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No user is logged in.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.text}>Email: {user.email}</Text>
      {user.displayName && (
        <Text style={styles.text}>Name: {user.displayName}</Text>
      )}
      <View style={styles.buttonContainer}>
        <Button title="Logout" onPress={handleLogout} color="#d9534f" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  text: { fontSize: 18, marginBottom: 10 },
  buttonContainer: { marginTop: 30 },
});
