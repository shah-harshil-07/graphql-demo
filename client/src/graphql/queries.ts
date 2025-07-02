import { gql } from '@apollo/client'

export const GET_BOOKS = gql`
  query GetBooks {
    books {
      id
      year
      title
      genre
      author
    }
  }
`;
