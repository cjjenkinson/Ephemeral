# ephemeral

Monofunction repo guidelines for high performance serverless backends on AWS with CDK.

## Getting started

Pre-requirements:

- [node v8+](https://nodejs.org/en/)
- [yarn](https://yarnpkg.com/en/)
- typescript
- aws cli
- cdk
- prisma
- nexus

Run services locally:

```
yarn start:local
```

You will need to run the dependencies required for local to run correctly so open up another terminal tab
and run

```
make up
```

This will run Postgres locally so you can explore the tables before commiting to migrating on the other environemnts.

Run services with development cloud environment:

```
yarn start:development
```

This will connect to the development services on AWS.

## Services

We run a collection of microservices that make use of serverless compute resources on AWS, mostly lambda.

The data layer is an elasticbeanstalk Node.JS API using ApolloServer and Prisma to provide a stable, scalable and dev friendly data access environment that avoids the issues of serverless first data layers (timeouts, connection pool management and using DynamoDB for the entire data layer).

### Deployment

Deployments are managed by mostly by Amazon CDK and a small set of bash scripts for compiling source code assets for deployment.

```
yarn deploy:development
```

Deploys all development stacks where core and service-x name can be added to deploy a single stack.


