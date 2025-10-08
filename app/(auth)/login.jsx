import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Text, TextInput, Button, IconButton } from 'react-native-paper';
import { router } from 'expo-router';
import { authStyles, authColors } from '../../src/utils/authStyles';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // TODO: Add login logic
    // For now, navigate to student dashboard
    router.replace('/(student)/dashboard');
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
        <Text style={authStyles.title}>Sign In</Text>
        <Text style={authStyles.subtitle}>
          Welcome back! Please login to your account.
        </Text>
      </View>

      {/* Email Input */}
      <View style={authStyles.inputContainer}>
        <Text style={authStyles.label}>Email</Text>
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

      {/* Forgot Password */}
      <TouchableOpacity style={{ alignSelf: 'flex-end', marginTop: 8, marginBottom: 24 }}>
        <Text style={[authStyles.footerLink, { fontSize: 14 }]}>
          Forgot Password?
        </Text>
      </TouchableOpacity>

      {/* Login Button */}
      <Button
        mode="contained"
        onPress={handleLogin}
        style={authStyles.button}
        contentStyle={authStyles.buttonContent}
        labelStyle={authStyles.buttonLabel}
      >
        SIGN IN
      </Button>

      {/* Footer */}
      <View style={[authStyles.footer, { marginBottom: 30 }]}>
        <Text style={authStyles.footerText}>Don't Have An Account?</Text>
        <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
          <Text style={authStyles.footerLink}>Sign Up Here</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Login;