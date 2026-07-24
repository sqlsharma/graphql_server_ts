export const typeDefs = `#graphql
  type Author {
    name: String!
  }

  type Book {
    id: ID!
    title: String!
    author: Author!
    isbn: String
  }

  type Query {
    books: [Book!]!
  }
`;
