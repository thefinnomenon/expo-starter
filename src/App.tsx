import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import PasswordlessAuthStackNavigator from '@/navigators/PasswordlessAuthStackNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <PasswordlessAuthStackNavigator />
    </NavigationContainer>
  );
}
