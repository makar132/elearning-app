import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function OnboardingScreen() {
  const router = useRouter();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to ELearning App!</Text>
      <Button title="Get Started" onPress={() => router.push('/onboarding/complete')} />
    </View>
  );
}
