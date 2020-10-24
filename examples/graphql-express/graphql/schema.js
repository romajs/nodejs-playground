const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

const { makeExecutableSchema } = require('@graphql-tools/schema');

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
});
