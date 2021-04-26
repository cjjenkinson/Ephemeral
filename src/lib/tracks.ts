import { createDynamoDbTable } from "./dynamodb";
import { constructUpdateExpression } from "./internal/updateExpression";

const tracksTable = createDynamoDbTable("tracks");

export const createLib = () => {
  const get = async (trackId: string) => {
    const [track] = await tracksTable.queryAll({
      IndexName: "id-index",
      KeyConditionExpression: "id = :trackId",
      ExpressionAttributeValues: {
        ":trackId": trackId,
      },
    });

    if (!track) {
      throw new Error(`Track not found: ${trackId}`);
    }

    return track;
  };

  const create = async ({
    id,
    userId,
    projectId,
    submissionId,
    trackKey,
    duration,
    waveformId,
    waveformKey,
  }: {
    id: string;
    userId: string;
    projectId: string;
    submissionId: string;
    trackKey: string;
    duration?: number;
    waveformId: string;
    waveformKey: string;
    createdAt?: Date;
    updatedAt?: Date;
  }) => {
    return tracksTable.put({
      Item: {
        id,
        userId,
        projectId,
        submissionId,
        trackKey,
        duration,
        waveformId,
        waveformKey,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    });
  };

  const updateWaveform = async ({
    id,
    waveformId,
    waveformKey,
  }: {
    id: string;
    waveformId: string;
    waveformKey: string;
  }) => {
    const [track] = await tracksTable.queryAll({
      IndexName: "id-index",
      KeyConditionExpression: "id = :trackId",
      ExpressionAttributeValues: {
        ":trackId": id,
      },
    });

    if (!track) {
      throw new Error(`Track not found: ${id}`);
    }

    await tracksTable.update({
      ...constructUpdateExpression({
        waveformId,
        waveformKey,
        updatedAt: new Date().toISOString(),
      }),
      Key: {
        id,
      },
    });
  };

  return {
    get,
    create,
    updateWaveform,
  };
};
