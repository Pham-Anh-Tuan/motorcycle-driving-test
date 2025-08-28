package com.example.backend.core.response;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ManagerNewsRes {
    private String id;
    private String title;
    private String thumbnailName;
    private LocalDateTime createdAt;

    public ManagerNewsRes(String id, String title, String thumbnailName, LocalDateTime createdAt) {
        this.id = id;
        this.title = title;
        this.thumbnailName = thumbnailName;
        this.createdAt = createdAt;
    }
}
