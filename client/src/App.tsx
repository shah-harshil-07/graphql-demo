import { gql, useQuery } from '@apollo/client';

import './App.css';

function App() {
  const GET_BOOKS = gql`
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
  const { data, loading, error } = useQuery(GET_BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return data.books.map(({ id, title, author }: { id: string; title: string; author: string; }) => (
    <div key={id}>
      <h3>{title}</h3>
      <p>{`by ${author}`}</p>
      <hr />
    </div>
  ));
};

export default App;
