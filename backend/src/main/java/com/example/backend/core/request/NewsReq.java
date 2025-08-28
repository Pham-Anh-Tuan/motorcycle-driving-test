package com.example.backend.core.request;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class NewsReq {
    private String id;
    private String title;
    private String thumbnailName;
    private MultipartFile thumbnailFile;
    private String content;
}
