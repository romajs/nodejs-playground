const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

const { makeExecutableSchema } = require('@graphql-tools/schema');
const { mergeSchemas } = require('@graphql-tools/merge');

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
});
