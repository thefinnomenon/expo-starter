import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigator from '@/navigators/TabNavigator';
import { HomeScreen, SettingsScreen } from '@/screens/index';

type Props = {} & typeof defaultProps;

const defaultProps = Object.freeze({});
const initialState = Object.freeze({});

const Drawer = createDrawerNavigator();

export default function DrawerWithTabsNavigator(props: Props): JSX.Element {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name='HomeTabNavigator' component={TabNavigator} options={{ title: 'Home', headerShown: false }} />
      <Drawer.Screen name='Settings' component={SettingsScreen} />
    </Drawer.Navigator>
  );
}

DrawerWithTabsNavigator.defaultProps = defaultProps;