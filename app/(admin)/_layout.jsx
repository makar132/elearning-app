import { Tabs } from 'expo-router';

export default function AdminLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="dashboard" />
      <Tabs.Screen name="users" />
      <Tabs.Screen name="courses" />
    </Tabs>
  );
}
