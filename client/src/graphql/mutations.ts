import { gql } from "@apollo/client";

export const ADD_BOOK = gql`
  mutation AddBook($book: BookInput!) {
    addBook(book: $book) {
      id
      year
      title
      genre
      author
    }
  }
`;
