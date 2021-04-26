#!/bin/bash

set -e

echo "Packaging up graphql server"

rm -Rf build-server && mkdir -p build-server && rm -Rf .webpack

node ./bin/scripts/create-server-package/index.js

webpack --config webpack.server.config.js

cd build-server

zip -r server.zip .

cd ..

echo "Build is ready for deployment"