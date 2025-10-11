import React, { useState } from 'react';
import { ScrollView, View, ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';
import { Formik } from 'formik';
import InputField from '../../src/components/Auth/InputField.jsx';
import { register } from '../../src/services/authService.js';
import { authStyles, authColors } from '../../src/utils/authStyles.js';
import { SignUpSchema } from '../../src/utils/validation.js';

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignUp = async (values) => {
    setLoading(true);
    try {
      const result = await register({ ...values, role: 'student' });
      setLoading(false);
      if (result.success) router.replace('/auth/login');
      else Toast.show({ type: 'error', text1: 'Sign up failed', text2: result.error, position: 'bottom' });
    } catch (error) {
      setLoading(false);
      Toast.show({ type: 'error', text1: 'An error occurred', text2: error.message, position: 'bottom' });
    }
  };

  if (loading) return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      <ActivityIndicator size="large" color={authColors.primary}/>
    </View>
  );

  return (
    <ScrollView style={authStyles.container} showsVerticalScrollIndicator={false}>
      <IconButton icon="arrow-left" size={24} iconColor={authColors.secondary} onPress={() => router.back()} style={authStyles.backButton}/>
      <View style={authStyles.header}>
        <Text style={authStyles.title}>Sign Up</Text>
        <Text style={authStyles.subtitle}>Start your learning journey now!</Text>
      </View>

      <Formik
        initialValues={{ fullName:'', email:'', password:'', confirmPassword:'' }}
        validationSchema={SignUpSchema}
        onSubmit={handleSignUp}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <InputField label="Full Name" placeholder="Your Name Here" value={values.fullName} onChangeText={handleChange('fullName')} onBlur={handleBlur('fullName')} error={touched.fullName && errors.fullName} />
            <InputField label="Email" placeholder="Contact@gmail.com" value={values.email} onChangeText={handleChange('email')} onBlur={handleBlur('email')} error={touched.email && errors.email} />
            <InputField label="Password" placeholder="••••••••" value={values.password} onChangeText={handleChange('password')} onBlur={handleBlur('password')} secureTextEntry={!showPassword} toggleSecureEntry={() => setShowPassword(!showPassword)} error={touched.password && errors.password} />
            <InputField label="Confirm Password" placeholder="••••••••" value={values.confirmPassword} onChangeText={handleChange('confirmPassword')} onBlur={handleBlur('confirmPassword')} secureTextEntry={!showConfirmPassword} toggleSecureEntry={() => setShowConfirmPassword(!showConfirmPassword)} error={touched.confirmPassword && errors.confirmPassword} />

            <Button mode="contained" onPress={handleSubmit} style={authStyles.button} contentStyle={authStyles.buttonContent} labelStyle={authStyles.buttonLabel}>SIGN UP</Button>
          </>
        )}
      </Formik>

      <View style={[authStyles.footer, { marginBottom:30 }]}>
        <Text style={authStyles.footerText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => router.replace('/auth/login')}>
          <Text style={authStyles.footerLink}>Sign In Here</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SignUp;
