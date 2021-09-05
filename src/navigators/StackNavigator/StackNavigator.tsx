import React from 'react';
import { Button } from 'react-native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { HomeScreen } from '@/screens/index';

export type ParamList = {
  Home: undefined;
};

type NavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<ParamList, 'Home'>,
  DrawerNavigationProp<ParamList>
>;

type Props = {};

const Stack = createNativeStackNavigator();

export default function StackNavigator(props: Props): JSX.Element {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}
