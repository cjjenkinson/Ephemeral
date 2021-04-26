import fetch from "node-fetch";
import { URLSearchParams } from "url";

import { ExtendedError } from "./errors";

interface GraphQLClientOptions {
  clientId: string;
  clientSecret: string;
  authUrl: string;
  graphQLUrl: string;
}

class GraphQLClient {
  public options: GraphQLClientOptions;

  constructor({ clientId, clientSecret, authUrl, graphQLUrl }) {
    this.options = {
      clientId,
      clientSecret,
      authUrl,
      graphQLUrl,
    };
  }

  private async getAuthorization() {
    const data = new URLSearchParams();
    data.append("client_id", this.options.clientId);
    data.append("client_secret", this.options.clientSecret);
    data.append("grant_type", "client_credentials");

    const response = await fetch(this.options.authUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: data,
    });

    const jsonResponse = await response.json();

    const { access_token: accessToken } = jsonResponse;

    if (!accessToken) {
      throw new Error(
        `GraphQL client authentication error :: ${jsonResponse.message}`
      );
    }

    return {
      authorization: `Bearer ${accessToken}`,
      client_id: this.options.clientId,
    };
  }

  public async query({ query, variables }) {
    const requestHeaders = {
      ...(await this.getAuthorization()),
    };

    const response = await fetch(this.options.graphQLUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...requestHeaders,
      },
      body: JSON.stringify({ query, variables }),
    });

    try {
      return response.json();
    } catch (error) {
      throw new ExtendedError({
        message: error.message,
        context: {
          query,
          variables,
        },
      });
    }
  }
}

export default GraphQLClient;

// import fetch from "node-fetch";
// import { URLSearchParams } from "url";
// import { GraphQLError, DocumentNode, print } from "graphql";

// type Options = {
//   authUrl: string;
//   clientId: string;
//   clientSecret: string;
//   graphQlUrl: string;
//   scopes?: Array<string>;
// };

// type OperationVariables =
//   | string
//   | number
//   | boolean
//   | Date
//   | null
//   | undefined
//   | { [property: string]: OperationVariables }
//   | Array<OperationVariables>;

// type QueryResult<TData> = {
//   data: TData;
//   errors?: ReadonlyArray<GraphQLError>;
// };

// type MutationResult<TData> = {
//   data: TData;
//   errors?: ReadonlyArray<GraphQLError>;
// };

// const generateAuthToken = (clientId: string, clientSecret: string): string =>
//   Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

// export class GraphQLClient {
//   options: Options;

//   constructor(options: Options) {
//     this.options = options;
//   }

//   async getAuthorization({
//     clientId,
//     clientSecret,
//     scopes,
//   }: {
//     clientId: string;
//     clientSecret: string;
//     scopes?: Array<string>;
//   }): Promise<{ authorization: string }> {
//     const data = new URLSearchParams();
//     data.append("grant_type", "client_credentials");
//     if (scopes && scopes.length > 0) data.append("scope", scopes.join(" "));

//     const authToken = generateAuthToken(clientId, clientSecret);

//     const response = await fetch(this.options.authUrl, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//         Authorization: `Basic ${authToken}`,
//       },
//       body: data,
//     });

//     const { access_token: accessToken } = await response.json();

//     return {
//       authorization: accessToken,
//     };
//   }

//   async query<TData = unknown, TVariables = OperationVariables>({
//     query,
//     variables,
//   }: {
//     query: DocumentNode;
//     variables: TVariables;
//   }): Promise<QueryResult<TData>> {
//     const { authorization } = await this.getAuthorization({
//       clientId: this.options.clientId,
//       clientSecret: this.options.clientSecret,
//       scopes: this.options.scopes,
//     });

//     const response = await fetch(this.options.graphQlUrl, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         authorization,
//       },
//       body: JSON.stringify({ query: print(query), variables }),
//     });

//     const body = await response.json();

//     return body;
//   }

//   async mutation<TData = unknown, TVariables = OperationVariables>({
//     mutation,
//     variables,
//   }: {
//     mutation: DocumentNode;
//     variables: TVariables;
//   }): Promise<MutationResult<TData>> {
//     const { authorization } = await this.getAuthorization({
//       clientId: this.options.clientId,
//       clientSecret: this.options.clientSecret,
//       scopes: this.options.scopes,
//     });

//     const response = await fetch(this.options.graphQlUrl, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         authorization,
//       },
//       body: JSON.stringify({ mutation: print(mutation), variables }),
//     });

//     if (!response.ok) {
//       throw new Error(response.statusText);
//     }

//     const body = await response.json();

//     return body;
//   }
// }
