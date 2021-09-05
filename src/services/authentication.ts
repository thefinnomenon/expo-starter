import { Auth } from 'aws-amplify';
import * as Random from 'expo-random';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LOGGER from '@/services/logger';
import { StorageKeys } from '@/utilities/constants';

LOGGER.enable('AUTH');
const log = LOGGER.extend('AUTH');

export const getConfig = () => {
  return {
    Auth: {
      region: process.env.AWS_REGION,
      identityPoolId: process.env.AWS_IDENTITY_POOL_ID,
      userPoolId: process.env.AWS_USER_POOL_ID,
      userPoolWebClientId: process.env.AWS_USER_POOL_CLIENT_ID,
      mandatorySignIn: false,
      authenticationFlowType: 'USER_PASSWORD_AUTH',
    },
  };
};

async function isLoggedIn() {
  try {
    await Auth.currentAuthenticatedUser();
    return true;
  } catch {
    return false;
  }
}

export async function logout(): Promise<void> {
  try {
    await Auth.signOut();
  } catch (error) {
    log.error('error signing out: ', error);
  }
}

const generatePassword = async () => {
  const bytes = await Random.getRandomBytesAsync(48);
  /* @ts-ignore */
  return Array.prototype.map
    .call(new Uint8Array(bytes), x => `00${x.toString(16)}`.slice(-2))
    .join('')
    .match(/[a-fA-F0-9]{2}/g)
    .reverse()
    .join('');
};

// In order to simulate passwordless mobile login we
// have to do the following steps,
// 1. Generate a random password
// 2. If new user sign-up is successful, store password
//    to be used later in verification
// 3. If user exists, send password reset verification
// 4. If password reset fails, user never completed
//    initial verification, resend sign-up SMS
// Continued in passwordlessMobileLoginVerify
export const passwordlessMobileLogin = async (mobile: string): Promise<void> => {
  // 1. Generate password
  const password = await generatePassword();
  log.debug(mobile, password);

  // 3. Regular Sign Up
  try {
    log.debug('Attempting user sign-up');
    await Auth.signUp(mobile, password);
    log.info('Sign up successful');
    await AsyncStorage.setItem(StorageKeys.PASSWORD_KEY, password);
    log.debug('Stored password');
  } catch (error: any) {
    log.debug('Sign up error');
    // 4. Forgot Password
    if (error.code === 'UsernameExistsException') {
      log.debug('User exists. attempting to send password reset SMS');
      try {
        await Auth.forgotPassword(mobile);
      } catch (error2: any) {
        log.debug('User never finished verification, resending sign-up SMS');
        // 5. Resend Sign Up Verification
        if (error2.code === 'InvalidParameterException') {
          try {
            await Auth.resendSignUp(mobile);
          } catch (error3) {
            log.debug('Resend Sign Up Failed');
            throw error3;
          }
        } else {
          throw error2;
        }
      }
    } else {
      throw error;
    }
  }
};

// 6.  Try to retrieve stored password
// 7.  If password exists, this is the normal sign-up flow,
//     verify with code and delete password from storage
// 8.  If the password doesn't exist, we are in the forgot
//     password flow, generate and set new password
// 9.  Sign-in
export const passwordlessMobileLoginVerify = async (mobile: string, code: string): Promise<void> => {
  try {
    // 6: Attempt to retrieve password
    let password = await AsyncStorage.getItem(StorageKeys.PASSWORD_KEY);
    log.debug(`Passwordless login: ${mobile}, ${password}, ${code}`);
    if (password) {
      // 7: Normal sign-up verification
      await Auth.confirmSignUp(mobile, code);
      log.debug(`Confirmed ${mobile} with code: ${code}`);
      await AsyncStorage.removeItem(StorageKeys.PASSWORD_KEY);
    } else {
      // 8: Forgot password, generate and set password
      password = await generatePassword();
      await Auth.forgotPasswordSubmit(mobile, code, password);
      log.debug(`Set new password for ${mobile} with code: ${code}`);
    }
    // 9: Sign-in
    const user = await Auth.signIn(mobile, password);
    log.debug('Sign In Successful');
    log.debug(user);
  } catch (error: any) {
    console.log(error);
    switch (error) {
      case 'CodeMismatchException':
        throw Error('Incorrect code. Please try again.');
      default:
        throw Error('Failed to verify code. Please try again.');
    }
  }
};

// Try to send sign up comfirmation and if user is already
// verified, we are in the forgot password flow so we need
// to resend forgot password verification instead.
export const resendConfirmationCode = async (mobile: string): Promise<void> => {
  try {
    await Auth.resendSignUp(mobile);
  } catch (error: any) {
    log.debug(error);
    if (error.message === 'User is already confirmed.') {
      try {
        await Auth.forgotPassword(mobile);
      } catch (error2: any) {
        log.debug(error2);
        throw Error('Failed to resend verification code.');
      }
    } else {
      throw Error('Failed to resend verification code.');
    }
  }
};

export default passwordlessMobileLogin;
