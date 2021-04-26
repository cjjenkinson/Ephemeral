import { verifierFactory } from "@southlane/cognito-jwt-verifier";

class AuthorizationError extends Error {}

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
    if (!request.header.client_id) {
      throw new AuthorizationError("Invalid client id header");
    }

    if (!request.header.authorization) {
      throw new AuthorizationError("Invalid authorization header");
    }

    const verifier = createTokenVerifier(request.header.client_id);

    const accessToken = request.header.authorization.split(" ")[1];

    const decoded = await verifier.verify(accessToken);

    if (!decoded) {
      throw new AuthorizationError("Unauthorized");
    }

    return decoded;
  } catch (error) {
    if (error.message.includes("JWT verification")) {
      throw new AuthorizationError("Unauthorized");
    }

    throw new AuthorizationError(error.message);
  }
};
