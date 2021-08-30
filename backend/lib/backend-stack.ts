require('dotenv').config({ path: `../envs/.env.${process.env.NODE_ENV}` });
import * as cdk from '@aws-cdk/core';
import * as cognito from "@aws-cdk/aws-cognito";
import { createCognitoIamRoles } from './cognito-auth-roles';
import * as pinpoint from '@aws-cdk/aws-pinpoint';
import * as location from '@aws-cdk/aws-location';

const { CfnOutput } = cdk

export class BackendStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const userPool = new cognito.UserPool(this, "user-pool", {});
    const userPoolClient = new cognito.UserPoolClient(this, "UserPoolClient", {
      userPool,
      generateSecret: false,
    });

    const identityPool = new cognito.CfnIdentityPool(this, "IdentityPool", {
      allowUnauthenticatedIdentities: true,
      cognitoIdentityProviders: [
        {
          clientId: userPoolClient.userPoolClientId,
          providerName: userPool.userPoolProviderName,
        },
      ],
    });

    const pinpointApp = new pinpoint.CfnApp(this, "PinpointApp", {
      name: `pinpoint-${process.env.APP_NAME}-${process.env.NODE_ENV}`
    });

    const placeIndex = new location.CfnPlaceIndex(this, "PlaceIndex", {
      indexName: `place-${process.env.APP_NAME}-${process.env.NODE_ENV}`,
      dataSource: 'Esri',
      pricingPlan: 'RequestBasedUsage'
    })

    createCognitoIamRoles(this, identityPool.ref);

    // Export values
    new CfnOutput(this, "PINPOINT_APP_ID", {
      value: pinpointApp.ref
    });
    new CfnOutput(this, "PLACE_INDEX_ID", {
      value: placeIndex.ref
    });
    new CfnOutput(this, "USER_POOL_ID", {
      value: userPool.userPoolId,
    });
    new CfnOutput(this, "USER_POOL_CLIENT_ID", {
      value: userPoolClient.userPoolClientId,
    });
    new CfnOutput(this, "IDENTITY_POOL_ID", {
      value: identityPool.ref,
    });
  }
}