import { Stack } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import BottomNav from '../../src/components/BottomNavigation/BottomNavigation';

export default function StudentLayout({ children }) {
  return (
    <View style={styles.container}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="dashboard" />
        <Stack.Screen name="favorites" />
        <Stack.Screen name="my-courses" />
        <Stack.Screen name="course-details" />
      </Stack>

      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
});
