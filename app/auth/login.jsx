import React, { useState } from 'react';
import { ScrollView, View, ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';
import { Formik } from 'formik';
import InputField from '../../src/components/Auth/InputField.jsx';
import { login } from '../../src/services/authService.js';
import { authStyles, authColors } from '../../src/utils/authStyles.js';
import { LoginSchema } from '../../src/utils/validation.js';
import { useAuth } from '../../src/context/AuthContext.jsx';

const Login = () => {
  const { loginUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const result = await login(values.email, values.password);
      setLoading(false);
      if (result.success) {
        loginUser(result.user);
        router.replace(result.user.role==='student'?'/student/':'/admin/');
      } else {
        Toast.show({ type:'error', text1:'Login failed', text2:result.error, position:'bottom' });
      }
    } catch (err) {
      setLoading(false);
      Toast.show({ type:'error', text1:'An error occurred', text2:err.message, position:'bottom' });
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
        <Text style={authStyles.title}>Sign In</Text>
        <Text style={authStyles.subtitle}>Welcome back! Please login to your account.</Text>
      </View>

      <Formik initialValues={{ email:'', password:'' }} validationSchema={LoginSchema} onSubmit={handleLogin}>
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <InputField label="Email" placeholder="contact@gmail.com" value={values.email} onChangeText={handleChange('email')} onBlur={handleBlur('email')} error={touched.email && errors.email} />
            <InputField label="Password" placeholder="••••••••" value={values.password} onChangeText={handleChange('password')} onBlur={handleBlur('password')} secureTextEntry={!showPassword} toggleSecureEntry={() => setShowPassword(!showPassword)} error={touched.password && errors.password} />

            {/* <TouchableOpacity style={{ alignSelf:'flex-end', marginTop:8, marginBottom:24 }}>
              <Text style={[authStyles.footerLink, { fontSize:14 }]}>Forgot Password?</Text>
            </TouchableOpacity> */}

            <Button mode="contained" onPress={handleSubmit} style={authStyles.button} contentStyle={authStyles.buttonContent} labelStyle={authStyles.buttonLabel}>SIGN IN</Button>
          </>
        )}
      </Formik>

      <View style={[authStyles.footer, { marginBottom:30 }]}>
        <Text style={authStyles.footerText}>{`Don't Have An Account?`}</Text>
        <TouchableOpacity onPress={() => router.push('/auth/register')}>
          <Text style={authStyles.footerLink}>Sign Up Here</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Login;
