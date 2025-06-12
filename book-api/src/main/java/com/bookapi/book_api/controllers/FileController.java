package com.bookapi.book_api.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.bookapi.book_api.services.FileService;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

import java.io.IOException;
import java.io.InputStream;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("book-api")
@RequiredArgsConstructor
public class FileController {

    private final FileService fileService;

    // gets the path from application.yaml file
    @Value("${project.images}")
    private String path;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestPart MultipartFile file) throws IOException {
        String uploadedFileName = fileService.uploadFile(path, file);
        return ResponseEntity.ok("File uploaded is " + uploadedFileName);
    }

    @GetMapping(value = "/{filename}", produces = MediaType.IMAGE_PNG_VALUE)
    public void getResource(@PathVariable String filename, HttpServletResponse response) throws IOException {
        InputStream resourceFile = fileService.getResourceFile(path, filename);
        response.setContentType(MediaType.IMAGE_PNG_VALUE);
        StreamUtils.copy(resourceFile, response.getOutputStream());
    }

}
