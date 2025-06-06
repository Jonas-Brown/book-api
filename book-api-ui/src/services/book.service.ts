import axios from "axios";

//swap the axios over to use base fetch
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const getAllBooks = async () => {
    return await axios.get(`${BASE_URL}/api/v1/books/all-books`)
}

export const addBook = async (formData: FormData) => {
    return await axios.post(`${BASE_URL}/api/v1/books/add-book`, formData)
}

export const updateBook = async (formData: FormData, isbn: number) => {
    return await axios.put(`${BASE_URL}/api/v1/books/update-book/${isbn}`, formData)
}

export const deleteBook = async (isbn: number) => {
    return await axios.delete(`${BASE_URL}/api/v1/books/delete/${isbn}`)
}