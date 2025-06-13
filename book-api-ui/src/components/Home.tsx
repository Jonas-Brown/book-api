import { useCallback, useContext, useEffect, useState } from "react";
import { deleteBook, getAllBooks, updateBook } from "../services/book.service";
import { type BookDto } from "../types/BookDto";
import EditBook from "./EditBook";
import DeleteBook from "./DeleteBook";
import { AuthContext } from "../context/AuthContext";

//need to figure out a good way to throw errors in the UI to not continue on after an error
const Home = () => {
  const [books, setBooks] = useState<BookDto[]>([]);

  const [isEditDialogue, setIsEditDialogue] = useState(false);
  const [bookToEdit, setBookToEdit] = useState<BookDto | null>(null);

  const [isDeleteDialogue, setIsDeleteDialogue] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<BookDto | null>(null);

  const { isAdmin, authToken } = useContext(AuthContext);

  const getImageUrl = useCallback(
    async (bookCoverUrl: string) => {
      if (bookCoverUrl === undefined) return undefined;
      try {
        const response = await fetch(bookCoverUrl, {
          method: "GET",
          headers: { authorization: `Bearer ${authToken}` },
        });

        const blob = await response.blob();
        return URL.createObjectURL(blob);
      } catch (err) {
        console.error("Error fetching image:", err);
        return undefined;
      }
    },
    [authToken]
  );

  const getBooks = useCallback(() => {
    getAllBooks(authToken || "")
      .then((response) => {
        return response.json();
      })
      .then(async (data) => {
        data.map(async (book: BookDto) => {
          book.bookCoverBlobUrl = await getImageUrl(book.bookCoverUrl || "");
        });
        setBooks(data);
      })
      .catch((error) => {
        console.log("error = ", error);
      });
  }, [authToken, getImageUrl]);

  useEffect(() => {
    getBooks();
  }, [getBooks]);

  const handleEdit = (book: BookDto) => {
    setBookToEdit(book);
    setIsEditDialogue(true);
  };

  const handleOnCloseEdit = () => {
    setBookToEdit(null);
    setIsEditDialogue(false);
  };

  const handleUpdateBook = (updatedBook: BookDto, bookCoverFile?: File) => {
    const submitData = new FormData();
    submitData.append(
      "bookDto",
      new Blob([JSON.stringify(updatedBook)], {
        type: "application/json",
      })
    );
    if (bookCoverFile) {
      submitData.append("file", bookCoverFile);
    }

    updateBook(submitData, updatedBook.isbn, authToken || "")
      .then((response) => {
        getBooks();
        handleOnCloseEdit();
        return response.json();
      })
      .then((data) => {
        console.log("Update book response = ", data);
      })
      .catch((error) => {
        console.log("Error updating book: ", error);
      });
  };

  const handleDeleteDialogue = (book: BookDto) => {
    setBookToDelete(book);
    setIsDeleteDialogue(true);
  };

  const handleDelete = (isbn: number) => {
    deleteBook(isbn, authToken || "")
      .then((response) => {
        getBooks();
        handleOnCloseDelete();
        return response.text();
      })
      .then((data) => {
        console.log("Delete book response = ", data);
      })
      .catch((error) => {
        console.log("Error updating book: ", error);
      });
  };

  const handleOnCloseDelete = () => {
    setBookToDelete(null);
    setIsDeleteDialogue(false);
  };

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
                  hidden={!isAdmin}
                  className="flex-1 bg-yellow-600 text-white py-1 px-1 mr-2 rounded-md"
                  onClick={() => handleEdit(book)}
                >
                  Edit
                </button>
                <button
                  hidden={!isAdmin}
                  className="flex-1 bg-red-600 text-white py-1 px-1 rounded-md"
                  onClick={() => handleDeleteDialogue(book)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {bookToEdit && (
        <EditBook
          book={bookToEdit}
          isOpen={isEditDialogue}
          onClose={handleOnCloseEdit}
          onSubmit={handleUpdateBook}
        />
      )}

      {bookToDelete && (
        <DeleteBook
          book={bookToDelete}
          isOpen={isDeleteDialogue}
          onClose={handleOnCloseDelete}
          onDelete={handleDelete}
        />
      )}
    </>
  );
};

export default Home;
