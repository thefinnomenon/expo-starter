import React from 'react';
import { Button } from 'react-native';
import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import StackNavigator from '@/navigators/StackNavigator';
import { CompositeNavigationProp } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DetailsScreen } from '@/screens/index';

export type ParamList = {
  'HomeStack': undefined,
  'Details': undefined
};

type NavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<ParamList, 'HomeStack'>,
  DrawerNavigationProp<ParamList>
>;

type Props = {
  navigation: NavigationProp
}

const Tabs = createBottomTabNavigator();

export default function TabWithStackNavigator({ navigation }: Props): JSX.Element {
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
      <Tabs.Screen name={'HomeStack'} component={StackNavigator} options={{ title: 'Home', headerShown: false }}/>
      <Tabs.Screen name={'Details'} component={DetailsScreen} />
    </Tabs.Navigator>
  );
}