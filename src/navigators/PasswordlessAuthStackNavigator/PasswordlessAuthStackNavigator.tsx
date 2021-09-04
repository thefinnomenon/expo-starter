import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PasswordlessAuthMobileInputScreen, PasswordlessAuthVerificationScreen } from '@/screens/index';

type Props = {} & typeof defaultProps;

const defaultProps = Object.freeze({});
const initialState = Object.freeze({});

const PasswordlessAuthStack = createNativeStackNavigator();

export default function PasswordlessAuthStackNavigator(props: Props): JSX.Element {
  return (
    <PasswordlessAuthStack.Navigator>
      <PasswordlessAuthStack.Screen
        name="PasswordlessAuthMobileInput"
        component={PasswordlessAuthMobileInputScreen}
        options={{ headerShown: false }}
      />
      <PasswordlessAuthStack.Screen
        name="PasswordlessAuthVerification"
        component={PasswordlessAuthVerificationScreen}
        options={{ headerShown: false }}
      />
    </PasswordlessAuthStack.Navigator>
  );
}

PasswordlessAuthStackNavigator.defaultProps = defaultProps;
