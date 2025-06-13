// const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const getAllBooks = async (token: string) => {
    return await fetch('/book-api/all-books',{
        headers: {authorization: `Bearer ${token}`},
        method: "GET",
    })
    
}

export const addBook = async (formData: FormData, token: string) => {
    return await fetch('/book-api/add-book', {
        method: "POST",
        headers: {authorization: `Bearer ${token}`},
        body: formData,});
}

export const updateBook = async (formData: FormData, isbn: number, token: string) => {
    return await fetch(`/book-api/update-book/${isbn}`, {
        method: "PUT",
        headers: {authorization: `Bearer ${token}`},
        body: formData});
}

export const deleteBook = async (isbn: number, token:string) => {
    return await fetch(`/book-api/delete/${isbn}`, {
        method: "DELETE",
        headers: {authorization: `Bearer ${token}`}
    });
}

export const decodeJwt = (token: string) => {
    try {
        const payload = token.split(".")[1];
        const decodedPayload = JSON.parse(atob(payload));
        return decodedPayload;
    } catch (error) {
        console.error("Error decoding JWT:", error);
        return null;
    }
};