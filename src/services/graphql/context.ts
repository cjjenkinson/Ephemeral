import SlackWebhook from "slack-webhook";

import awsClients from "../../utils/aws";
import EmailClient from "../../utils/email";

import prisma from "./prisma";
import { createLibs } from "../../lib";

export type context = {
  config: any;
  headers: any;
  currentTime: any;
  user: any;
  services: {
    s3;
    sqs;
  };
  prisma: any;
  libs: any;
};
const createServices = (config) => {
  const { s3, sqs } = awsClients;

  const email = new EmailClient({
    SENDGRID_API_KEY: config.SENDGRID_API_KEY,
  });

  return {
    s3,
    sqs,
    email,
  };
};

export default ({ auth, user }: any, config: any) => {
  const currentTime = new Date();

  const services = createServices(config);
  const libs = createLibs();

  return {
    auth,
    config,
    currentTime,
    user,
    services,
    prisma,
    libs,
  };
};
