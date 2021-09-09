#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { BackendStack } from '../lib/backend-stack';

require('dotenv').config({ path: `../envs/.env.${process.env.NODE_ENV}` });

const app = new cdk.App();
new BackendStack(app, `BackendStack-${process.env.APP_NAME}-${process.env.NODE_ENV}`, {});
