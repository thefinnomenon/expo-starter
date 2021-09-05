import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Analytics } from 'aws-amplify';
import { StatusBar } from 'expo-status-bar';
import { LocationObject } from 'expo-location';
import { SearchPlaceIndexForPositionResponse } from 'aws-sdk/clients/location';
import { logout } from '@/services/authentication';
import LOGGER from '@/services/logger';
import Sentry from '@/services/sentry';
import { initLocation, getLocation, getReverseGeocode } from '@/services/location';
import { updateEndpointLocation } from '@/services/analytics';
import { SomeUtility } from '@/utilities/testUtility';

LOGGER.enable('HOME');
const log = LOGGER.extend('HOME');

type TabParamList = {
  Home: undefined;
  Details: undefined;
};

type StackParamList = {
  Home: undefined;
  Settings: undefined;
};

type NavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Home'>,
  NativeStackNavigationProp<StackParamList>
>;

type Props = {
  navigation: NavigationProps;
};

export default function HomeScreen({ navigation }: Props): JSX.Element {
  const [location, setLocation] = useState<LocationObject>();
  const [reverseGeocode, setReverseGeocode] = useState<SearchPlaceIndexForPositionResponse>();

  useEffect(() => {
    (async () => {
      const locEnabled = await initLocation();
      const loc = await getLocation();
      setLocation(loc);
      // TODO: If cannot access device location, use IP to Location API instead
      if (locEnabled) {
        const reverseGeo = await getReverseGeocode(loc.coords);
        setReverseGeocode(reverseGeo);
        await updateEndpointLocation();
      }
    })();
  }, []);

  const rgc = reverseGeocode?.Results[0].Place;
  return (
    <View style={styles.container}>
      <Text>process.env.NODE_ENV: {process.env.NODE_ENV}</Text>
      <Text>process.env.NAME: {process.env.NAME}</Text>
      <Text>Path Alias: {SomeUtility()}</Text>
      <Text>- Location -</Text>
      <Text>Latitude: {location?.coords.latitude}</Text>
      <Text>Longitude: {location?.coords.longitude}</Text>
      <Text>- Reverse Geocode -</Text>
      <Text>{rgc?.Label}</Text>
      <Button
        title="Press to cause error!"
        onPress={() => {
          log.error('Oh no!!!');
          Sentry.captureException(new Error('Oops!'));
        }}
      />
      <Button
        title="Press to cause analytics event!"
        onPress={() => {
          Analytics.record({ name: 'buttonClick' });
        }}
      />
      <Button title="Logout" onPress={() => logout()} />
      {/* eslint-disable-next-line */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
