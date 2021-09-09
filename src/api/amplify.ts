import Amplify from 'aws-amplify';
import LOGGER from '@/services/logger';
import awsmobile from '../aws-exports';
import { updateEndpoint } from '@/services/analytics';

LOGGER.enable('AMPLIFY');
const log = LOGGER.extend('AMPLIFY');

export const initAmplify = async (): Promise<void> => {
  Amplify.configure(awsmobile);

  updateEndpoint();

  log.info('Amplify initialized');
};
