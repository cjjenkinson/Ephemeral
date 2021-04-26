#!/bin/bash

set -e

echo "Run Script on stage: $STAGE"

if [ "$STAGE" == "development" ]
then
  echo "Mocking services with development"

  echo "AWS Profile: $AWS_PROFILE"

  export AWS_ACCESS_KEY_ID=$(./bin/get-aws-profile.sh --profile="$AWS_PROFILE" --key)
  export AWS_SECRET_ACCESS_KEY=$(./bin/get-aws-profile.sh --profile="$AWS_PROFILE" --secret)
  export AWS_REGION=eu-west-1

  babel-node --extensions \".js,.ts\" bin/scripts/$1
fi

if [ "$STAGE" == "production" ]
then
  echo "Mocking services with production"

  echo "AWS Profile: $AWS_PROFILE"

  export AWS_ACCESS_KEY_ID=$(./bin/get-aws-profile.sh --profile="$AWS_PROFILE" --key)
  export AWS_SECRET_ACCESS_KEY=$(./bin/get-aws-profile.sh --profile="$AWS_PROFILE" --secret)
  export AWS_REGION=eu-west-1

  babel-node --extensions \".js,.ts\" bin/scripts/$1
fi