package com.example.backend.userService.controller;

import com.example.backend.userService.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/api/public")
public class ImageController {
    @Autowired
    private ImageService imageService;

    @GetMapping("/avatars/{imageName}")
    public ResponseEntity<byte[]> getAvatarImage(@PathVariable String imageName) throws IOException {
        return imageService.getImage(imageName, "avatars");
    }

    @GetMapping("/questionImages/{imageName}")
    public ResponseEntity<byte[]> getQuestionImage(@PathVariable String imageName) throws IOException {
        return imageService.getImage(imageName, "questionImg");
    }

    @GetMapping("/signImages/{imageName}")
    public ResponseEntity<byte[]> getSignImage(@PathVariable String imageName) throws IOException {
        return imageService.getImage(imageName, "signImg");
    }

    @GetMapping("/thumbImages/{imageName}")
    public ResponseEntity<byte[]> getThumbnailImage(@PathVariable String imageName) throws IOException {
        return imageService.getImage(imageName, "thumbnailImg");
    }

    @GetMapping("/newsImages/{imageName}")
    public ResponseEntity<byte[]> getNewsImage(@PathVariable String imageName) throws IOException {
        return imageService.getImage(imageName, "newsImg");
    }
}
