const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const getAllBooks = async () => {
    return await fetch(`${BASE_URL}/api/v1/books/all-books`,{
        method: "GET",
    })
    
}

export const addBook = async (formData: FormData) => {
    return await fetch(`${BASE_URL}/api/v1/books/add-book`, {
        method: "POST",
        body: formData,});
}

export const updateBook = async (formData: FormData, isbn: number) => {
    return await fetch(`${BASE_URL}/api/v1/books/update-book/${isbn}`, {
        method: "PUT",
        body: formData});
}

export const deleteBook = async (isbn: number) => {
    return await fetch(`${BASE_URL}/api/v1/books/delete/${isbn}`, {
        method: "DELETE",
    });
}