import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Text, TextInput, Button, IconButton } from 'react-native-paper';
import { router } from 'expo-router';
import { authStyles, authColors } from '../../src/utils/authStyles';
import { register } from '../../src/services/authService';
import Toast from 'react-native-toast-message';

const SignUp = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('student');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);


  // Regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.com+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!]).{8,}$/;

  // State for errors
  const [fullNameError, setFullNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');


  const validateFullName = (text) => {
    setFullName(text);
    if (!text || text.trim().length === 0) {
      setFullNameError("Full name is required");
    } else {
      setFullNameError("");
    }
  };

  const validateEmail = (text) => {
    setEmail(text);
    if (!text) {
      setEmailError("Email is required");
    } else if (!emailRegex.test(text)) {
      setEmailError("Email format is invalid");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (text) => {
    setPassword(text);
    if (!text) {
      setPasswordError("Password is required");
    } else if (!passwordRegex.test(text)) {
      setPasswordError("Password must contain at least 1 uppercase, 1 lowercase, 1 number, 1 special character, min 8 chars");
    } else {
      setPasswordError("");
    }
  };

  const validateConfirmPassword = (text) => {
    setConfirmPassword(text);
    if (!text) {
      setConfirmPasswordError("Confirm password is required");
    } else if (text !== password) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };


  const handleSignUp = async () => {
    const fullNameValid = fullName.trim().length > 0;
    const emailValid = emailRegex.test(email);
    const passwordValid = passwordRegex.test(password);
    const confirmPasswordValid = password === confirmPassword;

    setFullNameError(fullNameValid ? "" : "Full name is required");
    setEmailError(emailValid ? "" : "Email format is invalid");
    setPasswordError(passwordValid ? "" : "Password must contain at least 1 uppercase, 1 lowercase, 1 number, 1 special character, min 8 chars");
    setConfirmPasswordError(confirmPasswordValid ? "" : "Passwords do not match");
    if (fullNameValid && emailValid && passwordValid && confirmPasswordValid) {

      setLoading(true);

      try {
        const result = await register({ fullName, email, password, role });
        setLoading(false);

        if (result.success) {
          // Toast.show({
          //   type: 'success',
          //   text1: 'Signed up successfully!',
          //   position: 'bottom',
          // });
          router.replace('/login');
        } else {
          Toast.show({
            type: 'error',
            text1: 'Sign up failed. Please try again.',
            text2: result.error,
            position: 'bottom',
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#1E3A8A" />
      </View>
    );
  }

  return (
    <ScrollView style={authStyles.container} showsVerticalScrollIndicator={false}>
      {/* Back Button */}
      <IconButton
        icon="arrow-left"
        size={24}
        iconColor={authColors.secondary}
        onPress={() => router.back()}
        style={authStyles.backButton}
      />

      {/* Header */}
      <View style={authStyles.header}>
        <Text style={authStyles.title}>Sign Up</Text>
        <Text style={authStyles.subtitle}>
          Start your learning journey now!
        </Text>
      </View>

      {/* Full Name Input */}
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
        {fullNameError ? <Text style={{ color: 'red', marginTop: 5 }}>{fullNameError}</Text> : null}
      </View>

      {/* Email Input */}
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
        {emailError ? <Text style={{ color: 'red', marginTop: 5 }}>{emailError}</Text> : null}
      </View>

      {/* Password Input */}
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
        {passwordError ? <Text style={{ color: 'red', marginTop: 5 }}>{passwordError}</Text> : null}
      </View>

      {/* Confirm Password Input */}
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
        {confirmPasswordError ? <Text style={{ color: 'red', marginTop: 5 }}>{confirmPasswordError}</Text> : null}
      </View>


      {/* Sign Up Button */}
      <Button
        mode="contained"
        onPress={handleSignUp}
        style={authStyles.button}
        contentStyle={authStyles.buttonContent}
        labelStyle={authStyles.buttonLabel}
      >
        SIGN UP
      </Button>

      {/* Footer */}
      <View style={[authStyles.footer, { marginBottom: 30 }]}>
        <Text style={authStyles.footerText}>Already Have An Account ?</Text>
        <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
          <Text style={authStyles.footerLink}>Sign In Here</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SignUp;