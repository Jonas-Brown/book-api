package com.bookapi.book_api.jwt;

import lombok.Data;

@Data
public class RegisterRequest {
    String firstName;
    String lastName;
    String email;
    String password;
    String role;

}
