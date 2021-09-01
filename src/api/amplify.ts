import Amplify from 'aws-amplify';
import LOGGER from '@/services/logger';
import { getConfig } from '@/services/analytics';

LOGGER.enable('AMPLIFY');
const log = LOGGER.extend('AMPLIFY');

export const initAmplify = async () => {
  const analyticsConfig = await getConfig();
  log.debug(JSON.stringify(analyticsConfig, null, 2));

  Amplify.configure({
    Auth: {
      region: process.env.AWS_REGION,
      identityPoolId: process.env.AWS_ANALYTICS_IDENTITY_POOL_ID,
      mandatorySignIn: false,
    },
    ...analyticsConfig,
  });

  log.info('Amplify initialized');
};
