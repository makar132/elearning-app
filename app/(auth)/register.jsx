import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Text, TextInput, Button, IconButton, RadioButton } from 'react-native-paper';
import { router } from 'expo-router';
import { authStyles, authColors } from '../../src/utils/authStyles';

const SignUp = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('student');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignUp = () => {
    // TODO: Add registration logic
    // For now, navigate based on role
    if (role === 'student') {
      router.replace('/(student)/dashboard');
    } else {
      router.replace('/(instructor)/dashboard');
    }
  };

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
          Lorem ipsum dolor sit amet a{'\n'}aconsectetur
        </Text>
      </View>

      {/* Full Name Input */}
      <View style={authStyles.inputContainer}>
        <Text style={authStyles.label}>Full Name</Text>
        <TextInput
          mode="outlined"
          placeholder="Your Name Here"
          value={fullName}
          onChangeText={setFullName}
          style={authStyles.input}
          outlineColor="#E2E8F0"
          activeOutlineColor={authColors.primary}
        />
      </View>

      {/* Email Input */}
      <View style={authStyles.inputContainer}>
        <Text style={authStyles.label}>Email Here</Text>
        <TextInput
          mode="outlined"
          placeholder="Contact@gmail.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={authStyles.input}
          outlineColor="#E2E8F0"
          activeOutlineColor={authColors.primary}
        />
      </View>

      {/* Password Input */}
      <View style={authStyles.inputContainer}>
        <Text style={authStyles.label}>Password</Text>
        <TextInput
          mode="outlined"
          placeholder="••••••••••••••••"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          style={authStyles.input}
          outlineColor="#E2E8F0"
          activeOutlineColor={authColors.primary}
          right={
            <TextInput.Icon
              icon={showPassword ? 'eye-off' : 'eye'}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
        />
      </View>

      {/* Confirm Password Input */}
      <View style={authStyles.inputContainer}>
        <Text style={authStyles.label}>Confirm Password</Text>
        <TextInput
          mode="outlined"
          placeholder="••••••••••••••••"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showConfirmPassword}
          style={authStyles.input}
          outlineColor="#E2E8F0"
          activeOutlineColor={authColors.primary}
          right={
            <TextInput.Icon
              icon={showConfirmPassword ? 'eye-off' : 'eye'}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          }
        />
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