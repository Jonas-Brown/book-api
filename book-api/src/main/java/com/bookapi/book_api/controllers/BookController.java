package com.bookapi.book_api.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.bookapi.book_api.dtos.BookDto;
import com.bookapi.book_api.services.BookService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

@Slf4j
@RestController
@RequestMapping("api/v1/books")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class BookController {

    private final BookService bookService;

    // doesn't handle when a new file is sent or no file is sent. Is close though
    @PostMapping("/add-book")
    public ResponseEntity<BookDto> addBook(@RequestPart String bookDtoJson,
            @RequestPart(required = false) MultipartFile file) throws IOException {

        if (file == null || file.isEmpty())
            file = null;
        BookDto bookDto = getBookDto(bookDtoJson);
        return ResponseEntity.status(HttpStatus.CREATED).body(bookService.addBook(bookDto, file));
    }

    @GetMapping("/all-books")
    public ResponseEntity<List<BookDto>> getAllBooks() {
        return ResponseEntity.ok(bookService.getAllBooks());
    }

    @GetMapping("/get-book/{isbn}")
    public ResponseEntity<BookDto> getBook(@PathVariable Long isbn) {
        return ResponseEntity.ok(bookService.getBook(isbn));
    }

    @PutMapping("update-book/{isbn}")
    public ResponseEntity<BookDto> updateBook(@PathVariable Long isbn,
            @RequestPart(required = false) MultipartFile file, @RequestPart String bookDtoJson) throws IOException {
        if (file == null || file.isEmpty())
            file = null;
        BookDto bookDto = getBookDto(bookDtoJson);

        return ResponseEntity.ok(bookService.updateBook(isbn, bookDto, file));
    }

    @DeleteMapping("/delete/{isbn}")
    public ResponseEntity<String> deleteBook(@PathVariable Long isbn) throws IOException {
        return ResponseEntity.ok(bookService.deleteBook(isbn));
    }

    private BookDto getBookDto(String bookDtoJson) {
        BookDto bookDto = new BookDto();
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            bookDto = objectMapper.readValue(bookDtoJson, BookDto.class);
        } catch (JsonProcessingException e) {
            log.info("Exception in converting string to JSON : {}", e.getMessage());
        }
        return bookDto;
    }

}
