import * as cdk from '@aws-cdk/core';
import * as iam from '@aws-cdk/aws-iam';
import * as cognito from '@aws-cdk/aws-cognito';

require('dotenv').config({ path: `../envs/.env.${process.env.NODE_ENV}` });

const pinpointPutEventsPolicy = new iam.PolicyStatement({
  effect: iam.Effect.ALLOW,
  actions: ['mobiletargeting:PutEvents', 'mobiletargeting:UpdateEndpoint'],
  resources: ['arn:aws:mobiletargeting:*:*:apps/*'],
});

const geoSearchPlaceIndexForTextPolicy = new iam.PolicyStatement({
  effect: iam.Effect.ALLOW,
  actions: ['geo:SearchPlaceIndexForPosition'],
  resources: [`arn:aws:geo:*:*:place-index/place-${process.env.APP_NAME}-${process.env.NODE_ENV}`],
});

const getRole = (identityPoolRef: string, authed: boolean) => ({
  assumedBy: new iam.FederatedPrincipal(
    'cognito-identity.amazonaws.com',
    {
      StringEquals: {
        'cognito-identity.amazonaws.com:aud': identityPoolRef,
      },
      'ForAnyValue:StringLike': {
        'cognito-identity.amazonaws.com:amr': authed ? 'authenticated' : 'unauthenticated',
      },
    },
    'sts:AssumeRoleWithWebIdentity',
  ),
});

export const createCognitoIamRoles = (scope: cdk.Construct, identityPoolRef: string) => {
  const authedRole = new iam.Role(scope, 'CognitoAuthenticatedRole', getRole(identityPoolRef, true));
  const unAuthedRole = new iam.Role(scope, 'CognitoUnAuthenticatedRole', getRole(identityPoolRef, false));
  authedRole.addToPolicy(pinpointPutEventsPolicy);
  unAuthedRole.addToPolicy(pinpointPutEventsPolicy);
  authedRole.addToPolicy(geoSearchPlaceIndexForTextPolicy);
  unAuthedRole.addToPolicy(geoSearchPlaceIndexForTextPolicy);

  new cognito.CfnIdentityPoolRoleAttachment(scope, 'IdentityPoolRoleAttachment', {
    identityPoolId: identityPoolRef,
    roles: {
      authenticated: authedRole.roleArn,
      unauthenticated: unAuthedRole.roleArn,
    },
  });
};
