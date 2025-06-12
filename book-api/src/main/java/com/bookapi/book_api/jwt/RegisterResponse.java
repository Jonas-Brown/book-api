package com.bookapi.book_api.jwt;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class RegisterResponse {
    private String jwtToken;
    private String firstName;
    private String lastName;
    private String email;
    private List<String> roles;
}