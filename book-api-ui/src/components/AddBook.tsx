import { useContext, useState, type FormEvent } from "react";
import { addBook } from "../services/book.service";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";

function AddBook() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    isbn: "",
    title: "",
    author: "",
    description: "",
    category: "",
    price: "",
    quantity: "",
  });

  const [bookCoverFile, setBookCoverFile] = useState<File | null>(null);
  const [bookCoverPreview, setBookCoverPreview] = useState<string>("");
  const { authToken } = useContext(AuthContext);

  const handleFormDataChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    //this take the target and sets it to the value in the field.
    //it opens previous state as a spread and applies all changes
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setBookCoverFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setBookCoverPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const submitData = new FormData();

    //the append name has to have exact same name as the backend to send properly
    submitData.append(
      "bookDto",
      new Blob([JSON.stringify(formData)], {
        type: "application/json",
      })
    );

    if (bookCoverFile) {
      submitData.append("file", bookCoverFile);
    }

    addBook(submitData, authToken || "")
      .then((response) => {
        handleReset();
        //navigates back to home page
        navigate("/");
        return response.json();
      })
      .then((data) => {
        console.log("Add book response = ", data);
      })
      .catch((error) => {
        console.log("Error adding book : ", error);
      });
  };

  //resets the form
  const handleReset = () => {
    setFormData({
      isbn: "",
      title: "",
      author: "",
      description: "",
      category: "",
      price: "",
      quantity: "",
    });

    setBookCoverFile(null);
    setBookCoverPreview("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-black px-8 py-6">
            <h1 className="text-3xl font-extrabold text-white text-center">
              Add New Book
            </h1>
            <p className="text-blue-100 text-center mt-2">
              Enter the details of the new book to add to your inventory
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-2">
                    ISBN
                  </label>
                  <input
                    required
                    type="number"
                    name="isbn"
                    value={formData.isbn}
                    onChange={handleFormDataChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2
            focus:ring-black focus:border-transparent transition duration-200 [appearance:textfield]
             [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="Enter ISBN"
                  />
                </div>

                {/* Title Field */}
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-2">
                    Title
                  </label>
                  <input
                    required
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleFormDataChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2
            focus:ring-black focus:border-transparent transition duration-200"
                    placeholder="Enter book title"
                  />
                </div>

                {/* Author Field */}
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-2">
                    Author
                  </label>
                  <input
                    required
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleFormDataChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2
            focus:ring-black focus:border-transparent transition duration-200"
                    placeholder="Enter author name"
                  />
                </div>

                {/* Category Field */}
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-2">
                    Category
                  </label>
                  <input
                    required
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleFormDataChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2
            focus:ring-black focus:border-transparent transition duration-200"
                    placeholder="Enter book category"
                  />
                </div>
              </div>

              <div className="space-y-6">
                {/* Price and Quantity */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-2">
                      Price
                    </label>
                    <div className="relative rounded-xl">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                        $
                      </span>
                      <input
                        required
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleFormDataChange}
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2
                focus:ring-black focus:border-transparent transition duration-200 [appearance:textfield]
                 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-2">
                      Quantity
                    </label>
                    <input
                      required
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleFormDataChange}
                      min="0"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2
              focus:ring-black focus:border-transparent transition duration-200 [appearance:textfield]
               [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      placeholder="0"
                    />
                  </div>
                </div>

                {/* Description Field */}
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-2">
                    Description
                  </label>
                  <textarea
                    required
                    name="description"
                    value={formData.description}
                    onChange={handleFormDataChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2
            focus:ring-black focus:border-transparent transition duration-200 resize-none"
                    placeholder="Enter book description"
                  ></textarea>
                </div>

                {/* File Upload Section */}
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-2">
                    Book Cover
                  </label>
                  <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-6 bg-gray-50">
                    {bookCoverPreview ? (
                      <div className="flex flex-col items-center">
                        <img
                          src={bookCoverPreview}
                          alt="Book cover preview"
                          className="h-40 w-auto object-contain mb-4"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setBookCoverFile(null);
                            setBookCoverPreview("");
                          }}
                          className="text-sm text-red-600 hover:text-red-700"
                        >
                          Remove image
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="text-center">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <p className="mt-1 text-sm text-gray-500">
                            Click to upload book cover image
                          </p>
                          <p className="mt-1 text-xs text-gray-400">
                            PNG up to 5MB
                          </p>
                        </div>

                        <label className="block text-center mt-4">
                          <span
                            className="cursor-pointer inline-block px-4 py-2 bg-white border border-gray-300
                    rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                          >
                            Browse files
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                        </label>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end space-x-4">
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium
        hover:bg-gray-100 transition duration-200 shadow-sm"
              >
                Reset Form
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-black rounded-xl text-white font-medium
        hover:bg-gray-800 transition duration-200 shadow-md"
              >
                Add Book
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddBook;
