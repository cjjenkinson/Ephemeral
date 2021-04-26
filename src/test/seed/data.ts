const userIdOne = "testuser1";

const projectIdOne = "project1";

export const testData = {
  users: [
    {
      id: userIdOne,
      name: "Cameron Jenkinson",
      email: "cameron+test@email.in",
      username: "cameronjenkinson",
    },
  ],
  projects: [
    {
      id: projectIdOne,
      name: "project",
      slug: `project-${projectIdOne}`,
      users: [userIdOne],
    },
  ],
};
