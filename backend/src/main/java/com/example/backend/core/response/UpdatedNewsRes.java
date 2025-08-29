package com.example.backend.core.response;

import lombok.Data;

@Data
public class UpdatedNewsRes {
    private String title;
    private String thumbnailName;
    private String content;

    public UpdatedNewsRes(String title, String thumbnailName, String content) {
        this.title = title;
        this.thumbnailName = thumbnailName;
        this.content = content;
    }
}
