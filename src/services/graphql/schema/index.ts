import { nexusPrisma } from "nexus-plugin-prisma";
import { makeSchema, fieldAuthorizePlugin } from "nexus";
import path from "path";

import User from "./User";
import Project, { PaidPlan } from "./Project";

// Only generate in development or when the yarn run generate:nexus command is run
// This fixes deployment on Netlify, otherwise you'll run into an EROFS error during building
const shouldGenerateArtifacts =
  process.env.NODE_ENV === "development" || !!process.env.GENERATE;

export const schema = makeSchema({
  types: [
    User,
    Project,
    PaidPlan,
  ],
  plugins: [
    fieldAuthorizePlugin(),
    nexusPrisma({
      shouldGenerateArtifacts,
    }),
  ],
  // Type the GraphQL context when used in Nexus resolvers
  contextType: {
    module: path.join(process.cwd(), "src/services/graphql/context.ts"),
    export: "GraphQLContext",
  },
  // Generate the files
  shouldGenerateArtifacts,
  outputs: {
    typegen: path.join(
      process.cwd(),
      "src/services/graphql/schema/nexus-types.generated.ts"
    ),
    schema: path.join(process.cwd(), "src/services/graphql/schema/schema.graphql"),
  },
});
