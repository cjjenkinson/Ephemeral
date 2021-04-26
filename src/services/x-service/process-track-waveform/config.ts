export interface ConfigInterface {
  STAGE: string;
  NODE_ENV: string;
  SENTRY_DSN: string;
  S3_AUDIO_UPLOADS_BUCKET: string;
  AWS_COGNITO_AUTH_URL: string;
  AUDIO_SERVICE_AWS_COGNITO_ID: string;
  AUDIO_SERVICE_AWS_COGNITO_SECRET: string;
  GRAPHQL_URL: string;
}

export default {
  STAGE: {
    doc: "Deployment stage",
    format: String,
    default: "development",
  },
  NODE_ENV: {
    doc: "Application environment",
    format: ["production", "development"],
    default: "development",
  },
  SENTRY_DSN: {
    doc: "Sentry ingest URL",
    format: String,
    default: "",
  },
  S3_AUDIO_UPLOADS_BUCKET: {
    doc: "Audio uploads s3 bucket",
    format: String,
    default: null,
  },
  AWS_COGNITO_AUTH_URL: {
    doc: "oAuth token generation endpoint",
    format: String,
    default: null,
  },
  AUDIO_SERVICE_AWS_COGNITO_ID: {
    doc: "Audio service oAuth client id",
    format: String,
    default: null,
  },
  AUDIO_SERVICE_AWS_COGNITO_SECRET: {
    doc: "Audio service oAuth client secret",
    format: String,
    default: null,
  },
  GRAPHQL_URL: {
    doc: "Graphql endpoiint",
    format: String,
    default: null,
  }
};
