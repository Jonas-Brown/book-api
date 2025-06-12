package com.bookapi.book_api.jwt;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;
}