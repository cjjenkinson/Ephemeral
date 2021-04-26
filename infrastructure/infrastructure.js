#!/usr/bin/env node

const dotenv = require('dotenv');

dotenv.config();

const cdk = require('@aws-cdk/core');

const { Dynamo } = require('./core/dynamo');
const { Storage } = require('./core/storage');
const { Cognito } = require('./core/cognito');

const { GraphqlServer } = require('./graphql');

const { XService } = require('./services/x-service');

const app = new cdk.App();

const stage = process.env.STAGE;

const isDevelopment = stage !== 'production';

const env = {
  account: process.env.AWS_ACCOUNT_ID,
  region: 'eu-west-1',
  isDevelopment,
};

// Core
new Dynamo(app, `${stage}-Dynamo`, {
  serviceName: 'dynamo',
  env,
  stage,
});

new Storage(app, `${stage}-Storage`, {
  serviceName: 'storage',
  env,
  stage,
});

new Cognito(app, `${stage}-Cognito`, {
  serviceName: 'cognito',
  env,
  stage,
});

// Apps
new GraphqlServer(app, `${stage}-Graphql`, {
  serviceName: 'graphql',
  env,
  stage,
});

// Services
new XService(app, `${stage}-XService`, {
  serviceName: 'x',
  env,
  stage,
  dependencies: {},
});

app.synth();
