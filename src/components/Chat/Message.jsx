import React, { useEffect, useRef } from "react";
import { Animated, Text, StyleSheet } from "react-native";

export default function Message({ message }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const time = new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <Animated.View style={[
      styles.message,
      message.sender === "user" ? styles.userMsg : styles.aiMsg,
      { opacity: fadeAnim }
    ]}>
      <Text style={styles.text}>{message.text}</Text>
      <Text style={styles.timestamp}>{time}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  message: { padding: 10, borderRadius: 10, marginVertical: 5, maxWidth: "80%" },
  userMsg: { alignSelf: "flex-end", backgroundColor: "#2c4fb1ff" },
  aiMsg: { alignSelf: "flex-start", backgroundColor: "#e0e0e0" },
  text: { color: "#000" },
  timestamp: { fontSize: 10, color: "#252525ff", marginTop: 2, textAlign: "right" },
});
