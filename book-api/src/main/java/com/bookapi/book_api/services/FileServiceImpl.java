package com.bookapi.book_api.services;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.concurrent.CompletableFuture;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.bookapi.book_api.exception.BadImageRequestException;

@Service
public class FileServiceImpl implements FileService {

    @Override
    public String uploadFile(String path, MultipartFile file) throws IOException {
        if (!file.getContentType().substring(0, 5).equals("image"))
            throw new BadImageRequestException("Cannot accept non image files");

        String filename = file.getOriginalFilename();

        String filePath = path + File.separator + filename;

        // images/my_file.txt
        File f = new File(path);
        if (!f.exists()) {
            f.mkdir();
        }

        CompletableFuture.runAsync(() -> {
            try {
                // copy file to path
                Files.copy(file.getInputStream(), Paths.get(filePath));
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        });

        return filename;
    }

    @Override
    public InputStream getResourceFile(String path, String filename) throws FileNotFoundException {
        String fullPath = path + File.separator + filename;
        return new FileInputStream(fullPath);
    }

}
