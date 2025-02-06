import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import InputField from '../../components/InputField';
import useForm from '../../hooks/useForm';
import CustomButton from '../../components/CustomButton';
import {validatesignup} from '../../utils';

function SignupScreen() {
  const signup = useForm({
    initialValue: {email: '', password: '', passwordconfirm: ''},
    validate: validatesignup,
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          autoFocus
          placeholder="Email"
          error={signup.errors.email}
          touched={signup.touched.email}
          inputMode="email"
          {...signup.getTextInputProps('email')}
        />
        <InputField
          placeholder="password"
          error={signup.errors.password}
          touched={signup.touched.password}
          {...signup.getTextInputProps('password')}
        />
        <InputField
          placeholder="Confirm password"
          error={signup.errors.passwordconfirm}
          touched={signup.touched.passwordconfirm}
          {...signup.getTextInputProps('passwordconfirm')}
        />
      </View>
      <CustomButton label="Signup" variant="filled" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 20,
  },
});

export default SignupScreen;
