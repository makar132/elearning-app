import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, IconButton, Text, TextInput } from "react-native-paper";
import Toast from "react-native-toast-message";
import { useAuth } from "../../src/context/AuthContext";
import { login } from "../../src/services/authService";
import { authColors, authStyles } from "../../src/utils/authStyles";

const Login = () => {
  const { loginUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.com+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!]).{8,}$/;

  //  validate
  const validateEmail = (text) => {
    setEmail(text);
    if (!text) setEmailError("Email is required");
    else if (!emailRegex.test(text)) setEmailError("Email format is invalid");
    else setEmailError("");
  };

  const validatePassword = (text) => {
    setPassword(text);
    if (!text) setPasswordError("Password is required");
    else if (!passwordRegex.test(text))
      setPasswordError(
        "Password must contain at least 1 uppercase, 1 lowercase, 1 number, 1 special character, min 8 chars"
      );
    else setPasswordError("");
  };

  const handleLogin = async () => {
    // validate
    validateEmail(email);
    validatePassword(password);

    if (emailError || passwordError) return;

    setLoading(true);

    try {
      const result = await login(email, password);
      setLoading(false);
      console.log("Login result:", result);
      if (result.success) {
        loginUser(result.user);
        // Toast.show({
        //   type: 'success',
        //   text1: 'Logged in successfully!',
        //   position: 'bottom',
        // });
        // Redirect
        router.replace(
          result.user.role === "student" ? "/(student)/my-courses" : "/(admin)/"
        );
      } else {
        Toast.show({
          type: "error",
          text1: "Login failed. Please try again.",
          text2: result.error,
          position: "bottom",
        });
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
      Toast.show({
        type: "error",
        text1: "An error occurred. Please try again.",
        text2: err.message,
        position: "bottom",
      });
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={authColors.primary} />
      </View>
    );
  }

  return (
    <ScrollView
      style={authStyles.container}
      showsVerticalScrollIndicator={false}
    >
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
          onChangeText={validateEmail}
          onBlur={() => validateEmail(email)}
          keyboardType="email-address"
          autoCapitalize="none"
          style={[authStyles.input, emailError ? { borderColor: "red" } : null]}
          outlineColor="#E2E8F0"
          activeOutlineColor={authColors.primary}
        />
        {emailError ? (
          <Text style={{ color: "red", marginTop: 5 }}>{emailError}</Text>
        ) : null}
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
          style={[
            authStyles.input,
            passwordError ? { borderColor: "red" } : null,
          ]}
          outlineColor="#E2E8F0"
          activeOutlineColor={authColors.primary}
          right={
            <TextInput.Icon
              icon={showPassword ? "eye-off" : "eye"}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
        />
        {passwordError ? (
          <Text style={{ color: "red", marginTop: 5 }}>{passwordError}</Text>
        ) : null}
      </View>

      {/* Forgot Password */}
      <TouchableOpacity
        style={{ alignSelf: "flex-end", marginTop: 8, marginBottom: 24 }}
      >
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
        <Text style={authStyles.footerText}>{"Don't Have An Account?"}</Text>
        <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
          <Text style={authStyles.footerLink}>Sign Up Here</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Login;
