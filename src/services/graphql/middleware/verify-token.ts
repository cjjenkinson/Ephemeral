import { verifierFactory } from "@southlane/cognito-jwt-verifier";

export class AuthenticationError extends Error {}

export const createTokenVerifier = (appClientId: string) => {
  const verifier = verifierFactory({
    region: "eu-west-1",
    userPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
    appClientId: appClientId,
    tokenType: "access",
  });

  return verifier;
};

export const verifyToken = async (request) => {
  try {
    if (process.env.BYPASS_AUTH) {
      return {
        userId: request.header.user_id || null
      }
    }
    
    if (!request.header.authorization) {
      throw new AuthenticationError("Unauthorized");
    }

    const buffer = Buffer.from(request.header.authorization, 'base64');
    const authorization = buffer.toString('utf-8');

    const [accessToken, clientId, userId] = authorization.split(":");

    if (!accessToken || !clientId) {
      throw new AuthenticationError("Unauthorized");
    }

    const verifier = createTokenVerifier(clientId);

    const decoded = await verifier.verify(accessToken);

    if (!decoded) {
      throw new AuthenticationError("Unauthorized");
    }

    return {
      ...decoded,
      userId,
    };
  } catch (error) {
    if (error.message.includes("JWT verification")) {
      throw new AuthenticationError("Unauthorized");
    }

    throw error;
  }
};
