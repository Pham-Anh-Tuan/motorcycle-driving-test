package com.example.backend.core.request;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class SignReq {
    private String id;
    private String code;
    private String title;
    private String imageName;
    private MultipartFile imageFile;
    private String description;
}
