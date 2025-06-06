package com.bookapi.book_api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bookapi.book_api.entities.Book;

public interface BookRepository extends JpaRepository<Book, Long> {

}
