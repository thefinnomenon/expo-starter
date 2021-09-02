import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerWithTabAndStackNavigator from '@/navigators/DrawerWithTabAndStackNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <DrawerWithTabAndStackNavigator />
    </NavigationContainer>
  );
}
