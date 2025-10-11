import * as SecureStore from 'expo-secure-store';
import AsyncStorage from "@react-native-async-storage/async-storage";
export const saveToken = (token) => SecureStore.setItemAsync('authToken', token);
export const getToken = () => SecureStore.getItemAsync('authToken');

// Ai Chat storage service
/**
 * load conversation  
 */
export const loadChatFromStorage = async (userId) => {
  try {
    const saved = await AsyncStorage.getItem(`chat_${userId}`);
    return saved ? JSON.parse(saved) : null;
  } catch (err) {
    console.error("Error loading chat:", err);
    return null;
  }
};

/**
 * save conversation in AsyncStorage
 */
export const saveChatToStorage = async (userId, messages) => {
  try {
    await AsyncStorage.setItem(`chat_${userId}`, JSON.stringify(messages));
  } catch (err) {
    console.error("Error saving chat:", err);
  }
};

/**
 * clear conversation (reset)
 */
export const clearChatStorage = async (userId, welcomeMessage) => {
  try {
    const data = [welcomeMessage];
    await AsyncStorage.setItem(`chat_${userId}`, JSON.stringify(data));
    return data;
  } catch (err) {
    console.error("Error clearing chat:", err);
    return [];
  }
};

