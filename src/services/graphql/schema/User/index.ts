// @ts-nocheck

import {
  extendType,
  arg,
  nonNull,
  objectType,
  stringArg,
  inputObjectType,
  enumType,
} from "nexus";

import slugify from "slugify";
import nanoid from "nanoid";

export const UserType = enumType({
  name: `UserType`,
  members: ["USER", "ADMIN"],
});

const User = objectType({
  name: "User",
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.email();
    t.model.username();
    t.model.role();
    t.model.projects();
  },
});

const queries = extendType({
  type: "Query",
  definition: (t) => {
    t.field("currentUser", {
      type: "User",
      resolve: (_, __, ctx) => {
        if (!ctx.user?.id) return null;

        return ctx.prisma.user.findUnique({
          where: {
            id: ctx.user.id,
          },
        });
      },
    });

    t.field("userBySlug", {
      type: "User",
      args: {
        slug: stringArg(),
      },
      resolve: async (_, { slug }, ctx) => {
        if (!slug)
          throw new Error("Please provide either a slug to the user query");

        const user = await ctx.prisma.user.findFirst({
          where: {
            username: slug,
          },
        });

        if (!user) return null;

        return user;
      },
    });
  },
});

const UpdateUserInput = inputObjectType({
  name: "UpdateUserInput",
  definition(t) {
    t.nonNull.string("userId");
    t.string("email");
    t.string("name");
    t.string("username");
  },
});

const UpsertUserInput = inputObjectType({
  name: "UpsertUserInput",
  definition(t) {
    t.nonNull.string("email");
    t.string("name");
    t.string("username");
  },
});

const mutations = extendType({
  type: "Mutation",
  definition: (t) => {
    
    t.nullable.field("upsertUser", {
      type: "User",
      args: {
        input: arg({
          type: UpsertUserInput,
        }),
      },
      resolve: async (_, { input }, ctx) => {
        if (!input?.email) return null;

        const { email } = input;

        return await ctx.prisma.user.upsert({
          create: {
            email: email.toLowerCase(),
          },
          update: {},
          where: {
            email,
          },
        });
      },
    });

    t.nullable.field("updateUser", {
      type: "User",
      args: {
        input: arg({
          type: UpdateUserInput,
        }),
      },
      resolve: async (_, { input }, ctx) => {
        if (!ctx.user?.id || input?.userId !== ctx.user.id) return null;

        return await ctx.prisma.user.upsert({
          data: input,
        });
      },
    });
  },
});

export default [User, mutations, queries];
