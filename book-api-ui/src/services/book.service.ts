const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const getAllBooks = async (token: string) => {
    return await fetch(`${BASE_URL}/book-api/books/all-books`,{
        method: "GET",
        headers: {Authorization: `Bearer ${token}`}
    })
    
}

export const addBook = async (formData: FormData, token: string) => {
    return await fetch(`${BASE_URL}/book-api/books/add-book`, {
        method: "POST",
        headers: {Authorization: `Bearer ${token}`},
        body: formData,});
}

export const updateBook = async (formData: FormData, isbn: number, token: string) => {
    return await fetch(`${BASE_URL}/book-api/books/update-book/${isbn}`, {
        method: "PUT",
        headers: {Authorization: `Bearer ${token}`},
        body: formData});
}

export const deleteBook = async (isbn: number, token:string) => {
    return await fetch(`${BASE_URL}/book-api/books/delete/${isbn}`, {
        method: "DELETE",
        headers: {Authorization: `Bearer ${token}`}
    });
}