import { router } from "expo-router";
import LottieView from "lottie-react-native";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import {
    colors,
    onboardingStyles as styles,
} from "../../src/utils/onboardingStyles";

export default function AuthIndex() {
  return (
    <View style={[styles.container, { backgroundColor: colors.onboarding4 }]}>
      <View style={styles.animationContainerWithPadding}>
        <LottieView
          source={require("../../assets/animations/onboarding4.json")}
          autoPlay
          loop
          style={styles.smallAnimation}
        />
      </View>

      <View style={styles.textContainerCentered}>
        <Text variant="headlineMedium" style={styles.title}>
          Join Edu Hub To{"\n"}KickStart Your Lesson
        </Text>
        <Text variant="bodyMedium" style={styles.description}>
          Lorem ipsum dolor sit amet a{"\n"}aconsectetur. Ut proin accumsan be
        </Text>
      </View>

      <View style={styles.bottomContainer}>
        <Button
          mode="contained"
          onPress={() => router.push("/auth/login")}
          style={styles.signInButton}
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonText}
        >
          SIGN IN
        </Button>

        <Button
          mode="outlined"
          onPress={() => router.push("/auth/register")}
          style={styles.signUpButton}
          contentStyle={styles.buttonContent}
          labelStyle={styles.signUpButtonText}
        >
          SIGN UP
        </Button>
      </View>
    </View>
  );
}
