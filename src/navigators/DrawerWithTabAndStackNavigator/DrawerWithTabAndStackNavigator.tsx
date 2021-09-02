import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabWithStackNavigator from '../TabWithStackNavigator';
import { SettingsScreen } from '@/screens/index';

const Drawer = createDrawerNavigator();

export default function DrawerWithTabsAndStackNavigator(): JSX.Element {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="HomeTabWithStackNavigator" component={TabWithStackNavigator} options={{ title: 'Home', headerShown: false }} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
}