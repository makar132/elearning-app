import React from 'react';
import { View } from 'react-native';
import { Text, Button, IconButton } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import { router } from 'expo-router';
import { onboardingStyles as styles, colors } from '../../src/utils/onboardingStyles';

const Onboarding3 = () => {
  const handleGetStarted = () => {
    router.push('/onboarding/complete');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.onboarding3 }]}>
      {/* Skip Button */}
      <Button
        mode="text"
        onPress={handleGetStarted}
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
          source={require('../../assets/animations/onboarding3.json')}
          autoPlay
          loop
          style={styles.animation}
        />
      </View>

      {/* Text Content */}
      <View style={styles.textContainer}>
        <Text variant="headlineMedium" style={styles.title}>
          Start Your Journey Now
        </Text>
        <Text variant="bodyLarge" style={styles.description}>
          Join thousands of learners and shoppers today
        </Text>
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomContainer}>
        {/* Dots */}
        <View style={styles.pagination}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
        </View>

        {/* Get Started Button */}
        <Button
          mode="contained"
          onPress={handleGetStarted}
          style={styles.button}
          contentStyle={styles.buttonContent}
        >
          GET STARTED
        </Button>
      </View>
    </View>
  );
};

export default Onboarding3;