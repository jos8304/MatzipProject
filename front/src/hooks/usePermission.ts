import alerts from '@/constants/messages';
import {useEffect} from 'react';
import {Alert, Linking, Platform} from 'react-native';
import {
  check,
  PERMISSIONS,
  request,
  Permission,
  RESULTS,
} from 'react-native-permissions';

type PermissionType = 'LOCATION' | 'PHOTO';

type PerssionOS = {
  [key in PermissionType]: Permission;
};

const androidPermissions: PerssionOS = {
  LOCATION: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  PHOTO: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
};

const isPermissions: PerssionOS = {
  LOCATION: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  PHOTO: PERMISSIONS.IOS.PHOTO_LIBRARY,
};

function usePermission(type: PermissionType) {
  useEffect(() => {
    (async () => {
      const isAndroid = Platform.OS === 'android';
      const permissonOS = isAndroid ? androidPermissions : isPermissions;

      const checked = await check(permissonOS[type]);
      console.log('permission', checked);

      const showPermissionAlert = () => {
        Alert.alert(
          alerts[`${type}_PERMISSION`].TITLE,
          alerts[`${type}_PERMISSION`].DESCRIPTION,
          [
            {
              text: 'OK',
              onPress: () => {
                Linking.openSettings();
              },
            },
          ],
        );
      };

      switch (checked) {
        case RESULTS.DENIED:
          if (isAndroid) {
            showPermissionAlert();
            return;
          }

          await request(permissonOS[type]);
          break;

        case RESULTS.BLOCKED:
          break;
        case RESULTS.LIMITED:
          showPermissionAlert();
        case RESULTS.GRANTED:
          console.log('Permission granted');
          break;
        default:
          break;
      }
    })();
  }, []);
}

export default usePermission;
