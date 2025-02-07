import React from 'react';
import {StyleSheet, View, Text, SafeAreaView, Button} from 'react-native';
import InputField from '@/components/InputField';

import useForm from '@/hooks/useForm';
import {validateLogin} from '@/utils/validate';
import useAuth from '@/hooks/queries/useAuth';

function LoginScreen() {
  const {loginMutation} = useAuth();
  const login = useForm({
    initialValue: {email: '', password: ''},
    validate: validateLogin,
  });

  const handleSubmit = () => {
    console.log('values', login.values);
    loginMutation.mutate(login.values);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          autoFocus
          placeholder="Email"
          error={login.errors.email}
          touched={login.touched.email}
          inputMode="email"
          {...login.getTextInputProps('email')}
        />
        <InputField
          placeholder="Password"
          error={login.errors.password}
          touched={login.touched.password}
          secureTextEntry
          {...login.getTextInputProps('password')}
        />
      </View>
      {/* <Button label="Login" variant="filled" onPress={handleSubmit} /> */}
      <Button title="Login" onPress={handleSubmit} />
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

export default LoginScreen;
