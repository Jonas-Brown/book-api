package com.bookapi.book_api.services;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.bookapi.book_api.dtos.BookDto;

public interface BookService {
    BookDto addBook(BookDto bookDto, MultipartFile file) throws IOException;

    BookDto getBook(Long isbn);

    List<BookDto> getAllBooks();

    BookDto updateBook(Long isbn, BookDto bookDto, MultipartFile file) throws IOException;

    String deleteBook(Long isbn) throws IOException;
}
