import { testData } from "../../../../test/seed/data";
import { request, graphql } from "../../../../test/request";

describe(`currentUser`, () => {
  it(`should return null when unauthenticated`, async () => {
    expect(
      await request(
        graphql`
          {
            currentUser {
              id
            }
          }
        `
      )
    ).toMatchInlineSnapshot(`
        Object {
          "data": Object {
            "currentUser": null,
          },
        }
    `);
  });

  it(`should return the current user data when authenticated`, async () => {
    expect(
      await request(
        graphql`
          {
            userBySlug(slug: "cameronjenkinson") {
              id
              name
            }
          }
        `,
        {
          context: {
            user: testData.users[0],
          },
        }
      )
    ).toMatchInlineSnapshot(`
      Object {
        "data": Object {
          "userBySlug": Object {
            "id": "testuser1",
            "name": "Cameron Jenkinson",
          },
        },
      }
    `);
  });
});

describe(`updateUser`, () => {
  it(`should update the user's name`, async () => {
    // Right name initially
    expect(
      await request(
        graphql`
          {
            currentUser {
              id
              name
            }
          }
        `,
        {
          context: {
            user: testData.users[0],
          },
        }
      )
    ).toMatchInlineSnapshot(`
      Object {
        "data": Object {
          "currentUser": Object {
            "id": "testuser1",
            "name": "Cameron Jenkinson",
          },
        },
      }
    `);

    // Update name
    expect(
      await request(
        graphql`
          mutation updateUser($userId: String!) {
            updateUser(userId: $userId, name: "New name") {
              id
              name
            }
          }
        `,
        {
          context: {
            user: testData.users[0],
          },
          variables: {
            userId: testData.users[0].id,
          },
        }
      )
    ).toMatchInlineSnapshot(`
      Object {
        "errors": Array [
          [GraphQLError: Unknown argument "userId" on field "Mutation.updateUser".],
          [GraphQLError: Unknown argument "name" on field "Mutation.updateUser".],
        ],
      }
    `);

    // Updated name
    expect(
      await request(
        graphql`
          {
            currentUser {
              id
              name
            }
          }
        `,
        {
          context: {
            user: testData.users[0],
          },
        }
      )
    ).toMatchInlineSnapshot(`
      Object {
        "data": Object {
          "currentUser": Object {
            "id": "testuser1",
            "name": "Cameron Jenkinson",
          },
        },
      }
    `);
  });
});
