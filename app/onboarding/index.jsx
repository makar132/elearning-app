import { router } from "expo-router";
import LottieView from "lottie-react-native";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useDispatch } from "react-redux";
import { completeOnboarding } from "../../src/redux/onboardingSlice";
import {
  colors,
  onboardingStyles as styles,
} from "../../src/utils/onboardingStyles";

export default function Onboarding1() {
  const dispatch = useDispatch();
  return (
    <View style={[styles.container, { backgroundColor: colors.onboarding1 }]}>
      <Button
        mode="text"
        onPress={async () => { await dispatch(completeOnboarding()); router.replace("/auth"); }}
        style={styles.skipButton}
        textColor={colors.skipText}
      >
        SKIP
      </Button>

      <View style={styles.animationContainer}>
        <LottieView
          source={require("../../assets/animations/onboarding1.json")}
          autoPlay
          loop
          style={styles.animation}
        />
      </View>

      <View style={styles.textContainer}>
        <Text variant="headlineMedium" style={styles.title}>
          Shop & Learn in One Place
        </Text>
        <Text variant="bodyLarge" style={styles.description}>
          Discover amazing products and expert courses all in one platform
        </Text>
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.pagination}>
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        <Button
          mode="contained"
          onPress={() => router.push("/onboarding/step2")}
          style={styles.button}
          contentStyle={styles.buttonContent}
        >
          CONTINUE
        </Button>
      </View>
    </View>
  );
}
