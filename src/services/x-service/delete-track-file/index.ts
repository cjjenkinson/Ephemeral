import { lambdaWrapper } from "../../../utils/handler-wrapper";
import getConfig from "../../../utils/config";

import { createS3Client } from "../../../utils/aws/s3";
import GraphqlClient from "../../../utils/graphql-client";

import { parseMessageBody } from "../../../utils/helpers";

import getTrackByIdQuery from "../_shared/getTrackByIdQuery.graphql";

import customConfig from "./config";

const createClients = (config) => ({
  s3: createS3Client(),
  graphql: new GraphqlClient({
    clientId: config.AUDIO_SERVICE_AWS_COGNITO_ID,
    clientSecret: config.AUDIO_SERVICE_AWS_COGNITO_SECRET,
    authUrl: config.AWS_COGNITO_AUTH_URL,
    graphQLUrl: config.GRAPHQL_URL,
  }),
});

const deleteTrackFile = async (event: any, { logger }: any) => {
  const config = getConfig(customConfig);

  const clients = createClients(config);

  try {
    if (!process.env.S3_AUDIO_UPLOADS_BUCKET) {
      throw new Error('Invalid S3 bucket name');
    }

    const { Records } = event;

    const sqsRecords = parseMessageBody(Records);

    if (!sqsRecords.length) {
      throw new Error(`No SQS records to process: ${sqsRecords}`);
    }

    const { trackId } = sqsRecords[0];

    if (!trackId) {
      throw new Error("Invalid SQS payload :: missing trackId");
    }

    logger.info(`Deleting track file :: ${trackId}`);

    const response = await clients.graphql.query({
      query: getTrackByIdQuery,
      variables: {
        id: trackId
      },
    });

    console.log(response);

    const getTrackById = response?.data;

    if (!getTrackById) {
      throw new Error(`Track does not exist :: ${trackId}`);
    }

    const { trackKey, waveformKey } = getTrackById;

    if (!trackKey) {
      throw new Error(`Track key not exist :: ${trackId}`);
    }

    await clients.s3.deleteObject({
      bucket: process.env.S3_AUDIO_UPLOADS_BUCKET,
      key: trackKey,
    });

    if (waveformKey) {
      await clients.s3.deleteObject({
        bucket: process.env.S3_AUDIO_UPLOADS_BUCKET,
        key: waveformKey,
      });
    }

    return logger.info(`Track deletion complete :: ${trackId}`);
  } catch (error) {
    logger.error(error.message);

    throw error;
  }
};

const options = {
  name: "delete-track-file",
};

export const handler = lambdaWrapper(
  async (event, context) => deleteTrackFile(event, context),
  options
);
