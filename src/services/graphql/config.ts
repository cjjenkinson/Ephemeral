export interface ConfigInterface {
  NODE_ENV: string;
  STAGE: string;
  DATABASE_URL: string;
  BYPASS_AUTH: boolean;
  SENTRY_DSN: string;
  SENDGRID_API_KEY: string;
  SENDGRID_MARKETING_CONTACT_LISTS__SENDERS: string;
  SLACK_NEW_SUBMISSION_WEBHOOK: string;
  STRIPE_SECRET_API_KEY: string;
  INVITATION_TOKEN_SECRET: string;
  AWS_COGNITO_USER_POOL_ID: string;
}

export default {
  NODE_ENV: {
    doc: "Application environment",
    format: ["production", "development"],
    default: "development",
  },
  STAGE: {
    doc: "Deployment development stage",
    format: String,
    default: "",
  },
  DATABASE_URL: {
    doc: "Database URL",
    format: String,
    default: "",
  },
  BYPASS_AUTH: {
    doc: "Bypass authentication middleware",
    format: Boolean,
    default: "",
  },
  SENTRY_DSN: {
    doc: "Sentry ingest URL",
    format: String,
    default: "",
  },
  SENDGRID_API_KEY: {
    doc: "Sendgrid API key",
    format: String,
    default: null,
  },
  SENDGRID_MARKETING_CONTACT_LISTS__SENDERS: {
    doc: "Sendgrid marketing contact list id",
    format: String,
    default: null,
  },
  SLACK_NEW_SUBMISSION_WEBHOOK: {
    doc: "Slack hook for new submissions",
    format: String,
    default: null,
  },
  INVITATION_TOKEN_SECRET: {
    doc: "Authentication token secret to invitations",
    format: String,
    default: null,
  },
  STRIPE_SECRET_API_KEY: {
    doc: "Stripe key",
    format: String,
    default: null,
  },
  AWS_COGNITO_USER_POOL_ID: {
    doc: "Cognito user pool id",
    format: String,
    default: null,
  },
};
