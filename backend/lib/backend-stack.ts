import * as cdk from '@aws-cdk/core';
import * as cognito from '@aws-cdk/aws-cognito';
import * as pinpoint from '@aws-cdk/aws-pinpoint';
import * as location from '@aws-cdk/aws-location';
import * as appsync from '@aws-cdk/aws-appsync';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import { AppSyncTransformer } from 'cdk-appsync-transformer';

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
    /* PINPOINT */
    const pinpointApp = new pinpoint.CfnApp(this, 'PinpointApp', {
      name: `pinpoint-${process.env.APP_NAME}-${process.env.NODE_ENV}`,
    });

    /* LOCATION */
    const placeIndex = new location.CfnPlaceIndex(this, 'PlaceIndex', {
      indexName: `place-${process.env.APP_NAME}-${process.env.NODE_ENV}`,
      dataSource: 'Esri',
      pricingPlan: 'RequestBasedUsage',
    });

    /* APPSYNC */
    const api = new AppSyncTransformer(this, `${process.env.APP_NAME}-${process.env.NODE_ENV}`, {
      schemaPath: '../src/schema.graphql',
      authorizationConfig: {
        defaultAuthorization: {
          // Authenticated User Access
          authorizationType: appsync.AuthorizationType.USER_POOL,
          userPoolConfig: {
            userPool,
          },
        },
        additionalAuthorizationModes: [
          {
            // Unauthenticated User Access
            authorizationType: appsync.AuthorizationType.API_KEY,
            apiKeyConfig: {
              name: `unauth-apiKey-${process.env.APP_NAME}-${process.env.NODE_ENV}`,
              description: 'unauthenticated user access',
              expires: cdk.Expiration.after(cdk.Duration.days(365)),
            },
          },
          {
            // Lambda Access
            authorizationType: appsync.AuthorizationType.IAM,
          },
        ],
      },
      xrayEnabled: true,
    });

    /* OUTPUTS */
    new CfnOutput(this, 'pinpointAppIDOutput', {
      value: pinpointApp.ref,
    });
    new CfnOutput(this, 'placeIndexIDOutput', {
      value: placeIndex.ref,
    });
    new CfnOutput(this, 'userPoolIDOutput', {
      value: userPool.userPoolId,
    });
    new CfnOutput(this, 'userPoolClientIDOutput', {
      value: userPoolClient.userPoolClientId,
    });
    new CfnOutput(this, 'identityPoolIDOutput', {
      value: identityPool.ref,
    });
    new cdk.CfnOutput(this, 'appsyncApiIDOutput', {
      value: api.appsyncAPI.apiId,
    });
    new cdk.CfnOutput(this, 'appsyncURLOutput', {
      value: api.appsyncAPI.graphqlUrl,
    });
    new cdk.CfnOutput(this, 'appsyncApiKeyOutput', {
      value: api.appsyncAPI.apiKey || '',
    });
  }
}
