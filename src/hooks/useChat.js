import { useState, useEffect, useCallback } from "react";
import { courseService, fetchJoinedCourses } from "../services/courseService.js";
import { chatWithAI } from "../services/aiService.js";
import { loadChatFromStorage, saveChatToStorage, clearChatStorage } from "../services/storageService.js";
import { useAuth } from "../context/AuthContext.jsx";

export function useChat() {
  const { user } = useAuth();
  const userId = user?.id || "guest";
  const userName = user?.name || "Guest";

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [joinedCourses, setJoinedCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);

  const getWelcomeMessage = useCallback(() => ({
    text: `Hello ${userName}👋! I'm your learning assistant! How can I help you choose your next course?`,
    sender: "ai",
    timestamp: Date.now(),
  }), [userName]);

  const loadChat = useCallback(async () => {
    const saved = await loadChatFromStorage(userId);
    if (saved) setMessages(saved);
    else {
      const welcome = getWelcomeMessage();
      setMessages([welcome]);
      await saveChatToStorage(userId, [welcome]);
    }
  }, [userId, getWelcomeMessage]);

  const loadCourses = useCallback(async () => {
    const joined = await fetchJoinedCourses(userId); // Array of joined course IDs
    const all = await courseService.getAllCourses(); // Array of all course objects

    setJoinedCourses(joined);

    // نحول كل الكورسات لمعلومات مفيدة للـ AI
    const allCourseInfo = all.map(c => ({
      id: c.id,
      title: c.title,
      description: c.description,
      instructor: c.instructor,
      price: c.price,
      category: c.category,
    }));

    setAllCourses(allCourseInfo);
  }, [userId]);

  const clearChat = async () => {
    const welcome = getWelcomeMessage();
    const data = await clearChatStorage(userId, welcome);
    setMessages(data);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { text: input, sender: "user", timestamp: Date.now() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const aiReply = await chatWithAI({ message: userMsg.text, joinedCourses, allCourses });
      const aiMsg = { text: aiReply, sender: "ai", timestamp: Date.now() };
      const updatedMessages = [...newMessages, aiMsg];
      setMessages(updatedMessages);
      await saveChatToStorage(userId, updatedMessages);
    } catch {
      const errorMsg = { text: "Sorry, I couldn't respond.", sender: "ai", timestamp: Date.now() };
      const updatedMessages = [...newMessages, errorMsg];
      setMessages(updatedMessages);
      await saveChatToStorage(userId, updatedMessages);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadChat();
    loadCourses();
  }, [user]);

  return { messages, input, setInput, handleSend, clearChat, loading };
}
