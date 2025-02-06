import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import AuthHomeScreen from '../../screens/auth/AuthHomeScreen';
import LoginScreen from '../../screens/auth/LoginScreen';
import {authNaviagtions} from '../../constants';
import SignupScreen from '../../screens/auth/SignupScreen';

export type AuthStackParamList = {
  [authNaviagtions.AUTH_HOME]: undefined;
  [authNaviagtions.LOGIN]: undefined;
  [authNaviagtions.SIGNUP]: undefined;
};
const Stack = createStackNavigator<AuthStackParamList>();

function AuthStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: 'white',
        },
        headerStyle: {
          backgroundColor: 'white',
          shadowColor: 'gray',
        },
        headerTitleStyle: {
          fontSize: 28,
        },
        headerTintColor: 'black',
      }}>
      <Stack.Screen
        name={authNaviagtions.AUTH_HOME}
        component={AuthHomeScreen}
        options={{headerTitle: '', headerShown: false}}
      />
      <Stack.Screen
        name={authNaviagtions.LOGIN}
        component={LoginScreen}
        options={{headerTitle: 'Login'}}
      />
      <Stack.Screen
        name={authNaviagtions.SIGNUP}
        component={SignupScreen}
        options={{headerTitle: 'Signup'}}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});

export default AuthStackNavigator;
