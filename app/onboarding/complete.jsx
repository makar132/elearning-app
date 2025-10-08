import React from 'react';
import { View } from 'react-native';
import { Text, Button, IconButton } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import { router } from 'expo-router';
import { onboardingStyles as styles, colors } from '../../src/utils/onboardingStyles';

const Onboarding4 = () => {
  return (
    <View style={[styles.container, { backgroundColor: colors.onboarding4 }]}>
      {/* Back Button */}
      <IconButton
        icon="arrow-left"
        size={24}
        iconColor={colors.primary}
        onPress={() => router.back()}
        style={styles.backButton}
      />

      {/* Lottie Animation */}
      <View style={styles.animationContainerWithPadding}>
        <LottieView
          source={require('../../assets/animations/onboarding4.json')}
          autoPlay
          loop
          style={styles.smallAnimation}
        />
      </View>

      {/* Text Content */}
      <View style={styles.textContainerCentered}>
        <Text style={styles.title} variant="headlineMedium">
          Join Edu Hub To{'\n'}KickStart Your Lesson
        </Text>
        <Text style={styles.description} variant="bodyMedium">
          Lorem ipsum dolor sit amet a{'\n'}aconsectetur. Ut proin accumsan be
        </Text>
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomContainer}>
        {/* Dots */}
        <View style={styles.pagination}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={[styles.dot, styles.activeDot]} />
        </View>

        {/* Sign In Button */}
        <Button
          mode="contained"
          onPress={() => router.push('/(auth)/login')}
          style={styles.signInButton}
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonText}
        >
          SIGN IN
        </Button>

        {/* Sign Up Button */}
        <Button
          mode="outlined"
          onPress={() => router.push('/(auth)/register')}
          style={styles.signUpButton}
          contentStyle={styles.buttonContent}
          labelStyle={styles.signUpButtonText}
        >
          SIGN UP
        </Button>
      </View>
    </View>
  );
};

export default Onboarding4;