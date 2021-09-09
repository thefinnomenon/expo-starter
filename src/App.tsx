import React, { useState, useEffect } from 'react';
import Amplify from 'aws-amplify';
import { Hub } from '@aws-amplify/core';
import { NavigationContainer } from '@react-navigation/native';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import LOGGER from '@/services/logger';
import { initSentry } from '@/services/sentry';
import { initAmplify } from '@/api/amplify';
import PasswordlessAuthStackNavigator from '@/navigators/PasswordlessAuthStackNavigator';
import StackNavigator from '@/navigators/StackNavigator';
import { updateEndpointUserInfo } from '@/services/analytics';

LOGGER.enable('APP');
const log = LOGGER.extend('APP');

initSentry(false);

export default function App(): JSX.Element {
  const [user, setUser] = useState(null);

  // Monitor auth state
  useEffect(() => {
    const updateUser = async () => {
      try {
        const usr = await Amplify.Auth.currentAuthenticatedUser();
        setUser(usr);
        await updateEndpointUserInfo(usr);
      } catch {
        setUser(null);
      }
    };

    (async () => {
      await initAmplify();
      // Listen for login/signup events
      Hub.listen('auth', updateUser);
      // Check manually the first time because we won't get a Hub event
      updateUser();
    })();

    return () => Hub.remove('auth', updateUser);
  }, []);

  console.log(user);

  return <NavigationContainer>{!user ? <PasswordlessAuthStackNavigator /> : <StackNavigator />}</NavigationContainer>;
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
