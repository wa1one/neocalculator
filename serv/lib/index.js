import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
var typeDefs = "#graphql\n  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.\n\n  type User {\n    id: String\n    text: String\n  }\n\n  # The \"Query\" type is special: it lists all of the available queries that\n  # clients can execute, along with the return type for each. In this\n  # case, the \"books\" query returns an array of zero or more Users (defined above).\n  type Query {\n    users: [User]\n  }\n";
var _users = [{
  id: "wa1",
  text: "1+1"
}, {
  id: "wa2",
  text: "2+2"
}];

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves users from the "users" array above.
var resolvers = {
  Query: {
    users: function users() {
      return _users;
    }
  }
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
var server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
var _await$startStandalon = await startStandaloneServer(server, {
    listen: {
      port: 4000
    }
  }),
  url = _await$startStandalon.url;
console.log("\uD83D\uDE80  Server ready at: " + url);