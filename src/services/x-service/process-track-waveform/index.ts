import fetch from "node-fetch";
import childProcess from "child_process";
import uuidv4 from "uuid/v4";
import fs from "fs";
import path from "path";
import os from "os";

import { createS3Client } from "../../../utils/aws/s3";
import GraphqlClient from "../../../utils/graphql-client";

import { lambdaWrapper } from "../../../utils/handler-wrapper";
import getConfig from "../../../utils/config";

import { parseMessageBody } from "../../../utils/helpers";

import getTrackByIdQuery from "../_shared/getTrackByIdQuery.graphql";
import updateTrackByIdMutation from "../_shared/updateTrackByIdMutation.graphql";

import customConfig from "./config";

const createClients = (config: any) => ({
  s3: createS3Client(),
  graphql: new GraphqlClient({
    clientId: config.AUDIO_SERVICE_AWS_COGNITO_ID,
    clientSecret: config.AUDIO_SERVICE_AWS_COGNITO_SECRET,
    authUrl: config.AWS_COGNITO_AUTH_URL,
    graphQLUrl: config.GRAPHQL_URL,
  }),
});

process.env.PATH =
  process.env.PATH + ":" + process.env.LAMBDA_TASK_ROOT + "/bin";

const pixelPerSecond = 100;
const bits = 8;
const ext = "json";

const getExtension = (filename: string) => {
  const ext = path.extname(filename || "").split(".");

  return ext[ext.length - 1];
};

async function processTrackWaveform(event, { logger }) {
  const config = getConfig(customConfig);

  const clients = createClients(config);

  try {
    const { Records } = event;

    const sqsRecords = parseMessageBody(Records);

    if (!sqsRecords.length) {
      throw new Error(`No SQS records to process: ${sqsRecords}`);
    }

    const { trackId } = sqsRecords[0];

    if (!trackId) {
      throw new Error(
        "Process track waveform SQS message error :: trackId is required"
      );
    }

    logger.info(`Retrieving track file :: Track id ${trackId}`);

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

    const track = getTrackById;

    if (track.state === 'COMPLETE' && track.waveformId) {
      throw new Error('Track waveform has already been processed');
    }

    // Get the track file
    const trackObject = await clients.s3.get({
      bucket: config.S3_AUDIO_UPLOADS_BUCKET,
      key: trackKey,
    });

    if (!trackObject) {
      throw new Error(`Track object does not exist :: ${trackKey}`);
    }

    logger.info(`Processing track waveform :: Track key ${trackKey}`);

    // Input variable for creating waveform from track saved to tmp directory
    const tempWriteDirectory = process.env["TEMP"] || os.tmpdir();
    const localFileName = path.join(
      tempWriteDirectory,
      `${trackId}.${getExtension(trackKey)}`
    );

    // Output variables for saving waveform to S3
    const creatableWaveformId = uuidv4();
    const resFile = `${creatableWaveformId}.${ext}`;
    const resPath = path.join(tempWriteDirectory, resFile);
    const creatableWaveformKey = `waveforms/${trackId}/${creatableWaveformId}.${ext}`;

    // Generate audiowaveform arguments
    const args = [
      "-i",
      localFileName,
      "--no-axis-labels",
      "--pixels-per-second",
      pixelPerSecond,
      "-b",
      bits,
      "-o",
      resPath,
    ];

    // Write track file to tmp disk
    fs.writeFileSync(localFileName, trackObject.Body);

    // Generate waveform
    const stout = childProcess.execFileSync("/opt/audiowaveform", args, {});

    const waveformOutputData = fs.readFileSync(resPath);

    logger.info(
      `Saving waveform to S3 :: Waveform key ${creatableWaveformKey}`
    );

    const uploadParams = {
      bucket: config.S3_AUDIO_UPLOADS_BUCKET,
      key: creatableWaveformKey,
      file: waveformOutputData,
    };

    await clients.s3.put(uploadParams);

    logger.info(`Storing track :: Waveform ID ${creatableWaveformId}`);

    // Clean up /tmp folder
    try {
      fs.unlinkSync(localFileName);
    } catch (err) {
      console.log(`Failed to unlink the temporary file :: ${err.message}`);
    }

    const updateResponse = await clients.graphql.query({
      query: updateTrackByIdMutation,
      variables: {
        id: trackId,
        waveformId: creatableWaveformId,
        waveformKey: creatableWaveformKey,
        state: 'COMPLETE'
      },
    });

    console.log(updateResponse);

    const updateTrackById = updateResponse?.data;

    if (updateTrackById.errors) {
      throw new Error(`${updateTrackById.errors.map(message => message)}`);
    }

    logger.info(
      `Track updated waveform :: Track Id - ${trackId} Waveform Id - ${creatableWaveformId}`
    );

    return creatableWaveformId;
  } catch (error) {
    logger.error(error.message);

    throw error;
  }
}

const options = {
  name: "process-track-waveform",
};

export const handler = lambdaWrapper(
  async (event, context) => processTrackWaveform(event, context),
  options
);
