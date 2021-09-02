import React from 'react';
import { Button } from 'react-native';
import { CompositeNavigationProp } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { HomeScreen, DetailsScreen } from '@/screens/index';

export type ParamList = {
  'Home': undefined,
  'Details': undefined
};

type NavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<ParamList, 'Home'>,
  DrawerNavigationProp<ParamList>
>;

type Props = {
  navigation: NavigationProp;
}

const Tabs = createBottomTabNavigator();

export default function TabNavigator({ navigation }: Props): JSX.Element {
  return (
    <Tabs.Navigator screenOptions={{
      headerRight: () => (
        <Button
          onPress={() => navigation.toggleDrawer()}
          title="Menu"
          color="black"
        />
      ),
    }}>
      <Tabs.Screen name='Home' component={HomeScreen} />
      <Tabs.Screen name='Details' component={DetailsScreen} />
    </Tabs.Navigator>
  );
}