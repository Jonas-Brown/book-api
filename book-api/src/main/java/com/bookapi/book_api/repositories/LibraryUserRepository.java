package com.bookapi.book_api.repositories;

import com.bookapi.book_api.entities.LibraryUser;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface LibraryUserRepository extends JpaRepository<LibraryUser, Integer> {
    Optional<LibraryUser> findByEmail(String email);
}