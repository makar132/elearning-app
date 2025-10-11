import { StyleSheet } from 'react-native';

export const authColors = {
  primary: '#6366F1', // Indigo color
  secondary: '#1F2937', // Dark gray
  text: '#374151',
  textLight: '#6B7280',
  background: '#FFFFFF',
  border: '#E2E8F0',
  link: '#6366F1',
};

export const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: authColors.background,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  backButton: {
    marginLeft: -12,
    marginBottom: 20,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: authColors.secondary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: authColors.textLight,
    lineHeight: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: authColors.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: authColors.background,
    fontSize: 14,
  },
  radioContainer: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 8,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  radioLabel: {
    fontSize: 14,
    color: authColors.text,
    marginLeft: 8,
  },
  button: {
    backgroundColor: authColors.primary,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 24,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  footerText: {
    fontSize: 14,
    color: authColors.textLight,
  },
  footerLink: {
    fontSize: 14,
    color: authColors.link,
    fontWeight: '600',
  },
});