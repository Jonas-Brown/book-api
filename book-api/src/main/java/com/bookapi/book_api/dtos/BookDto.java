package com.bookapi.book_api.dtos;

import jakarta.persistence.Id;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
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

    private static final int ISBN_LENGTH = 13;

    @Id
    @NotBlank(message = "The isbn field is required")
    @Size(min = ISBN_LENGTH, max = ISBN_LENGTH, message = "isbn must be 13 characters long")
    @Min(0)
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
    @DecimalMin("0.00")
    private Double price;

    @NotNull(message = "The quantity field is required")
    @Min(0)
    private Integer quantity;

}
