const DynamoDb = require("aws-sdk/clients/dynamodb");
const { omitBy } = require("lodash");

const dynamoDb = new DynamoDb.DocumentClient({
  service: new DynamoDb({
    apiVersion: "2012-08-10",
  }),
});

const createDynamoDbTable = (entity) => {
  const tableName = process.env.STAGE
    ? `${process.env.STAGE}-${entity}`
    : entity;

  // DynamoDB query methods force pagination with a max 1MB page. withAllPages wraps a DynamoDB method to retrieve all pages when called.
  const withAllPages = (query) => async (params) => {
    const _withAllPages = async (lastKey) => {
      const paramsWithKey = Object.assign({}, params, {
        ExclusiveStartKey: lastKey,
      });

      const { Items, LastEvaluatedKey } = await query(paramsWithKey);

      return LastEvaluatedKey
        ? [...Items, ...(await _withAllPages(LastEvaluatedKey))]
        : Items;
    };

    return _withAllPages();
  };

  const query = (args) =>
    dynamoDb.query({ TableName: tableName, ...args }).promise();
  const queryAll = withAllPages(query);
  const put = ({ Item, ...args }) =>
    dynamoDb
      .put({
        TableName: tableName,
        Item: omitBy(Item, (value) => [null, undefined].includes(value)),
        ...args,
      })
      .promise();
  const get = async (args) =>
    dynamoDb.get({ TableName: tableName, ...args }).promise();
  const update = (args) =>
    dynamoDb.update({ TableName: tableName, ...args }).promise();
  const transactWrite = (...args) => dynamoDb.transactWrite(...args).promise();
  const deleteItem = (args) =>
    dynamoDb.delete({ TableName: tableName, ...args }).promise();
  const scan = (args) =>
    dynamoDb.scan({ TableName: tableName, ...args }).promise();

  return {
    query,
    queryAll,
    get,
    put,
    update,
    transactWrite,
    delete: deleteItem,
    constructUpdateExpression,
    scan,
  };
};

const bimapObject = (f, obj) => Object.fromEntries(Object.entries(obj).map(f));
const constructUpdateExpression = (attributesToUpdate) => ({
  UpdateExpression: `SET ${Object.keys(attributesToUpdate)
    .map((key) => `#${key} = :${key}`)
    .join(", ")}`,
  ExpressionAttributeNames: bimapObject(
    ([key]) => [`#${key}`, key],
    attributesToUpdate
  ),
  ExpressionAttributeValues: bimapObject(
    ([key, value]) => [`:${key}`, value],
    attributesToUpdate
  ),
});

module.exports = { createDynamoDbTable, constructUpdateExpression };
