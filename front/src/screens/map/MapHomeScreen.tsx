import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import useAuth from '../../hooks/queries/useAuth';

function MapHomeScreen() {
  const {logoutMutation} = useAuth();

  return (
    <MapView
      style={styles.container}
      provider={PROVIDER_GOOGLE}
      showsUserLocation
      followUserLocation
      showsMyLocationButton={true}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MapHomeScreen;
