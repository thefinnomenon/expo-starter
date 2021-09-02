import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { HomeScreen, SettingsScreen } from '@/screens/index';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator(): JSX.Element {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name='Home' component={HomeScreen} />
      <Drawer.Screen name='Settings' component={SettingsScreen} />
    </Drawer.Navigator>
  );
}