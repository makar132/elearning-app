import { useRouter } from 'expo-router';
import { Button, Text, View } from 'react-native';
import { useAuth } from '../../src/context/AuthContext';

export default function Complete() {
  const router = useRouter()
  const { completeOnboarding } = useAuth();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>You&#39;re All Set!</Text>
      <Button title="Continue" onPress={() => router.push('/(student)/')} />
    </View>
  );
}
