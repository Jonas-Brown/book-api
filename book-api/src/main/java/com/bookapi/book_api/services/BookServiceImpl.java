package com.bookapi.book_api.services;

import java.io.File;
import java.io.IOException;
import java.nio.file.FileAlreadyExistsException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.bookapi.book_api.dtos.BookDto;
import com.bookapi.book_api.entities.Book;
import com.bookapi.book_api.exception.BookNotFoundException;
import com.bookapi.book_api.repositories.BookRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {

    // gets location of the file
    @Value("${project.images}")
    private String path;

    @Value("${base.url}")
    private String baseUrl;

    private final BookRepository bookRepository;
    private final FileService fileService;

    @Override
    @Transactional
    public BookDto addBook(BookDto bookDto, MultipartFile file) throws IOException {
        // look at potentially throwing this back to the front end for an update
        if (bookRepository.existsById(bookDto.getIsbn()))
            return updateBook(bookDto.getIsbn(), bookDto, file);

        String uploadedFileName = null;
        String bookCoverUrl = null;
        if (file != null) {
            if (Files.exists(Paths.get(path + File.separator + file.getOriginalFilename()))) {
                throw new FileAlreadyExistsException("File already exists! Please give another file!");
            }

            uploadedFileName = fileService.uploadFile(path, file);
            bookCoverUrl = baseUrl + "/api/v1/file/" + uploadedFileName;
        }

        // swaps over to book to be sent to DB and then swapped back
        Book book = convertToBook(bookDto, uploadedFileName, bookCoverUrl);

        Book savedBook = bookRepository.save(book);

        return convertToBookDto(savedBook);
    }

    @Override
    public BookDto getBook(Long isbn) {
        Book book = bookRepository.findById(isbn)
                .orElseThrow(() -> new BookNotFoundException("Book not found with isbn : " + isbn));
        return convertToBookDto(book);
    }

    @Override
    public List<BookDto> getAllBooks() {
        List<Book> books = bookRepository.findAll();
        return books.stream()
                .map((Book book) -> convertToBookDto(book))
                .toList();
    }

    // could be named better
    private String handleFileIssue(String bookCover, MultipartFile file) throws IOException {
        String bookCoverRes = fileService.uploadFile(path, file);
        CompletableFuture.runAsync(() -> {
            try {
                Files.deleteIfExists(Paths.get(path + File.separator + bookCover));

            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        });
        return bookCoverRes;
    }

    @Override
    @Transactional
    public BookDto updateBook(Long isbn, BookDto bookDto, MultipartFile file) throws IOException {

        Book book = bookRepository.findById(isbn)
                .orElseThrow(() -> new BookNotFoundException(("Book not found with isbn: " + isbn)));
        String bookCover = book.getBookCover();
        String bookCoverUrl = book.getBookCoverUrl();

        if (file != null) {
            bookCover = handleFileIssue(bookCover, file);
            bookCoverUrl = baseUrl + "/api/v1/file/" + bookCover;
        }

        book.setTitle(bookDto.getTitle());
        book.setAuthor(bookDto.getAuthor());
        book.setPrice(bookDto.getPrice());
        book.setDescription(bookDto.getDescription());
        book.setCategory(bookDto.getCategory());
        book.setQuantity(bookDto.getQuantity());
        book.setBookCover(bookCover);
        book.setBookCoverUrl(bookCoverUrl);

        Book updatedBook = bookRepository.save(book);

        return convertToBookDto(updatedBook);
    }

    @Override
    @Transactional
    public String deleteBook(Long isbn) throws IOException {
        Book book = bookRepository.findById(isbn)
                .orElseThrow(() -> new BookNotFoundException(("Book not found with isbn: " + isbn)));
        Files.deleteIfExists(Paths.get(path + File.separator + book.getBookCover()));
        bookRepository.delete(book);
        return "Book Deleted successfully with isbn : " + isbn;
    }

    private BookDto convertToBookDto(Book book) {
        return BookDto.builder()
                .isbn(book.getIsbn())
                .title(book.getTitle())
                .author(book.getAuthor())
                .price(book.getPrice())
                .description(book.getDescription())
                .category(book.getCategory())
                .quantity(book.getQuantity())
                .build();

    }

    private Book convertToBook(BookDto bookDto, String bookCover, String bookCoverUrl) {
        return Book.builder()
                .isbn(bookDto.getIsbn())
                .title(bookDto.getTitle())
                .author(bookDto.getAuthor())
                .price(bookDto.getPrice())
                .description(bookDto.getDescription())
                .category(bookDto.getCategory())
                .quantity(bookDto.getQuantity())
                .bookCover(bookCover)
                .bookCoverUrl(bookCoverUrl)
                .build();
    }
}
