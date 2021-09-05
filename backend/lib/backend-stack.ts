import * as cdk from '@aws-cdk/core';
import * as cognito from '@aws-cdk/aws-cognito';
import * as pinpoint from '@aws-cdk/aws-pinpoint';
import * as location from '@aws-cdk/aws-location';
import { createCognitoIamRoles } from './cognito-auth-roles';

require('dotenv').config({ path: `../envs/.env.${process.env.NODE_ENV}` });

const { CfnOutput } = cdk;

export class BackendStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    /* COGNITO */
    const userPool = new cognito.UserPool(this, 'users', {
      userPoolName: `userpool-${process.env.APP_NAME}-${process.env.NODE_ENV}`,
      standardAttributes: { phoneNumber: { required: true, mutable: true } },
      selfSignUpEnabled: true,
      userVerification: {
        smsMessage: `Your ${process.env.APP_NAME} verification code is {####}`,
      },
      passwordPolicy: {
        requireDigits: false,
        requireUppercase: false,
        requireSymbols: false,
      },
      accountRecovery: cognito.AccountRecovery.PHONE_ONLY_WITHOUT_MFA,
      signInAliases: { phone: true },
      autoVerify: { phone: true },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const userPoolClient = userPool.addClient('app-client', {
      authFlows: {
        userPassword: true,
      },
      refreshTokenValidity: cdk.Duration.days(365),
    });

    const identityPool = new cognito.CfnIdentityPool(this, 'IdentityPool', {
      allowUnauthenticatedIdentities: true,
      cognitoIdentityProviders: [
        {
          clientId: userPoolClient.userPoolClientId,
          providerName: userPool.userPoolProviderName,
        },
      ],
    });

    createCognitoIamRoles(this, identityPool.ref);

    /* RESOURCES */
    const pinpointApp = new pinpoint.CfnApp(this, 'PinpointApp', {
      name: `pinpoint-${process.env.APP_NAME}-${process.env.NODE_ENV}`,
    });

    const placeIndex = new location.CfnPlaceIndex(this, 'PlaceIndex', {
      indexName: `place-${process.env.APP_NAME}-${process.env.NODE_ENV}`,
      dataSource: 'Esri',
      pricingPlan: 'RequestBasedUsage',
    });

    /* OUTPUTS */
    new CfnOutput(this, 'PINPOINT_APP_ID', {
      value: pinpointApp.ref,
    });
    new CfnOutput(this, 'PLACE_INDEX_ID', {
      value: placeIndex.ref,
    });
    new CfnOutput(this, 'USER_POOL_ID', {
      value: userPool.userPoolId,
    });
    new CfnOutput(this, 'USER_POOL_CLIENT_ID', {
      value: userPoolClient.userPoolClientId,
    });
    new CfnOutput(this, 'IDENTITY_POOL_ID', {
      value: identityPool.ref,
    });
  }
}
