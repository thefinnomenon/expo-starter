import Amplify from 'aws-amplify';
import LOGGER from '@/services/logger';
import { getConfig as getAuthenticationConfig } from '@/services/authentication';
import { getConfig as getAnalyticsConfig } from '@/services/analytics';

LOGGER.enable('AMPLIFY');
const log = LOGGER.extend('AMPLIFY');

export const initAmplify = async (): Promise<void> => {
  const authenticationConfig = getAuthenticationConfig();
  const analyticsConfig = await getAnalyticsConfig();

  Amplify.configure({
    ...authenticationConfig,
    ...analyticsConfig,
  });

  log.info('Amplify initialized');
};
