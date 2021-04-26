import { PrismaClient } from "@prisma/client";

// Make global.cachedPrisma work with TypeScript
declare global {
  // NOTE: This actually needs to be a "var", let/const don't work here.
  // eslint-disable-next-line no-var
  var cachedPrisma: PrismaClient;
}

const prisma = new PrismaClient({
  log: ["info", "query"],
});

export default prisma;
