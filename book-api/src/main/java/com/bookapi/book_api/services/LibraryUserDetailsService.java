package com.bookapi.book_api.services;

import java.util.Optional;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.bookapi.book_api.entities.LibraryUser;
import com.bookapi.book_api.repositories.LibraryUserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LibraryUserDetailsService implements UserDetailsService {

    private final LibraryUserRepository libraryUserRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<LibraryUser> user = libraryUserRepository.findByEmail(email);
        if (user.isPresent()) {
            var userObject = user.get();
            return User.builder()
                    .username(email)
                    .password(userObject.getPassword())
                    .roles(getRoles(userObject))
                    .build();
        } else {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }
    }

    private String[] getRoles(LibraryUser user) {
        if (user.getRole() == null) {
            return new String[] { "USER" };
        }
        return user.getRole().split(",");
    }

}
