/* https://github.com/onubo/react-native-logs#configuration */
import { Platform } from 'react-native';
import { logger, consoleTransport, fileAsyncTransport, sentryTransport } from "react-native-logs";
import * as FileSystem from 'expo-file-system';
import Sentry from '@/services/sentry';

let today = new Date();
let date = today.getDate();
let month = today.getMonth() + 1;
let year = today.getFullYear();

const developmentConfig = {
  severity: "debug",
  transport: consoleTransport,
  transportOptions: {
    color: "ansi",
  },
};

const productionConfig = {
  severity: "error",
  transport: (props: any) => {
    Platform.OS !== 'web' && fileAsyncTransport(props);
    sentryTransport(props);
  },
  transportOptions: {
    FS: FileSystem,
    fileName: `logs_${date}-${month}-${year}.txt`,
    SENTRY: Sentry,
    color: "ansi",
  },
};

let config = developmentConfig;
if (!__DEV__) {
  config = productionConfig;
}

const LOGGER = logger.createLogger(config);

export default LOGGER;