package com.bookapi.book_api.advice;

import java.nio.file.FileAlreadyExistsException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.bookapi.book_api.exception.BadImageRequestException;
import com.bookapi.book_api.exception.BookNotFoundException;
import com.bookapi.book_api.exception.UserAlreadyExistsException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGlobalException(Exception ex) {
        ErrorResponse errorResponse = new ErrorResponse(LocalDateTime.now(),
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                "An error occured", ex.getMessage());
        return new ResponseEntity<ErrorResponse>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<String, String>();
        ex.getBindingResult().getFieldErrors().forEach(
                error -> errors.put(error.getField(), error.getDefaultMessage()));
        ErrorResponse errorResponse = new ErrorResponse(LocalDateTime.now(), HttpStatus.BAD_REQUEST.value(),
                "Validation Error", errors.toString());
        return new ResponseEntity<ErrorResponse>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(BadImageRequestException.class)
    public ResponseEntity<ErrorResponse> handleBadImageRequestException(BadImageRequestException ex) {
        ErrorResponse errorResponse = new ErrorResponse(LocalDateTime.now(), HttpStatus.BAD_REQUEST.value(),
                "Not a valid image", ex.getMessage());
        return new ResponseEntity<ErrorResponse>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(FileAlreadyExistsException.class)
    public ResponseEntity<ErrorResponse> handleFileAlreadyExistsException(FileAlreadyExistsException ex) {
        ErrorResponse errorResponse = new ErrorResponse(LocalDateTime.now(), HttpStatus.CONFLICT.value(),
                "Book Cover Image Already Exists", ex.getMessage());
        return new ResponseEntity<ErrorResponse>(errorResponse, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(BookNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleResourceNotFoundException(BookNotFoundException ex) {
        ErrorResponse errorResponse = new ErrorResponse(LocalDateTime.now(), HttpStatus.NOT_FOUND.value(),
                "Book Not Found", ex.getMessage());
        return new ResponseEntity<ErrorResponse>(errorResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorResponse> handleAccessDeniedException(AccessDeniedException ex) {
        ErrorResponse errorResponse = new ErrorResponse(LocalDateTime.now(), HttpStatus.UNAUTHORIZED.value(),
                "Access Denied", ex.getMessage());
        return new ResponseEntity<ErrorResponse>(errorResponse, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<ErrorResponse> handleUserAlreadyExistsException(UserAlreadyExistsException ex) {
        ErrorResponse errorResponse = new ErrorResponse(LocalDateTime.now(), HttpStatus.CONFLICT.value(),
                "User Already Exists", ex.getMessage());
        return new ResponseEntity<ErrorResponse>(errorResponse, HttpStatus.CONFLICT);
    }

}
