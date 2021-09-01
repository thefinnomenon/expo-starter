/* https://github.com/onubo/react-native-logs#configuration */
import { Platform } from 'react-native';
import { logger, consoleTransport, fileAsyncTransport, sentryTransport } from 'react-native-logs';
import * as FileSystem from 'expo-file-system';
import Sentry from '@/services/sentry';

const today = new Date();
const date = today.getDate();
const month = today.getMonth() + 1;
const year = today.getFullYear();

const developmentConfig = {
  severity: 'debug',
  transport: consoleTransport,
  transportOptions: {
    color: 'ansi',
  },
};

const productionConfig = {
  severity: 'error',
  transport: (props: any) => {
    // eslint-disable-next-line
    Platform.OS !== 'web' ? fileAsyncTransport(props) : null;
    sentryTransport(props);
  },
  transportOptions: {
    FS: FileSystem,
    fileName: `logs_${date}-${month}-${year}.txt`,
    SENTRY: Sentry,
    color: 'ansi',
  },
};

let config = developmentConfig;
if (!__DEV__) {
  config = productionConfig;
}

const LOGGER = logger.createLogger(config);

export default LOGGER;
