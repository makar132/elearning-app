import { Stack } from 'expo-router';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';
import { AuthProvider } from '../src/context/AuthContext';
import { store } from '../src/redux/store';
import { StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';

export default function RootLayout() {
  return (
    <ReduxProvider store={store}>
      <PaperProvider>
        <AuthProvider>
          <View style={styles.container}>
            <Stack screenOptions={{ headerShown: false }} style={styles.stack}>
              <Stack.Screen name="index" />
              <Stack.Screen name="onboarding" />
              <Stack.Screen name="(auth)" />
              <Stack.Screen name="(student)" />
              <Stack.Screen name="(instructor)" />
              <Stack.Screen name="(admin)" />
            </Stack>
            <Toast />
          </View>
        </AuthProvider>
      </PaperProvider>
    </ReduxProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  stack: { flex: 1 },
});
