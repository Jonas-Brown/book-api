package com.bookapi.book_api.dtos;

import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookDto {

    @Id
    @NotNull(message = "The isbn field is required")
    @Positive
    private Long isbn;

    @NotBlank(message = "The title field is required")
    private String title;

    @NotBlank(message = "The author field is required")
    private String author;

    @NotBlank(message = "The description field is required")
    private String description;

    @NotBlank(message = "The category is required")
    private String category;

    @NotNull(message = "The price field is required")
    @Positive
    private Double price;

    @NotNull(message = "The quantity field is required")
    @Positive
    private Integer quantity;

    private String bookCover;
    private String bookCoverUrl;

}
