import React from 'react';
import { Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { authStyles, authColors } from '../../utils/authStyles.js';

const InputField = ({
  label,
  placeholder,
  value,
  onChangeText,
  onBlur,
  error,
  secureTextEntry,
  toggleSecureEntry,
}) => (
  <View style={authStyles.inputContainer}>
    <Text style={authStyles.label}>{label}</Text>
    <TextInput
      mode="outlined"
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      onBlur={onBlur}
      secureTextEntry={secureTextEntry}
      style={authStyles.input}
      outlineColor="#E2E8F0"
      activeOutlineColor={authColors.primary}
      right={
        toggleSecureEntry
          ? <TextInput.Icon icon={secureTextEntry ? 'eye' : 'eye-off'} onPress={toggleSecureEntry} />
          : null
      }
    />
    {error && <Text style={{ color: 'red', marginTop: 5 }}>{error}</Text>}
  </View>
);

export default InputField;
