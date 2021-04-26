/* eslint-disable no-console */

import dotenv from "dotenv";

import * as Sentry from "@sentry/node";
import Koa from "koa";
import helmet from "koa-helmet";
import cors from "@koa/cors";
import logger from "koa-logger";
import { ApolloServer, ApolloError } from "apollo-server-koa";

import { verifyToken } from "./middleware/verify-token";
import getConfig from "../../utils/config";
import runner from "../../utils/runner";

import customConfig from "./config";
import { schema } from "./schema";
import createContext from "./context";
import prisma from "./prisma";

dotenv.config();

if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 1.0,
    environment: process.env.NODE_ENV || "development", // Set environment to development by default
  });
}

async function server(config: any) {
  const isDevelopment = config.NODE_ENV !== "production";

  const app = new Koa();

  app.use(helmet());
  app.use(cors());
  app.use(logger());

  // verify origin is one of localhost or trackstack

  const server = new ApolloServer({
    schema,
    context: async (context) => {
      const { ctx: { request } } = context;

      const currentUser = request?.header?.user_id 
        ? await prisma.user.findUnique({
          where: { id: request?.header?.user_id }
        }) : null;

      if (config.BYPASS_AUTH) {
        return createContext({
          auth: null,
          user: currentUser,
        }, config);
      }

      const decoded = await verifyToken(request);

      return createContext({ auth: decoded, user: currentUser }, config);
    },
    plugins: [
      {
        requestDidStart(_) {
          return {
            didEncounterErrors(ctx) {
              // If we couldn't parse the operation, don't
              // do anything here
              if (!ctx.operation) {
                return;
              }

              for (const err of ctx.errors) {
                // Only report internal server errors,
                // all errors extending ApolloError should be user-facing
                if (err instanceof ApolloError) {
                  continue;
                }

                // Add scoped report details and send to Sentry
                Sentry.withScope((scope) => {
                  // Annotate whether failing operation was query/mutation/subscription
                  scope.setTag("kind", ctx.operation?.operation);

                  // Log query and variables as extras (make sure to strip out sensitive data!)
                  scope.setExtra("query", ctx.request.query);
                  scope.setExtra("variables", ctx.request.variables);

                  if (err.path) {
                    // We can also add the path as breadcrumb
                    scope.addBreadcrumb({
                      category: "query-path",
                      message: err.path.join(" > "),
                      level: Sentry.Severity.Debug,
                    });
                  }

                  const transactionId = ctx.request?.http?.headers.get(
                    "x-transaction-id"
                  );

                  if (transactionId) {
                    scope.setTransactionName(transactionId);
                  }

                  Sentry.captureException(err);
                });
              }
            },
          };
        },
      },
    ],
    debug: isDevelopment,
    introspection: isDevelopment,
    tracing: false,
  });

  await server.start();

  app.use(server.getMiddleware());

  await new Promise((resolve: any) => app.listen({ port: 8080 }, resolve));

  console.log(`Server ready at http://localhost:8080${server.graphqlPath}`);

  return {
    server,
    app,
  };
}

const run = runner(async () => {
  const config = getConfig(customConfig);

  await server(config);
});

run();
