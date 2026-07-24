import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { OMDbAPI } from './movies-api.js';
import { resolvers } from './resolvers.js';

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  type Movie {
    title: String
    year: String
    imdbID: ID
  }

type Author {
    id: ID,
    authorname: String
  }
  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
    auth: [Author]
    movie(imdbId: String!): Movie
    movieByTitle(title: String!): Movie
  }

#   type QueryA {
#     auth: [Author]
#   }
  
`;

// for api as source
interface ContextValue {
  dataSources: {
    moviesAPI: OMDbAPI;
    // personalizationAPI: PersonalizationAPI;
  };
}
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
//basic commented
// const { url } = await startStandaloneServer(server, {
//   listen: { port: 4000 },
// });

// revised for API as source
const { url } = await startStandaloneServer(server, {
  context: async () => {
    const { cache } = server;
    return {
      // We create new instances of our data sources with each request,
      // passing in our server's cache.
      dataSources: {
        moviesAPI: new OMDbAPI({ cache }),
      },
    };
  },
});

console.log(`🚀  Server ready at: ${url}`);

