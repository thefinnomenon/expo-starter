import { Platform } from 'react-native';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { NotificationResponse, Notification } from 'expo-notifications';
import { Subscription } from '@unimodules/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '@/utilities/constants';
import Alert from '@/utilities/alerts';
import LOGGER from '@/services/logger';

LOGGER.enable('NOTIFICATIONS');
const log = LOGGER.extend('NOTIFICATIONS');

export default class NotificationService {
  EXPERIENCE_ID = process.env.EXPERIENCE_ID;
  private addPushTokenListener: Subscription | null = null;
  private notificationListener: Subscription;
  private responseListener: Subscription;
  pushToken!: string;
  notification!: Notification;
  notificationResponse!: NotificationResponse;

  constructor() {
    // Set notification handler for handling notifications (foregrounded)
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });

    // Set interactive notification categories
    Notifications.setNotificationCategoryAsync('YESNO', [
      { identifier: 'YES', buttonTitle: 'Yes 👍', options: { opensAppToForeground: false } },
      { identifier: 'NO', buttonTitle: 'No 👎', options: { opensAppToForeground: false } },
    ]);

    // Add notification listener (foregrounded)
    this.notificationListener = Notifications.addNotificationReceivedListener(notification => {
      this.notification = notification;
    });

    // Add interacted notification listener (foregrounded, backgrounded, killed)
    this.responseListener = Notifications.addNotificationResponseReceivedListener(async response => {
      this.notificationResponse = response;
      console.log(`NOTIFICATION RESPONSE ACTION: ${response.actionIdentifier}`);

      // Dismiss notification
      Notifications.dismissNotificationAsync(response.notification.request.identifier);
    });

    log.info('Notification Service initialized');
  }

  async registerForPushNotifications(): Promise<void> {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        log.error('Permission not granted');
        Alert('Notification Error', 'Failed to get push token for push notification');
      }
      try {
        token = (await Notifications.getExpoPushTokenAsync({ experienceId: this.EXPERIENCE_ID })).data;
        log.debug(token);
        await this.savePostTokenToDB(token);
      } catch (error) {
        log.error(error);
        Alert('Notification Error', 'Failed to register push token');
      }
    } else {
      log.error('Must use physical device for Push Notifications');
      Alert('Notification Error', 'Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        sound: 'mySound.wav',
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    this.pushToken = token || '';

    // Setup token refresh listener
    this.addPushTokenListener = Notifications.addPushTokenListener(this.registerForPushNotifications);
  }

  private async savePostTokenToDB(token: string): Promise<void> {
    const type = Platform.OS;
    try {
      // Retrieve and parse token (if exists)
      const storedToken = await AsyncStorage.getItem(StorageKeys.PUSH_TOKEN);

      // First time saving token -> create record
      if (!storedToken) {
        // TODO: create database record and store token locally
      }

      // Stored token doesn't match current token -> update record
      if (storedToken !== token) {
        // TODO: update database record and store token locally
      }
    } catch (error) {
      log.error(error);
      Alert('Notification Error', 'Failed to update push token');
    }
  }

  async scheduleNotification(seconds: number, title: string): Promise<void> {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
      },
      trigger: {
        seconds,
        channelId: 'default',
      },
    });
  }

  destructor(): void {
    if (this.addPushTokenListener) {
      this.addPushTokenListener.remove();
    }

    this.notificationListener.remove();
    this.responseListener.remove();
  }
}
