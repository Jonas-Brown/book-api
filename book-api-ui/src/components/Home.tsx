import { useEffect, useState } from "react";
import { getAllBooks } from "../services/book.service";
import { type BookDto } from "../types/BookDto";

function Home() {
  const [books, setBooks] = useState<BookDto[]>([]);

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = () => {
    getAllBooks()
      .then((response) => {
        console.log("response = ", response.data);
        setBooks(response.data);
      })
      .catch((error) => {
        console.log("error = ", error);
      });
  };

  const handleEdit = (book: BookDto) => {};

  const handleDelete = (book: BookDto) => {};

  return (
    <>
      <h1 className="text-center mt-10 text-3xl font-bold">List of Books</h1>
      <div className="container mt-10 space-y-4">
        <div className="flex flex-row space-x-4 flex-wrap justify-center items-center gap-y-4">
          {books.map((book) => (
            <div
              key={book.isbn}
              className="bg-gray-100 p-4 rounded-md flex flex-col justify-self-start"
            >
              <h2 className="text-lg font-bold">{book.title}</h2>
              <p className="text-sm">
                <strong>Author</strong>: {book.author}
              </p>
              <p className="text-sm">
                <strong>Price</strong>: $ {book.price}
              </p>
              <div className="flex my-2">
                <button
                  className="flex-1 bg-yellow-600 text-white py-1 px-1 mr-2 rounded-md"
                  onClick={() => handleEdit(book)}
                >
                  Edit
                </button>
                <button
                  className="flex-1 bg-red-600 text-white py-1 px-1 rounded-md"
                  onClick={() => handleDelete(book)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
