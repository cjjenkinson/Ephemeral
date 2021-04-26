import { Prisma } from "@prisma/client";
import prisma from "../../services/graphql/prisma";
import { testData } from "./data";

// Inspired by prisma/docs#451
async function emptyDatabase() {
  const tables = Prisma.dmmf.datamodel.models.map((model) => model.name);

  await Promise.all(
    tables.map((table) => prisma.$executeRaw(`DELETE FROM "${table}";`))
  );
}

async function seedDatabase({ users, projects = [], stacks = [] }: any) {
  // Insert users
  await Promise.all(
    users.map((user) =>
      prisma.user.create({
        data: user,
      })
    )
  );

  // Insert projects & connect them to their users
  await Promise.all(
    projects.map((project) =>
      prisma.project.create({
        data: {
          ...project,
          users: {
            connect: project.users?.map((id) => ({ id })),
          },
        },
      })
    )
  );

  // Insert stacks
  await Promise.all(
    stacks.map((stack) =>
      prisma.stack.create({
        data: stack,
      })
    )
  );
}

export async function reseedDatabase(data: any = testData) {
  await emptyDatabase();
  await seedDatabase(data);
}

(async () => {
  await reseedDatabase();

  console.log("Seeding complete");

  return;
})();
