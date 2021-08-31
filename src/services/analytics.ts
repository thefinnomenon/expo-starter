import LOGGER from '@/services/logger';
LOGGER.enable('ANALYTICS');
const log = LOGGER.extend('ANALYTICS');
import { Platform, Dimensions, PlatformIOSStatic, PlatformAndroidStatic, PlatformWebStatic } from 'react-native';
import * as Device from 'expo-device';
import * as Localization from 'expo-localization';
import Constants from 'expo-constants';
import * as Random from 'expo-random';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Analytics, Auth } from 'aws-amplify';
import { StorageKeys } from '@/utilities/constants';
import { setItem, getItem } from '@/utilities/asyncCache';
import { getLocation, getReverseGeocode } from '@/services/location';

/* Generate or retrieve (if already exists) a UID for the device */
const getUID = async () => {
  // If there is a UID in storage, return that
  let uid = await AsyncStorage.getItem(StorageKeys.UID);
  log.debug('Retrieved UID: ', uid);
  if (uid) return uid;

  // Otherwise, generate, store, and return a UID
  const bytes = await Random.getRandomBytesAsync(48);
  /* @ts-ignore */
  uid = Array.prototype.map
    .call(new Uint8Array(bytes), x => `00${x.toString(16)}`.slice(-2))
    .join('')
    .match(/[a-fA-F0-9]{2}/g)
    .reverse()
    .join('');
  await AsyncStorage.setItem(StorageKeys.UID, uid);
  log.debug('Generated and stored UID: ', uid);
  return uid;
};

/* Get the respective push notification channel for the OS */
const getChannelType = (os: string) => {
  switch (os) {
    case 'ios':
      return 'APNS';
    case 'android':
      return 'GCM';
    default:
      return '';
  }
}

/* Get the real device info */
const getDeviceInfo = (os: string) => {
  // The Device info is all fake on web
  if (os === 'web') {
    return {
      // appVersion: Nothing is available by default but we could probably pass in a version with env
      model: Constants.deviceName,
      platform: os,
    }
  } else {
    return {
      appVersion: Constants.nativeAppVersion,
      make: Device.manufacturer,
      model: Device.modelName,
      modelVersion: Device.modelId,
      platform: os,
      platformVersion: Device.osVersion,
    }
  }
}

/* Determine if the device is a tablet using width */
export const isTablet = () => {
  let pixelDensity = Dimensions.get('window').scale;
  const adjustedWidth = Dimensions.get('window').width * pixelDensity;
  const adjustedHeight = Dimensions.get('window').height * pixelDensity;
  if (pixelDensity < 2 && (adjustedWidth >= 1000 || adjustedHeight >= 1000)) {
    return true;
  } else {
    return (
      pixelDensity === 2 && (adjustedWidth >= 1920 || adjustedHeight >= 1920)
    );
  }
};

/* Get device type */
const getDeviceType = () => {
  switch(Platform.OS) {
    case 'ios':
      const platformIOS = Platform as PlatformIOSStatic;
      if (platformIOS.isPad) return 'iPad';
      if (platformIOS.isTV || platformIOS.isTVOS) return 'Apple TV';
      return 'iPhone';
    case 'android':
      const platformAndroid = Platform as PlatformAndroidStatic;
      if (platformAndroid.isTV) return 'Android TV';
      if (isTablet()) return 'Android Tablet';
      return 'Android Phone';
    case 'web':
      if ('ontouchstart' in window || navigator.maxTouchPoints) {
        if(isTablet()) return "Tablet Browser";
        return 'Mobile Browser';
      } else {
        return 'Desktop Browser';
      }
    default:
      return 'Unknown';
  }
}

/* Update endpoint config with location info */
export const updateEndpointLocation = async () => {
  let place, coords;
  const cachedRGC = await getItem(StorageKeys.REVERSE_GEOCODE);

  if (!cachedRGC) {
    const location = await getLocation();
    const reverseGeo = await getReverseGeocode(location.coords);
    place = reverseGeo.Results[0].Place;
    coords = location.coords;
    await setItem(StorageKeys.REVERSE_GEOCODE, { place, coords }, 60*60*24);
  } else {
    place = cachedRGC['place'];
    coords = cachedRGC['coords'];
  }

  const config = {
      city: place?.Municipality,
      country: place?.Country,
      latitude: coords?.latitude,
      longitude: coords?.longitude,
      postalCode: place?.PostalCode,
      region: place?.Region
  }

  await Analytics.updateEndpoint({ location: config });
  log.info('Updated endpoint with location info');
  log.debug('\n', JSON.stringify(config, null, 2));
}

/* Get analytics config */
export const getConfig = async () => {
  const uid = await getUID();
  const channelType = getChannelType(Platform.OS);
  const deviceInfo = getDeviceInfo(Platform.OS);
  const deviceType = getDeviceType();

  return { 
    Analytics: {
      AWSPinpoint: {
        appId: process.env.AWS_ANALYTICS_PINPOINT_APP_ID,
        region: process.env.AWS_REGION,
        endpointId: uid,
        endpoint: {
          // address: '',  // TODO: Update with device token, email address, or mobile phone number when user auths
          attributes: {
            appType: [deviceInfo.platform === 'web' ? 'web' : 'native'],
            deviceType: [deviceType],
            screenResolution: [`${Dimensions.get('window').width.toFixed(0)}x${Dimensions.get('window').height.toFixed(0)}`],
          },
          channelType: channelType || 'APNS',
          demographic: {
            ...deviceInfo,
            locale: Localization.locale,
            timezone: Localization.timezone
          },
          userId: uid // For unauth, use device uid and update to userId after auth
        },
      }
    }
  }
}

