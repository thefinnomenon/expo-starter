import { Auth } from 'aws-amplify';
import AwsLocation from 'aws-sdk/clients/location';
import * as Location from 'expo-location';
import { Alert } from 'react-native';
import { getLastKnownPositionAsync } from 'expo-location';
import LOGGER from '@/services/logger';

LOGGER.enable('LOCATION');
const log = LOGGER.extend('LOCATION');

let locationClient: AwsLocation;

/* Request permissions and initialize AWS Location client */
export const initLocation = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert(
      'Location Services Error',
      'Permission to access location was denied',
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      { cancelable: false },
    );
    return false;
  }
  locationClient = await createLocationClient();
  log.info('Location Service initialized');
  return true;
};

/* Create AWS Location client */
const createLocationClient = async () => {
  const credentials = await Auth.currentCredentials();
  const client = new AwsLocation({
    credentials,
    region: process.env.AWS_REGION,
  });
  return client;
};

/* Convert device location @coords into AWS Location position */
const convertCoordsToPosition = (coords: any) => {
  return [coords.longitude, coords.latitude];
};

/* Get current location */
export const getLocation = async () => {
  let location;
  try {
    location = await Location.getCurrentPositionAsync();
  } catch (error: any) {
    // Android issue fix: https://github.com/expo/expo/issues/14248#issuecomment-912394482
    location = await getLastKnownPositionAsync();
  }
  return location;
};

/* Get reverse geocode for @coords */
export const getReverseGeocode = (
  coords: any,
  maxResults = 1,
): Promise<AwsLocation.SearchPlaceIndexForPositionResponse> => {
  return new Promise((resolve, reject) => {
    const params = {
      IndexName: process.env.AWS_LOCATION_PLACE_INDEX_ID as string,
      Position: convertCoordsToPosition(coords),
      MaxResults: maxResults,
    };
    log.debug('\n', params.Position);
    locationClient.searchPlaceIndexForPosition(params, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};
