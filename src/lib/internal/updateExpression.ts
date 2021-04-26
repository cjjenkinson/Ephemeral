import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { map, isPlainObject, mapValues } from "lodash";

const mapEntries = <a, b>(
  f: ([key, value]: [string, a]) => [string, b],
  obj: { [k: string]: a }
): { [k: string]: b } => Object.fromEntries(Object.entries(obj).map(f));

const filterEntries = <a>(
  p: ([key, value]: [string, a]) => boolean,
  obj: { [k: string]: a }
): { [k: string]: a } => Object.fromEntries(Object.entries(obj).filter(p));

type Serialisable =
  | Date
  | number
  | string
  | boolean
  | Array<Serialisable>
  | { [k: string]: Serialisable };

type Serialised =
  | number
  | string
  | boolean
  | Array<Serialised>
  | { [k: string]: Serialised };

const serialiseValue = (value: Serialisable): Serialised => {
  if (typeof value === "number") return value;
  if (typeof value === "string") return value;
  if (typeof value === "boolean") return value;
  if (value instanceof Date) return value.toISOString() as string;
  if (Array.isArray(value)) return value.map(serialiseValue);
  if (isPlainObject(value)) return mapValues(value, serialiseValue);
  throw new Error(`Cannot serialise value ${value}`);
};

type SerialisableRecord = { [attribute: string]: Serialisable | undefined };

/**
 * Constructs a parameters object to pass to Dynamo's update function.
 *
 * @remarks Pass an object with only the properties you want to update. If you want to remove a property, pass it with value `undefined`. `Date`'s don't need stringification.
 */
export const constructUpdateExpression = (
  attributesToUpdate: SerialisableRecord
): Partial<DocumentClient.UpdateItemInput> => {
  const attributesToSet = filterEntries(
    ([, value]) => value != null,
    attributesToUpdate
  ) as { [attribute: string]: Serialisable };

  const attributesToRemove = filterEntries(
    ([, value]) => value == null,
    attributesToUpdate
  ) as { [attribute: string]: undefined };

  return {
    UpdateExpression: `
      ${Object.keys(attributesToSet).length > 0 ? "SET" : ""}
        ${map(attributesToSet, (_, key) => `#${key} = :${key}`).join(",")}
      ${Object.keys(attributesToRemove).length > 0 ? "REMOVE" : ""}
        ${map(attributesToRemove, (_, key) => `#${key}`).join(",")}
    `,
    ExpressionAttributeNames: mapEntries(
      ([key]) => [`#${key}`, key],
      attributesToUpdate
    ),
    ExpressionAttributeValues: mapEntries(
      ([key, value]) => [`:${key}`, serialiseValue(value)],
      attributesToSet
    ),
    ReturnValues: "ALL_NEW",
  };
};

type DynamoJson =
  | undefined
  | string
  | boolean
  | number
  | Array<DynamoJson>
  | { [k: string]: DynamoJson };
type SerialisedRecord = { [k: string]: DynamoJson };

/**
 * Constructs a parameters object to pass to Dynamo's update function.
 *
 * @remarks Pass a serialised object with only the properties you want to update. If you want to remove a property, pass it with value `undefined`.
 */
export const partialToUpdate = (attributesToUpdate: SerialisedRecord) => {
  const attributesToSet = filterEntries(
    ([, value]) => value != null,
    attributesToUpdate
  ) as { [attribute: string]: Exclude<DynamoJson, undefined> };

  const attributesToRemove = filterEntries(
    ([, value]) => value == null,
    attributesToUpdate
  ) as { [attribute: string]: undefined };

  return {
    UpdateExpression: `
      ${Object.keys(attributesToSet).length > 0 ? "SET" : ""}
        ${map(attributesToSet, (_, key) => `#${key} = :${key}`).join(",")}
      ${Object.keys(attributesToRemove).length > 0 ? "REMOVE" : ""}
        ${map(attributesToRemove, (_, key) => `#${key}`).join(",")}
    `,
    ExpressionAttributeNames: mapEntries(
      ([key]) => [`#${key}`, key],
      attributesToUpdate
    ),
    ...(Object.keys(attributesToSet).length > 0
      ? {
          ExpressionAttributeValues: mapEntries(
            ([key, value]) => [`:${key}`, value],
            attributesToSet
          ),
        }
      : {}),
    ReturnValues: "ALL_NEW",
  };
};
