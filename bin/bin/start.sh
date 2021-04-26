#!/bin/bash

set -e

echo "Stage: $STAGE"

if [ "$STAGE" == "local" ]
then
  echo "Starting services locally"

  set -a
  . ".env"
  set +a

  yarn run start:graphql
fi

if [ "$STAGE" == "development" ]
then
  echo "Starting services in development environment"

  export AWS_ACCESS_KEY_ID=$(./bin/get-aws-profile.sh --profile="$AWS_PROFILE" --key)
  export AWS_SECRET_ACCESS_KEY=$(./bin/get-aws-profile.sh --profile="$AWS_PROFILE" --secret)

  set -a
  . ".env.$STAGE"
  set +a

  yarn run start:graphql
fi

