package com.bookapi.book_api.controllers;

import com.bookapi.book_api.repositories.LibraryUserRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookapi.book_api.entities.LibraryUser;
import com.bookapi.book_api.exception.UserAlreadyExistsException;
import com.bookapi.book_api.jwt.JwtUtils;
import com.bookapi.book_api.jwt.LoginRequest;
import com.bookapi.book_api.jwt.LoginResponse;
import com.bookapi.book_api.jwt.RegisterRequest;
import com.bookapi.book_api.jwt.RegisterResponse;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("book-api")
public class JwtController {

    private final LibraryUserRepository libraryUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

    @PostMapping(value = "/login")
    public ResponseEntity<?> createJwtToken(@RequestBody LoginRequest loginRequest) throws Exception {
        // Create Authenticate object (setup the username/pwd)
        Authentication authentication;

        try {
            authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        } catch (DisabledException e) {
            Map<String, Object> errorMap = new HashMap<>();
            errorMap.put("msg", "Account is diabled");
            errorMap.put("status", false);
            return new ResponseEntity<Object>(errorMap, HttpStatus.LOCKED);

        } catch (BadCredentialsException e) {
            Map<String, Object> errorMap = new HashMap<>();
            errorMap.put("msg", "Invalid credentials");
            errorMap.put("status", false);
            return new ResponseEntity<Object>(errorMap, HttpStatus.UNAUTHORIZED);

        }
        SecurityContextHolder.getContext().setAuthentication(authentication);
        // Authenticate the user name and pwd in the database
        final UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        // If username is found for the given password then create jwt token
        final String jwtToken = jwtUtils.generateToken(userDetails);
        final List<String> roles = authentication.getAuthorities()
                .stream()
                .map(role -> role.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new LoginResponse(jwtToken, userDetails.getUsername(), roles));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> createUser(@RequestBody RegisterRequest registerRequest) throws Exception {
        // could place this logic elsewhere
        if (libraryUserRepository.existsByEmail(registerRequest.getEmail())) {
            throw new UserAlreadyExistsException("User already exists with email: " +
                    registerRequest.getEmail());
        }

        LibraryUser user = LibraryUser.builder()
                .firstName(registerRequest.getFirstName())
                .lastName(registerRequest.getLastName())
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .roles(registerRequest.getRoles())
                .build();

        libraryUserRepository.save(user);

        Authentication authentication;

        try {
            authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(registerRequest.getEmail(), registerRequest.getPassword()));
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
        }

        final UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        // If username is found for the given password then create jwt token
        final String jwtToken = jwtUtils.generateToken(userDetails);
        final List<String> roles = authentication.getAuthorities()
                .stream()
                .map(role -> role.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity
                .ok(new RegisterResponse(jwtToken, user.getFirstName(), user.getLastName(), user.getEmail(), roles));
    }
}