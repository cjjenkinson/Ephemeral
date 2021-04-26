const fs = require('fs');

const packageMainDependencies = require('../../../package.json').dependencies;
const packageServer = require('./package-server.json');

const PRISMA_SCHEMA_FILE_PATH = '../../../src/services/graphql/prisma/schema.prisma';

function createServerPackage() {
  const package = {
    ...packageServer,
    dependencies: packageMainDependencies
  }

  fs.writeFileSync(`build-server/package.json`, JSON.stringify(package, null, 2), 'utf8');

  const schema = fs.readFileSync(`${__dirname}/${PRISMA_SCHEMA_FILE_PATH}`, 'utf8');

  fs.writeFileSync(`build-server/schema.prisma`, schema, 'utf8');
}

createServerPackage();