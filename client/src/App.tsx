import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_BOOKS } from "./graphql/queries";

import "./App.css";
import { ADD_BOOK } from "./graphql/mutations";

interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
  genre: string;
}

function App() {
  const { data, loading, error } = useQuery(GET_BOOKS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Book>({
    id: "",
    title: "",
    author: "",
    year: 0,
    genre: "",
  });

  const [addBook, { data: addBookData, loading: addBookLoading, error: addBookError }] = useMutation(ADD_BOOK);

  useEffect(() => {
    console.log('addBookData => ', addBookData);
    console.log('addBookError => ', addBookError);
    console.log('addBookLoading => ', addBookLoading);
  }, [addBookData, addBookLoading, addBookError]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "year" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted", formData);

    try {
      await addBook({ variables: { book: formData } });
      closeModal();
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  return (
    <div>
      <button onClick={openModal}>Add Book</button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add a new Book</h2>
            <form onSubmit={handleSubmit}>
              <input
                required
                name="id"
                type="text"
                placeholder="ID"
                value={formData.id}
                onChange={handleChange}
              />
              <input
                required
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
              />
              <input
                required
                type="text"
                name="author"
                placeholder="Author"
                value={formData.author}
                onChange={handleChange}
              />
              <input
                required
                name="year"
                type="number"
                placeholder="Year"
                value={formData.year}
                onChange={handleChange}
              />
              <input
                required
                type="text"
                name="genre"
                placeholder="Genre"
                value={formData.genre}
                onChange={handleChange}
              />
              <button type="submit">Submit</button>
              <button type="button" onClick={closeModal}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {data.books.map(({ id, title, author }: Book) => (
        <div key={id}>
          <h3>{title}</h3>
          <p>{`by ${author}`}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;
