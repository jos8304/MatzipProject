import {createDrawerNavigator} from '@react-navigation/drawer';
import MspStackNavigator, {MapStackParamList} from '../stack/MapStackNavigator';
import FeedHomeScreen from '../../screens/feed/FeedHomeScreen';
import CalendarHomeScreen from '../../screens/calendar/CalendarHomeScreen';
import {mainNavigations} from '@/constants';
import {NavigatorScreenParams} from '@react-navigation/native';

export type MainDrawerNavigatorParamList = {
  [mainNavigations.HOME]: NavigatorScreenParams<MapStackParamList>;
  [mainNavigations.FEED]: undefined;
  [mainNavigations.CALENDAR]: undefined;
};

const Drawer = createDrawerNavigator<MainDrawerNavigatorParamList>();

function MainDrawerNavigator() {
  return (
    <Drawer.Navigator screenOptions={{headerShown: false, drawerType: 'front'}}>
      <Drawer.Screen
        name={mainNavigations.HOME}
        component={MspStackNavigator}
        options={{title: 'Home'}}
      />
      <Drawer.Screen
        name={mainNavigations.FEED}
        component={FeedHomeScreen}
        options={{title: 'Feed'}}
      />
      <Drawer.Screen
        name={mainNavigations.CALENDAR}
        component={CalendarHomeScreen}
        options={{title: 'Calendar'}}
      />
    </Drawer.Navigator>
  );
}

export default MainDrawerNavigator;
