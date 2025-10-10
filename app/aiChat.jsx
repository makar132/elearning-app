import React, { useEffect, useRef } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useAuth } from "../src/context/AuthContext.jsx";
import { useChat } from "../src/hooks/useChat.js";
import Message from "../src/components/Chat/Message.jsx";
import ChatInput from "../src/components/Chat/ChatInput.jsx";

export default function AiChatScreen() {
    const { user } = useAuth();
    const { messages, input, setInput, handleSend, clearChat, loading } = useChat();
    const flatListRef = useRef();

    useEffect(() => {
        if (messages.length > 0) {
            flatListRef.current?.scrollToEnd({ animated: true });
        }
    }, [messages]);

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>💬 {`${user?.name || "Guest"}'s Chat`}</Text>
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
    headerContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
    header: { fontWeight: "bold", fontSize: 18 },
    clearBtn: { backgroundColor: "#4869c2ff", padding: 4, borderRadius: 6 },
    typing: { textAlign: "center", color: "#999", marginVertical: 5 },
});
