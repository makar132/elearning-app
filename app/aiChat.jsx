"use client";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useEffect, useRef } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import ChatInput from "../src/components/Chat/ChatInput.jsx";
import Message from "../src/components/Chat/Message.jsx";
import { useAuth } from "../src/context/AuthContext.jsx";
import { useChat } from "../src/hooks/useChat.js";

export default function AiChatScreen() {
  const { user, isLoading } = useAuth();
  const { messages, input, setInput, handleSend, clearChat, loading } =
    useChat();
  const flatListRef = useRef();

  useEffect(() => {
    if (messages.length > 0) {
      flatListRef.current?.scrollToEnd({ animated: true });
    }
  }, [messages]);
  useEffect(() => {
    console.log("Auth loading:", isLoading, "User:", user);
  }, [isLoading, user]);

  //while loading user auth state show a loading indicator
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text>Loading user&apos;s data…</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>
          💬 {`${user?.name || "Guest"}'s Chat`}
        </Text>
        <TouchableOpacity style={styles.clearBtn} onPress={clearChat}>
          <MaterialIcons name="delete" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => <Message message={item} />}
        contentContainerStyle={{ paddingVertical: 10 }}
      />

      {loading && <Text style={styles.typing}>AI is typing...</Text>}

      <ChatInput input={input} setInput={setInput} onSend={handleSend} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9", padding: 10 },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  header: { fontWeight: "bold", fontSize: 18 },
  clearBtn: { backgroundColor: "#4869c2ff", padding: 4, borderRadius: 6 },
  typing: { textAlign: "center", color: "#999", marginVertical: 5 },
});
