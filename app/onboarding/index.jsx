import React from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import { router } from 'expo-router';
import { onboardingStyles as styles, colors } from '../../src/utils/onboardingStyles';

const Onboarding1 = () => {
  return (
    <View style={[styles.container, { backgroundColor: colors.onboarding1 }]}>
      {/* Skip Button */}
      <Button
        mode="text"
        onPress={() => router.replace('/(student)/dashboard')}
        style={styles.skipButton}
        textColor={colors.skipText}
      >
        SKIP
      </Button>

      {/* Animation */}
      <View style={styles.animationContainer}>
        <LottieView
          source={require('../../assets/animations/onboarding1.json')}
          autoPlay
          loop
          style={styles.animation}
        />
      </View>

      {/* Text Content */}
      <View style={styles.textContainer}>
        <Text variant="headlineMedium" style={styles.title}>
          Shop & Learn in One Place
        </Text>
        <Text variant="bodyLarge" style={styles.description}>
          Discover amazing products and expert courses all in one platform
        </Text>
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomContainer}>
        {/* Dots */}
        <View style={styles.pagination}>
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        {/* Continue Button */}
        <Button
          mode="contained"
          onPress={() => router.push('/onboarding/step2')}
          style={styles.button}
          contentStyle={styles.buttonContent}
        >
          CONTINUE
        </Button>
      </View>
    </View>
  );
};

export default Onboarding1;