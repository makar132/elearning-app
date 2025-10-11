import { router } from "expo-router";
import LottieView from "lottie-react-native";
import { View } from "react-native";
import { Button, IconButton, Text } from "react-native-paper";
import {
  colors,
  onboardingStyles as styles,
} from "../../src/utils/onboardingStyles";

import { useDispatch } from "react-redux";
import { completeOnboarding } from "../../src/redux/onboardingSlice";

const Onboarding2 = () => {
  const dispatch = useDispatch();

  return (
    <View style={[styles.container, { backgroundColor: colors.onboarding2 }]}>
      {/* Skip Button */}
      <Button
        mode="text"
        onPress={async () => {
          await dispatch(completeOnboarding());
          router.replace("/auth");
        }}
        style={styles.skipButton}
        textColor={colors.skipText}
      >
        SKIP
      </Button>

      {/* Back Button */}
      <IconButton
        icon="arrow-left"
        size={24}
        style={styles.backButton}
        iconColor={colors.skipText}
        onPress={() => router.back()}
      />

      {/* Animation */}
      <View style={styles.animationContainer}>
        <LottieView
          source={require("../../assets/animations/onboarding2.json")}
          autoPlay
          loop
          style={styles.animation}
        />
      </View>

      {/* Text Content */}
      <View style={styles.textContainer}>
        <Text variant="headlineMedium" style={styles.title}>
          Learn From The Best
        </Text>
        <Text variant="bodyLarge" style={styles.description}>
          Access high-quality courses taught by industry experts
        </Text>
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomContainer}>
        {/* Dots */}
        <View style={styles.pagination}>
          <View style={styles.dot} />
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        {/* Continue Button */}
        <Button
          mode="contained"
          onPress={() => router.push("/onboarding/step3")}
          style={styles.button}
          contentStyle={styles.buttonContent}
        >
          CONTINUE
        </Button>
      </View>
    </View>
  );
};

export default Onboarding2;
