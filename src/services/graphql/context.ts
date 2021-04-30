import SlackWebhook from "slack-webhook";

import awsClients from "../../utils/aws";
import SendGrid from "../../utils/email";

import prisma from "./prisma";
import { createLibs } from "../../lib";

export type GraphQLContext = {
  origin: string;
  config: any;
  headers: any;
  currentTime: any;
  user: any;
  services: {
    sendgrid: SendGrid;
    s3: any;
    sqs: any;
  };
  prisma: any;
  libs: any;
};
const createServices = (config) => {
  const { s3, sqs } = awsClients;

  const sendgrid = new SendGrid({
    SENDGRID_API_KEY: config.SENDGRID_API_KEY,
  });

  const slack = new SlackWebhook(
    "https://hooks.slack.com/services/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"
  );

  return {
    s3,
    sqs,
    sendgrid,
    slack,
  };
};

export default ({ auth, user }: any, config: any) => {
  const currentTime = new Date();

  const services = createServices(config);
  const libs = createLibs();

  return {
    origin: config.ORIGIN,
    auth,
    config,
    currentTime,
    user,
    services,
    prisma,
    libs,
  };
};
