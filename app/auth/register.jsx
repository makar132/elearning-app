import { router } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, ScrollView, TouchableOpacity, View } from 'react-native';
import { Button, IconButton, Text, TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { register } from '../../src/services/authService';
import { authColors, authStyles } from '../../src/utils/authStyles';

const SignUp = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('student');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!]).{8,}$/;

  // Validation error states
  const [fullNameError, setFullNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const validateFullName = (text) => {
    setFullName(text);
    setFullNameError(text.trim() ? '' : 'Full name is required');
  };

  const validateEmail = (text) => {
    setEmail(text);
    if (!text) setEmailError('Email is required');
    else if (!emailRegex.test(text)) setEmailError('Email format is invalid');
    else setEmailError('');
  };

  const validatePassword = (text) => {
    setPassword(text);
    if (!text) setPasswordError('Password is required');
    else if (!passwordRegex.test(text))
      setPasswordError('Password must include uppercase, lowercase, number, special char, min 8 chars');
    else setPasswordError('');
  };

  const validateConfirmPassword = (text) => {
    setConfirmPassword(text);
    if (!text) setConfirmPasswordError('Confirm password is required');
    else if (text !== password) setConfirmPasswordError('Passwords do not match');
    else setConfirmPasswordError('');
  };

  const handleSignUp = async () => {
    validateFullName(fullName);
    validateEmail(email);
    validatePassword(password);
    validateConfirmPassword(confirmPassword);

    if (
      fullNameError ||
      emailError ||
      passwordError ||
      confirmPasswordError
    ) {
      return;
    }

    setLoading(true);
    try {
      const result = await register({ fullName, email, password, role });
      setLoading(false);
      if (result.success) {
        router.replace('/auth/login');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Sign up failed. Please try again.',
          text2: result.error,
          position: 'bottom',
        });
      }
    } catch (error) {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Error occurred. Please try again.',
        text2: error.message,
        position: 'bottom',
      });
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={authColors.primary} />
      </View>
    );
  }

  return (
    <ScrollView style={authStyles.container} showsVerticalScrollIndicator={false}>
      <IconButton
        icon="arrow-left"
        size={24}
        iconColor={authColors.secondary}
        onPress={() => router.back()}
        style={authStyles.backButton}
      />

      <View style={authStyles.header}>
        <Text style={authStyles.title}>Sign Up</Text>
        <Text style={authStyles.subtitle}>Start your learning journey now!</Text>
      </View>

      <View style={authStyles.inputContainer}>
        <Text style={authStyles.label}>Full Name</Text>
        <TextInput
          mode="outlined"
          placeholder="Your Name Here"
          value={fullName}
          onChangeText={validateFullName}
          onBlur={() => validateFullName(fullName)}
          style={[authStyles.input, fullNameError ? { borderColor: 'red' } : null]}
          outlineColor="#E2E8F0"
          activeOutlineColor={authColors.primary}
        />
        {!!fullNameError && <Text style={{ color: 'red', marginTop: 5 }}>{fullNameError}</Text>}
      </View>

      <View style={authStyles.inputContainer}>
        <Text style={authStyles.label}>Email Here</Text>
        <TextInput
          mode="outlined"
          placeholder="Contact@gmail.com"
          value={email}
          onChangeText={validateEmail}
          onBlur={() => validateEmail(email)}
          keyboardType="email-address"
          autoCapitalize="none"
          style={[authStyles.input, emailError ? { borderColor: 'red' } : null]}
          outlineColor="#E2E8F0"
          activeOutlineColor={authColors.primary}
        />
        {!!emailError && <Text style={{ color: 'red', marginTop: 5 }}>{emailError}</Text>}
      </View>

      <View style={authStyles.inputContainer}>
        <Text style={authStyles.label}>Password</Text>
        <TextInput
          mode="outlined"
          placeholder="••••••••••••••••"
          value={password}
          onChangeText={validatePassword}
          onBlur={() => validatePassword(password)}
          secureTextEntry={!showPassword}
          style={[authStyles.input, passwordError ? { borderColor: 'red' } : null]}
          outlineColor="#E2E8F0"
          activeOutlineColor={authColors.primary}
          right={
            <TextInput.Icon
              icon={showPassword ? 'eye-off' : 'eye'}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
        />
        {!!passwordError && <Text style={{ color: 'red', marginTop: 5 }}>{passwordError}</Text>}
      </View>

      <View style={authStyles.inputContainer}>
        <Text style={authStyles.label}>Confirm Password</Text>
        <TextInput
          mode="outlined"
          placeholder="••••••••••••••••"
          value={confirmPassword}
          onChangeText={validateConfirmPassword}
          onBlur={() => validateConfirmPassword(confirmPassword)}
          secureTextEntry={!showConfirmPassword}
          style={[authStyles.input, confirmPasswordError ? { borderColor: 'red' } : null]}
          outlineColor="#E2E8F0"
          activeOutlineColor={authColors.primary}
          right={
            <TextInput.Icon
              icon={showConfirmPassword ? 'eye-off' : 'eye'}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          }
        />
        {!!confirmPasswordError && <Text style={{ color: 'red', marginTop: 5 }}>{confirmPasswordError}</Text>}
      </View>

      <Button
        mode="contained"
        onPress={handleSignUp}
        style={authStyles.button}
        contentStyle={authStyles.buttonContent}
        labelStyle={authStyles.buttonLabel}
      >
        SIGN UP
      </Button>

      <View style={[authStyles.footer, { marginBottom: 30 }]}>
        <Text style={authStyles.footerText}>{"Already have an account?"}</Text>
        <TouchableOpacity onPress={() => router.replace('/auth/login')}>
          <Text style={authStyles.footerLink}>Sign In Here</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SignUp;
