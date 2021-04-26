import { verifyToken } from "./verify-token";

const authenticate = async (ctx, next) => {
  try {
    await verifyToken(ctx.request);

    await next();
  } catch (e) {
    ctx.status = 401;
    ctx.body = { message: "Unauthorised" };
  }
};

export default authenticate;
