package com.bookapi.book_api.dtos;

import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

//add this for presentation layer
//This thing really is unecessary as I am the one managing everything
//if someone else were managing the layer then it would be useful,
//however since I do the conversinos in the book service there is no point
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookDto {
    @Id
    private Long isbn;

    @NotBlank(message = "This field is required")
    private String title;

    @NotBlank(message = "This field is required")
    private String author;

    @NotBlank(message = "This field is required")
    private String description;

    @NotBlank(message = "This field is required")
    private String category;

    @NotNull(message = "This field is required")
    private Double price;

    @NotNull(message = "This field is required")
    private Integer quantity;

    private String bookCover;

    private String bookCoverUrl;
}
