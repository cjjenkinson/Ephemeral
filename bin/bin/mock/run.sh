#!/bin/bash

set -e

source ./bin/export-db.sh

echo "Stage: $STAGE"

if [ "$STAGE" == "local" ]
then
  echo "Mocking services locally"

  echo $1

  exportLocalDBCredentials

  yarn mock $1
fi

if [ "$STAGE" == "development" ]
then
  echo "Mocking services with development"

  echo "AWS Profile: $AWS_PROFILE"

  exportDBCredentials

  export AWS_ACCESS_KEY_ID=$(./bin/get-aws-profile.sh --profile="$AWS_PROFILE" --key)
  export AWS_SECRET_ACCESS_KEY=$(./bin/get-aws-profile.sh --profile="$AWS_PROFILE" --secret)

  yarn mock $1
fi