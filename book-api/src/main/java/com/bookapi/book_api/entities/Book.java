package com.bookapi.book_api.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Book {
    @Id
    private Long isbn;

    @Column(nullable = false)
    @NotBlank(message = "This field is required")
    private String title;

    @Column(nullable = false)
    @NotBlank(message = "This field is required")
    private String author;

    @Column(nullable = false)
    @NotBlank(message = "This field is required")
    private String description;

    @Column(nullable = false)
    @NotBlank(message = "This field is required")
    private String category;

    @Column(nullable = false)
    @NotNull(message = "This field is required")
    private Double price;

    @Column(nullable = false)
    @NotNull(message = "This field is required")
    private Integer quantity;

    private String bookCover;

    private String bookCoverUrl;
}
