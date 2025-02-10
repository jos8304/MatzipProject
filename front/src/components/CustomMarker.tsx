import colors from '@/constants/colors';
import {MarkerColor} from '@/types/domain';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {LatLng, MapMarkerProps, Marker} from 'react-native-maps';

interface CustomMarkerProps extends MapMarkerProps {
  coordinate: LatLng;
  color: MarkerColor;
  score?: number;
}

const colorHex = {
  RED: colors.PINK_500,
  BLUE: colors.BLUE_500,
  GREEN: colors.GREEN_500,
  YELLOW: colors.YELLOW_500,
  PURPLE: colors.PURPLE_500,
};

function CustomMarker({
  coordinate,
  color,
  score = 5,
  ...props
}: CustomMarkerProps) {
  return (
    <Marker coordinate={coordinate} {...props}>
      <View style={styles.container}>
        <View style={(styles.marker, {backgroundColor: colorHex[color]})}>
          <View style={[styles.eye, styles.leftEye]} />
          <View style={[styles.eye, styles.rightEye]} />
          {score > 3 && <View style={[styles.mouth, styles.good]} />}
          {score === 3 && <View style={styles.soso} />}
          {score < 3 && <View style={[styles.mouth, styles.bad]} />}
        </View>
      </View>
    </Marker>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: 50,
    alignItems: 'center',
  },
  marker: {
    transform: [{rotate: '45deg'}],
    width: 25,
    height: 25,
    borderRadius: 27,
    borderBottomRightRadius: 1,
    borderWidth: 1,
    borderColor: colors.BLACK,
  },
  eye: {
    position: 'absolute',
    backgroundColor: colors.BLACK,
    width: 4,
    height: 4,
    borderRadius: 4,
  },
  leftEye: {
    top: 12,
    left: 5,
  },
  rightEye: {
    top: 5,
    right: 12,
  },
  mouth: {
    borderTopColor: 'rgba(255,255,255,255 / 0.01)',
    borderBottomColor: 'rgba(255,255,255,255 / 0.01)',
    position: 'absolute',
    width: 12,
    height: 12,
    borderWidth: 1,
    borderRadius: 12,
    transform: [{rotate: '45deg'}],
  },
  good: {
    marginLeft: 5,
    marginTop: 5,
    borderRightColor: 'rgba(255,255,255,255 / 0.01)',
    borderLeftColor: colors.BLACK,
  },
  soso: {
    marginLeft: 13,
    marginTop: 13,
    width: 8,
    height: 8,
    borderLeftColor: colors.BLACK,
    borderLeftWidth: 1,
  },
  bad: {
    marginLeft: 12,
    marginTop: 12,
    borderRightColor: 'rgba(255,255,255,255 / 0.01)',
    borderLeftColor: colors.BLACK,
  },
});

export default CustomMarker;
