import type { BookDto } from "../types/BookDto";

interface DeleteBookProps {
  book: BookDto;
  isOpen: boolean;
  onClose: () => void;
  onDelete: (isbn: number) => void;
}

const DeleteBook = ({ book, isOpen, onClose, onDelete }: DeleteBookProps) => {
  const handleSubmit = () => {
    onDelete(book.isbn);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black opacity-50 transition-opacity"
          onClick={onClose}
        ></div>

        {/* Dialog Box */}
        <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Confirm Deletion
          </h3>
          <p className="text-gray-700 mb-6">
            Are you sure you want to delete this item?
          </p>

          <div className="flex justify-end gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DeleteBook;
