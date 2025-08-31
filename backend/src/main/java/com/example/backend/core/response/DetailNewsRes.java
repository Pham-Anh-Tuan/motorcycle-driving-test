package com.example.backend.core.response;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class DetailNewsRes {
    private String title;
    private String content;
    private LocalDateTime createdAt;

    public DetailNewsRes(String title, String content, LocalDateTime createdAt) {
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
    }
}
