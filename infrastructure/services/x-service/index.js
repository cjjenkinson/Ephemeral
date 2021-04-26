const path = require('path');
const cdk = require('@aws-cdk/core');
const { Bucket } = require('@aws-cdk/aws-s3');
const sqs = require('@aws-cdk/aws-sqs');
const lambda = require('@aws-cdk/aws-lambda');
const { SqsEventSource } = require('@aws-cdk/aws-lambda-event-sources');
const iam = require('@aws-cdk/aws-iam');

const createLambdaFunction = require('../../utils/create-lambda-function');

class XService extends cdk.Stack {
  constructor(app, id, { serviceName, stage }) {
    super(app, id);

    const deleteTrackFileHandlerName = 'delete-track-file';
    const deleteTrackFileLambdaConfiguration = {
      app: this,
      id: 'DeleteTrackFileLambda',
      functionName: `project-name-${stage}-${serviceName}-${deleteTrackFileHandlerName}`,
      codeAssetPath: path.resolve(
        __dirname,
        `../../../build/${deleteTrackFileHandlerName}.zip`
      ),
      handler: `${deleteTrackFileHandlerName}.handler`,
      memorySize: 521,
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        STAGE: stage,
        SENTRY_DSN: process.env.SENTRY_DSN,
        AWS_COGNITO_AUTH_URL: process.env.AWS_COGNITO_AUTH_URL,
        X_SERVICE_AWS_COGNITO_ID: process.env.AUDIO_SERVICE_AWS_COGNITO_ID,
        X_SERVICE_AWS_COGNITO_SECRET: process.env.AUDIO_SERVICE_AWS_COGNITO_SECRET,
        GRAPHQL_URL: process.env.GRAPHQL_URL
      },
    };

    const deleteTrackFileLambda = createLambdaFunction(
      deleteTrackFileLambdaConfiguration
    );
  }
}

module.exports = { XService };
