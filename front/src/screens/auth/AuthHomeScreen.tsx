import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {Dimensions, Image, SafeAreaView, StyleSheet, View} from 'react-native';
import {AuthStackParamList} from '@/navigations/stack/AuthStackNavigator';
import {authNaviagtions} from '@/constants';
import CustomButton from '@/components/CustomButton';
import colors from '@/constants/colors';

type AuthHomeScreenProps = StackScreenProps<
  AuthStackParamList,
  typeof authNaviagtions.AUTH_HOME
>;

function AuthHomeScreen({navigation}: AuthHomeScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          resizeMode="contain"
          style={styles.image}
          source={require('../../assets/logo.png')}
        />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          label="Login"
          variant="filled"
          onPress={() => navigation.navigate(authNaviagtions.LOGIN)}
        />
        <CustomButton
          label="Signup"
          variant="outlined"
          onPress={() => navigation.navigate(authNaviagtions.SIGNUP)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
    alignItems: 'center',
    backgroundColor: colors.WHITE,
  },
  imageContainer: {
    flex: 1,
    width: Dimensions.get('screen').width,
  },
  image: {
    width: '100%',
    height: '120%',
    marginTop: 50,
  },
  buttonContainer: {
    flex: 1,
    marginTop: 120,
    gap: 10,
  },
});

export default AuthHomeScreen;
