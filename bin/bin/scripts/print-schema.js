// import { printSchema } from 'graphql/utilities';
// import { writeFileSync } from 'fs';

// import getSchema from 'scripts/get-schema';

// export default async function run(_, name) {
//   try {
//     const schema = await getSchema();
//     writeFileSync(`artifacts/${name}.graphql`, printSchema(schema), { encoding: 'utf8' });
//     return 0;
//   } catch (err) {
//     console.error('Failed to create schema', err);
//     return 1;
//   }
// }
