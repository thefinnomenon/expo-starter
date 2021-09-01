// src/services/sentry.ts
import { Platform } from 'react-native';
import * as Sentry from 'sentry-expo';

export const initSentry = (enableInDev = false) => {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    enableInExpoDevelopment: enableInDev,
    debug: __DEV__,
  });
};

let client = Sentry.Browser;
if (Platform.OS !== 'web') {
  /* @ts-ignore */
  client = Sentry.Native;
}

const SentryClient = client;

export const SentryNative = Sentry.Native;
export const SentryBrowser = Sentry.Browser;
export default SentryClient;
