/* eslint-disable no-console */
import aws from "aws-sdk";

export default async ({
  lambdaArn,
  payload,
}: {
  lambdaArn: string;
  payload: any;
}) => {
  const lambda = new aws.Lambda({
    apiVersion: "2015-03-31",
  });

  const { StatusCode, FunctionError, Payload } = await lambda
    .invoke({
      FunctionName: lambdaArn,
      Payload: JSON.stringify(payload),
    })
    .promise();

  if (StatusCode !== 200 || FunctionError != null) {
    console.log(Payload);
    throw new Error("error in remote service");
  }

  return Payload;
};
