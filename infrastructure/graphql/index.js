const path = require("path");
const cdk = require("@aws-cdk/core");
const elasticbeanstalk = require("@aws-cdk/aws-elasticbeanstalk");
const iam = require("@aws-cdk/aws-iam");
const s3Assets = require("@aws-cdk/aws-s3-assets");
const {
  HttpApi,
  CorsHttpMethod,
} = require("@aws-cdk/aws-apigatewayv2");
const {
  HttpProxyIntegration,
} = require("@aws-cdk/aws-apigatewayv2-integrations");

class GraphqlServer extends cdk.Stack {
  constructor(app, id, { serviceName, stage }) {
    super(app, id);

    // EBS IAM Roles
    // This creates an IAM role with the AWSElasticBeanstalkWebTier managed IAM policy attached
    const EbInstanceRole = new iam.Role(
      this,
      `${serviceName}-${stage}-aws-elasticbeanstalk-ec2-role`,
      {
        assumedBy: new iam.ServicePrincipal("ec2.amazonaws.com"),
      }
    );

    const managedPolicy = iam.ManagedPolicy.fromAwsManagedPolicyName(
      "AWSElasticBeanstalkWebTier"
    );
    EbInstanceRole.addManagedPolicy(managedPolicy);

    const profileName = `${serviceName}-${stage}-InstanceProfile`;
    const instanceProfile = new iam.CfnInstanceProfile(this, profileName, {
      instanceProfileName: profileName,
      roles: [EbInstanceRole.roleName],
    });

    // EBS Application and Environment
    const node = this.node;
    const platform = node.tryGetContext("platform");

    // Construct an S3 asset from the ZIP located from directory up.
    const elbZipArchive = new s3Assets.Asset(this, "GraphqlElbAppZip", {
      path: path.resolve(__dirname, `../../build-server/server.zip`),
    });

    const graphqlElasticbeanstalkApplication = new elasticbeanstalk.CfnApplication(
      this,
      "GraphqlApplication",
      {
        applicationName: `${serviceName}-${stage}-app`,
      }
    );

    const appVersionProps = new elasticbeanstalk.CfnApplicationVersion(
      this,
      "GraphqlAppVersion",
      {
        applicationName: `${serviceName}-${stage}-app`,
        sourceBundle: {
          s3Bucket: elbZipArchive.s3BucketName,
          s3Key: elbZipArchive.s3ObjectKey,
        },
      }
    );

    const envVars = [
      ["aws:elasticbeanstalk:cloudwatch:logs", "StreamLogs", "true"],
      ["aws:elasticbeanstalk:cloudwatch:logs", "DeleteOnTerminate", "true"],
      ["aws:elasticbeanstalk:cloudwatch:logs", "RetentionInDays", "1"],
      [
        "aws:elasticbeanstalk:application:environment",
        "AWS_ACCESS_KEY_ID",
        process.env.AWS_ACCESS_KEY_ID,
      ],
      [
        "aws:elasticbeanstalk:application:environment",
        "AWS_SECRET_ACCESS_KEY",
        process.env.AWS_SECRET_ACCESS_KEY,
      ],
      [
        "aws:elasticbeanstalk:application:environment",
        "S3_AWS_ACCESS_KEY_ID",
        process.env.S3_AWS_ACCESS_KEY_ID,
      ],
      [
        "aws:elasticbeanstalk:application:environment",
        "S3_AWS_SECRET_ACCESS_KEY",
        process.env.S3_AWS_SECRET_ACCESS_KEY,
      ],
      [
        "aws:elasticbeanstalk:application:environment",
        "AWS_REGION",
        process.env.AWS_REGION,
      ],
      ["aws:elasticbeanstalk:application:environment", "STAGE", stage],
      ["aws:elasticbeanstalk:application:environment", "NODE_ENV", stage],
      ["aws:elasticbeanstalk:application:environment", "PORT", "8080"],
      [
        "aws:elasticbeanstalk:application:environment",
        "BYPASS_AUTH",
        "false",
      ],
      [
        "aws:elasticbeanstalk:application:environment",
        "DATABASE_URL",
        process.env.DATABASE_URL,
      ],
      [
        "aws:elasticbeanstalk:application:environment",
        "SENTRY_DSN",
        process.env.SENTRY_DSN,
      ],
      [
        "aws:elasticbeanstalk:application:environment",
        "S3_AUDIO_UPLOADS_BUCKET",
        process.env.S3_AUDIO_UPLOADS_BUCKET,
      ],
      [
        "aws:elasticbeanstalk:application:environment",
        "S3_USER_ASSETS_BUCKET",
        process.env.S3_USER_ASSETS_BUCKET,
      ],
      [
        "aws:elasticbeanstalk:application:environment",
        "AUDIO_CLOUDFRONT_URL",
        process.env.AUDIO_CLOUDFRONT_URL,
      ],
      [
        "aws:elasticbeanstalk:application:environment",
        "AUDIO_DELETE_TRACK_FILE_SQS_QUEUE",
        process.env.AUDIO_DELETE_TRACK_FILE_SQS_QUEUE,
      ],
      [
        "aws:elasticbeanstalk:application:environment",
        "AUDIO_PROCESS_WAVEFORM_SQS_QUEUE",
        process.env.AUDIO_PROCESS_WAVEFORM_SQS_QUEUE,
      ],
      [
        "aws:elasticbeanstalk:application:environment",
        "SENDGRID_API_KEY",
        process.env.SENDGRID_API_KEY,
      ],
      [
        "aws:elasticbeanstalk:application:environment",
        "SENDGRID_MARKETING_CONTACT_LISTS__SENDERS",
        process.env.SENDGRID_MARKETING_CONTACT_LISTS__SENDERS,
      ],
      [
        "aws:elasticbeanstalk:application:environment",
        "SENDGRID_TEMPLATE_ID__SUBMISSION_REVIEW_COMPLETE",
        process.env.SENDGRID_TEMPLATE_ID__SUBMISSION_REVIEW_COMPLETE,
      ],
      [
        "aws:elasticbeanstalk:application:environment",
        "SENDGRID_TEMPLATE_ID__SUBMISSION_SENT",
        process.env.SENDGRID_TEMPLATE_ID__SUBMISSION_SENT,
      ],
      [
        "aws:elasticbeanstalk:application:environment",
        "SENDGRID_TEMPLATE_ID__SUBMISSION_RECEIVED",
        process.env.SENDGRID_TEMPLATE_ID__SUBMISSION_RECEIVED,
      ],
      [
        "aws:elasticbeanstalk:application:environment",
        "SLACK_NEW_SUBMISSION_WEBHOOK",
        process.env.SLACK_NEW_SUBMISSION_WEBHOOK,
      ],
      [
        "aws:elasticbeanstalk:application:environment",
        "INVITATION_TOKEN_SECRET",
        process.env.INVITATION_TOKEN_SECRET,
      ],
      [
        "aws:elasticbeanstalk:application:environment",
        "STRIPE_SECRET_API_KEY",
        process.env.STRIPE_SECRET_API_KEY,
      ],
      [
        "aws:elasticbeanstalk:application:environment",
        "AWS_COGNITO_USER_POOL_ID",
        process.env.AWS_COGNITO_USER_POOL_ID,
      ],
    ];

    // Configure auto-scaling: https://github.com/kts102121/cdk-elasticbeanstalk-examples/blob/master/lib/elasticbeanstalk-stack.ts
    const options = [
      {
        namespace: "aws:autoscaling:launchconfiguration",
        optionName: "IamInstanceProfile",
        value: profileName,
      },
      {
        namespace: "aws:autoscaling:launchconfiguration",
        optionName: "InstanceType",
        value: "t3.micro",
      },
      {
        namespace: "aws:elasticbeanstalk:environment",
        optionName: "EnvironmentType",
        value: "SingleInstance",
      },
      {
        namespace: "aws:elasticbeanstalk:command",
        optionName: "DeploymentPolicy",
        value: "Immutable",
      },
      ...envVars.map(([namespace, optionName, value]) => ({
        namespace,
        optionName,
        value,
      })),
    ];

    const graphqlEnvironment = new elasticbeanstalk.CfnEnvironment(
      this,
      "GraphqlEnvironment",
      {
        environmentName: `${serviceName}-${stage}-environment`,
        applicationName: `${serviceName}-${stage}-app`,
        platformArn: platform,
        solutionStackName: "64bit Amazon Linux 2 v5.3.1 running Node.js 14",
        optionSettings: options,
        versionLabel: appVersionProps.ref,
      }
    );

    appVersionProps.addDependsOn(graphqlElasticbeanstalkApplication);

    const graphqlIntegration = new HttpProxyIntegration({
      url: `${process.env.GRAPHQL_URL}/{proxy}`,
    });

    const httpApi = new HttpApi(this, 'GraphqlApi', {
      apiName: `${serviceName}-${stage}-api`,
      corsPreflight: {
        allowHeaders: ['authorization', 'client_id'],
        allowMethods: [CorsHttpMethod.GET, CorsHttpMethod.HEAD, CorsHttpMethod.OPTIONS, CorsHttpMethod.POST],
        allowOrigins: ['*'],
        maxAge: cdk.Duration.days(10),
      },
    });

    httpApi.addRoutes({
      path: '/{proxy+}',
      methods: ['ANY'],
      integration: graphqlIntegration,
    });
  }
}

module.exports = { GraphqlServer };
