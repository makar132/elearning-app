import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const onboardingStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slideContainer: {
    flex: 1,
    width: width,
  },
  skipButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 10,
    zIndex: 10,
  },
  animationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    maxHeight: height * 0.5,
    marginTop: 80,
  },
  animationContainerWithPadding: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    maxHeight: height * 0.5,
    paddingTop: 60,
  },
  animation: {
    width: width * 0.8,
    height: width * 0.8,
  },
  smallAnimation: {
    width: width * 0.75,
    height: width * 0.75,
  },
  textContainer: {
    flex: 0.4,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  textContainerCentered: {
    flex: 0.4,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 40,
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#1E3A8A',
  },
  description: {
    textAlign: 'center',
    color: '#64748B',
    lineHeight: 24,
  },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  pagination: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#1E3A8A',
    marginHorizontal: 4,
    opacity: 0.3,
  },
  activeDot: {
    width: 20,
    opacity: 1,
  },
  button: {
    width: '100%',
    borderRadius: 8,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  signInButton: {
    width: '100%',
    borderRadius: 8,
    backgroundColor: '#1B3B6F',
    marginBottom: 12,
  },
  signUpButton: {
    width: '100%',
    borderColor: '#1B3B6F',
    borderWidth: 2,
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  signUpButtonText: {
    color: '#1B3B6F',
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});

export const colors = {
  onboarding1: '#E0F2FE',
  onboarding2: '#DBEAFE',
  onboarding3: '#BFDBFE',
  onboarding4: '#F5F5F5',
  skipText: '#64748B',
  primary: '#1E3A8A',
  secondary: '#1B3B6F',
};