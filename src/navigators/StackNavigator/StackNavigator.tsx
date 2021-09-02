import React from 'react';
import { Button } from 'react-native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { HomeScreen, SettingsScreen } from '@/screens/index';

export type ParamList = {
  'Home': undefined,
  'Settings': undefined
};

type NavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<ParamList, 'Home'>,
  DrawerNavigationProp<ParamList>
>;

type Props = {
  navigation: NavigationProp
}

const Stack = createNativeStackNavigator();

export default function StackNavigator({ navigation }: Props): JSX.Element {
  return (
    <Stack.Navigator screenOptions={{
      headerRight: () => (
        <Button
          onPress={() => navigation.toggleDrawer()}
          title="Menu"
          color="black"
        />
      ),
    }}>
      <Stack.Screen name={'Home'} component={HomeScreen} />
      <Stack.Screen name={'Settings'} component={SettingsScreen} />
    </Stack.Navigator>
  );
}