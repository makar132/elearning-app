import * as SecureStore from 'expo-secure-store';
export const saveToken = (token) => SecureStore.setItemAsync('authToken', token);
export const getToken = () => SecureStore.getItemAsync('authToken');
