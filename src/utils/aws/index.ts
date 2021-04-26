import { createS3Client } from "./s3";
import { createSQSClient } from "./sqs";

const s3 = createS3Client();
const sqs = createSQSClient();

export default {
  s3,
  sqs,
};
