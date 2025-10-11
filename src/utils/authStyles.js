// src/utils/authStyles.js
import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const authColors = {
  primary: '#1B3B6F',   
  secondary: '#1E3A8A', 
  text: '#1F2937',
  textLight: '#64748B',
  background: '#FFFFFF',
  border: '#E2E8F0',
  error: '#EF4444',
  link: '#1B3B6F',
};

export const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: authColors.background,
    paddingHorizontal: 24,
    paddingTop: 80,
  },
  backButton: {
   
    top: 0,
    left:5,
    zIndex: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: authColors.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: authColors.textLight,
    textAlign: 'center',
  },
  input: {
    marginBottom: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: authColors.border,
    backgroundColor: '#F9FAFB',
    paddingVertical: 8,
    paddingHorizontal: 12,
    height: 45,
    color: authColors.text,
  },
  errorText: {
    fontSize: 12,
    color: authColors.error,
    marginTop: -8,
    marginBottom: 8,
  },
  button: {
    width: '100%',
    borderRadius: 8,
    backgroundColor: '#1B3B6F', 
    marginTop: 8,
    marginBottom: 20,
  },
  buttonContent: {
    paddingVertical: 10,
  },
  buttonLabel: {
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.5,
    color: '#FFFFFF',
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  footerText: {
    fontSize: 14,
    color: authColors.textLight,
    marginRight: 6,
  },
  footerLink: {
    fontSize: 14,
    color: authColors.primary,
    fontWeight: '600',
  },
});