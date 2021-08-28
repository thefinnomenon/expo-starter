// src/services/sentry.ts
import { Platform } from 'react-native';
import * as Sentry from 'sentry-expo';

export const initSentry = (enableInDev: boolean = false) => {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    enableInExpoDevelopment: enableInDev,
    debug: __DEV__,
  });
}

let SentryClient = Sentry.Browser;
if (Platform.OS !== 'web') {
  /* @ts-ignore */
  SentryClient = Sentry.Native;
}

export const SentryNative = Sentry.Native;
export const SentryBrowser = Sentry.Browser;
export default SentryClient;