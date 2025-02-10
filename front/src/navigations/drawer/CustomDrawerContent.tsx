import colors from '@/constants/colors';
import useAuth from '@/hooks/queries/useAuth';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {Button} from 'react-native';
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface ProfileData {
  email: string;
  nickname: string;
  imageUrl: string;
}

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const {logoutMutation, getProfileQuery} = useAuth();
  const {email, imageUrl} = (getProfileQuery.data || {}) as ProfileData;

  const handleLogout = () => {
    logoutMutation.mutate(null);
  };
  return (
    <SafeAreaView style={styles.container}>
      <DrawerContentScrollView
        {...props}
        scrollEnabled={false}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.useInfoContainer}>
          <View style={styles.userImageContainer}>
            {imageUrl === null && (
              <Image
                source={require('@/assets/user.png')}
                style={styles.userImage}
              />
            )}
            {imageUrl !== null && (
              <Image source={{uri: imageUrl}} style={styles.userImage} />
            )}
          </View>
          <Text style={styles.nameText}>{email}</Text>
        </View>
        <DrawerItemList {...props} />
        <Pressable onPress={handleLogout}>
          <View style={{alignItems: 'flex-end', padding: 10}}>
            <Text>Logout</Text>
          </View>
        </Pressable>
      </DrawerContentScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: colors.WHITE,
  },
  nameText: {
    fontSize: 16,
    color: colors.BLACK,
    fontWeight: '600',
    marginVertical: 10,
  },
  useInfoContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomColor: colors.GRAY_200,
    borderBottomWidth: 1,
  },
  container: {
    backgroundColor: colors.WHITE,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CustomDrawerContent;
