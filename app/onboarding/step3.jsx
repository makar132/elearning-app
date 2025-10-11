import { router } from "expo-router";
import LottieView from "lottie-react-native";
import { View } from "react-native";
import { Button, IconButton, Text } from "react-native-paper";
import { useDispatch } from "react-redux";
import { completeOnboarding } from "../../src/redux/onboardingSlice";
import {
  colors,
  onboardingStyles as styles,
} from "../../src/utils/onboardingStyles";

export default function Onboarding3() {
  const dispatch = useDispatch();
  const handleComplete = async () => {
    await dispatch(completeOnboarding());
    router.replace("/auth");
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.onboarding3 }]}>
      <Button
        mode="text"
        onPress={handleComplete} // Skip to auth
        style={styles.skipButton}
        textColor={colors.skipText}
      >
        SKIP
      </Button>

      <IconButton
        icon="arrow-left"
        size={24}
        style={styles.backButton}
        iconColor={colors.skipText}
        onPress={() => router.back()}
      />

      <View style={styles.animationContainer}>
        <LottieView
          source={require("../../assets/animations/onboarding3.json")}
          autoPlay
          loop
          style={styles.animation}
        />
      </View>

      <View style={styles.textContainer}>
        <Text variant="headlineMedium" style={styles.title}>
          Start Your Learning Journey Now
        </Text>
        <Text variant="bodyLarge" style={styles.description}>
          Join thousands of learners and shoppers today
        </Text>
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.pagination}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={[styles.dot, styles.activeDot]} />
        </View>

        <Button
          mode="contained"
          onPress={handleComplete}
          style={styles.button}
          contentStyle={styles.buttonContent}
        >
          GET STARTED
        </Button>
      </View>
    </View>
  );
}
