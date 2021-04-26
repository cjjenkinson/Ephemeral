import { SQS } from "aws-sdk";

import batcher from "../batcher";

const SQS_SEND_MESSAGE_BATCH_SIZE = 10;

export const SQSBatcher = batcher(SQS_SEND_MESSAGE_BATCH_SIZE);

export const createSQSClient = () => {
  const client = new SQS({
    maxRetries: 5,
    signatureVersion: "v4",
    useAccelerateEndpoint: true,
  });

  const sendMessageBatch = async (queueUrl: string, messageBody: any) => {
    try {
      const params = {
        QueueUrl: queueUrl,
        Entries: messageBody,
      };

      const response = await client.sendMessageBatch(params).promise();

      if (response.Failed && response.Failed.length) {
        const failures = response.Failed.map((failure) =>
          JSON.stringify(failure)
        ).join("\n");

        if (response.Failed.length < params.Entries.length) {
          throw new Error(`Some SQS messages failed to send: ${failures}`);
        } else {
          throw new Error(`All SQS messages failed to send: ${failures}`);
        }
      }

      return response.Successful.map(({ Id: id, MessageId: messageId }) => ({
        id,
        messageId,
      }));
    } catch (error) {
      throw new Error(`Error adding messages to SQS ${error}`);
    }
  };

  const sendMessage = async (queueUrl: string, messageBody: any) => {
    try {
      const params = {
        QueueUrl: queueUrl,
        MessageBody: JSON.stringify(messageBody),
      };

      await client.sendMessage(params).promise();
    } catch (error) {
      throw new Error(`Error adding message to SQS ${error}`);
    }
  };

  return {
    sendMessage,
    sendMessageBatch,
  };
};
