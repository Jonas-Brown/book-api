package com.bookapi.book_api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class BadImageRequestException extends RuntimeException {
    public BadImageRequestException(String message) {
        super(message);
    }
}
