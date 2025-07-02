import { buildSchema } from "graphql";

const schema = buildSchema(`
    type Book {
        id: ID!
        year: Int
        genre: String
        title: String!
        author: String!
    }

    type Query {
        # Get all books
        books: [Book!]!

        # Get a specific book by ID
        book(id: ID!): Book

        # Search books by title or author
        searchBooks(query: String!): [Book!]!
    }

    input Book {
        id: ID!
        year: Int
        genre: String
        title: String!
        author: String!
    }

    type Mutation {
        # Add a new book
        addBook(book: Book!): Book!
    }
`);

export default schema;
