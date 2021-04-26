const {
  CfnUserPoolResourceServer,
  OAuthScope,
  UserPool,
} = require('@aws-cdk/aws-cognito');
const cdk = require('@aws-cdk/core');

class Cognito extends cdk.Stack {
  constructor(app, id, { stage }) {
    super(app, id);

    const pool = new UserPool(this, `${stage}-project-name-userpool`, {
      userPoolName: `${stage}-userpool`,
    });

    new CfnUserPoolResourceServer(this, `${stage}-project-name-userpool-resource-server`, {
      identifier: "<PROJECT-NAME>",
      name: `${stage}-project-name-userpool-resource-server`,
      userPoolId: pool.userPoolId,
      scopes: [
        {
          scopeDescription: "Read all operations",
          scopeName: "read:all",
        },
        {
          scopeDescription: "write all operations",
          scopeName: "write:all",
        },
      ],
    });

    pool.addDomain(`${stage}-project-name-userpool-domain`, {
      cognitoDomain: {
        domainPrefix: `${stage}-project-name-userpool`,
      },
    });

    pool.addClient("<PROJECT-NAME>-app", {
      generateSecret: true,
      oAuth: {
        flows: {
          clientCredentials: true,
        },
        scopes: [OAuthScope.custom("<PROJECT-NAME></PROJECT-NAME>/read:all"), OAuthScope.custom("<PROJECT-NAME>/write:all")],
      },
    });

    pool.addClient("audio-service", {
      generateSecret: true,
      oAuth: {
        flows: {
          clientCredentials: true,
        },
        scopes: [OAuthScope.custom("<PROJECT-NAME>/read:all"), OAuthScope.custom("<PROJECT-NAME>/write:all")],
      },
    });
  }
}

module.exports = { Cognito };