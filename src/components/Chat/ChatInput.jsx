import React from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";

export default function ChatInput({ input, setInput, onSend }) {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Ask something..."
        value={input}
        onChangeText={setInput}
      />
      <TouchableOpacity style={styles.sendBtn} onPress={onSend}>
        <Text style={styles.sendText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: { flexDirection: "row", alignItems: "center", marginTop: 5 },
  input: { flex: 1, borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 8, backgroundColor: "#fff" },
  sendBtn: { marginLeft: 8, backgroundColor: "#1E3A8A", padding: 10, borderRadius: 8 },
  sendText: { color: "#fff", fontWeight: "bold" },
});
