#!/bin/bash

set -e

function testDependency() {

  local CMD="${1}"
  local CMD_PATH="$(which "${CMD}")"

  if ! ([ -f "${CMD_PATH}" ] && [ -x "${CMD_PATH}" ]); then
    echo "Can't find \"${CMD}\" which is a required dependency. brew install \"${CMD}\""
    exit 1
  fi
}

testDependency aws-vault
testDependency jq
testDependency perl
testDependency yarn
testDependency aws

HERE=$(dirname $0)
cd "${HERE}/.."
ABSOLUTE_ROOT=$(pwd)

echo "Stage: $STAGE"
echo "AWS Profile: $AWS_PROFILE"

echo "Exporting environment"

set -a
. ".env.$STAGE"
set +a

yarn zip:server

## TODO

# echo "Testing build..."

# node server.js

# RUNNING_NODE_PID=ps -e|grep node

# echo "Build running on $RUNNING_NODE_PID"

# kill -9 [RUNNING_NODE_PID]

echo "Deploying graphql application"

cdk deploy "$STAGE-Graphql"

echo "Cleaning assets folder"

find . -name 'asset.*.zip' -print0 | xargs -0 rm

echo "✅ Deployed graphql application succesfully"