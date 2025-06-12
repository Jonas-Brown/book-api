const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const getAllBooks = async (token: string) => {
    return await fetch(`${BASE_URL}/book-api/all-books`,{
        headers: {authorization: `Bearer ${token}`},
        method: "GET",
    })
    
}

export const addBook = async (formData: FormData, token: string) => {
    return await fetch(`${BASE_URL}/book-api/add-book`, {
        method: "POST",
        headers: {authorization: `Bearer ${token}`},
        body: formData,});
}

export const updateBook = async (formData: FormData, isbn: number, token: string) => {
    return await fetch(`${BASE_URL}/book-api/update-book/${isbn}`, {
        method: "PUT",
        headers: {authorization: `Bearer ${token}`},
        body: formData});
}

export const deleteBook = async (isbn: number, token:string) => {
    return await fetch(`${BASE_URL}/book-api/delete/${isbn}`, {
        method: "DELETE",
        headers: {authorization: `Bearer ${token}`}
    });
}