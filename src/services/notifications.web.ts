import { Platform } from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '@/utilities/constants';
import Alert from '@/utilities/alerts';
import LOGGER from '@/services/logger';

LOGGER.enable('NOTIFICATIONS');
const log = LOGGER.extend('NOTIFICATIONS');

export default class NotificationService {
  config: { pushKey: string | undefined };
  subscription: PushSubscription | null = null;

  constructor() {
    this.config = { pushKey: process.env.VAPID_PUBLIC_KEY };
    log.debug('VAPID PUBLIC KEY: ', process.env.VAPID_PUBLIC_KEY);
    log.info('Notification Service initialized');
  }

  async registerForPushNotifications(): Promise<void> {
    const permission = await this.askNotificationPermission();
    if (permission === 'granted') {
      log.info('Notification permission granted');
      if ('serviceWorker' in navigator) {
        try {
          const reg = await navigator.serviceWorker.ready;
          this.subscription = await reg.pushManager.getSubscription();
          if (!this.subscription) {
            this.subscription = await reg.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: this.urlB64ToUint8Array(this.config.pushKey),
            });
          }
          log.debug(this.subscription);
          // TODO: Save to database
        } catch (error) {
          log.error(error);
        }
        navigator.serviceWorker.addEventListener('message', event => console.log(event.data));
      }
    } else {
      log.error('Permissions not granted');
    }
  }

  async askNotificationPermission(): Promise<NotificationPermission> {
    /* Safari (and some older browsers) don't support the promise based check */
    function checkNotificationPromise() {
      try {
        Notification.requestPermission().then();
      } catch (e) {
        return false;
      }

      return true;
    }

    if (!('Notification' in window)) {
      log.error('This browser does not support notifications');
      return 'default';
    }
    if (checkNotificationPromise()) {
      return Notification.requestPermission();
    }

    return new Promise(resolve => {
      Notification.requestPermission(permission => {
        resolve(permission);
      });
    });
  }

  private urlB64ToUint8Array = (base64String: any): Uint8Array => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
  };

  async scheduleNotification(seconds: number, title: string): Promise<void> {
    log.error('Scheduled notifications are not available on web');
    const reg = await navigator.serviceWorker.getRegistration();
    if (reg) {
      const timestamp = new Date().getTime() + seconds * 1000;
      reg.showNotification('Test Notification', {
        tag: timestamp.toString(),
        body: 'Hi!',
        // showTrigger: new TimestampTrigger(timestamp), // Not supported yet
        vibrate: [100, 50, 100],
        actions: [
          { action: 'yes', title: 'yes' },
          { action: 'no', title: 'no' },
        ],
      });
    }
  }
}
