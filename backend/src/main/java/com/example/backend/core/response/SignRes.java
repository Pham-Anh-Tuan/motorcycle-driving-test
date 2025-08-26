package com.example.backend.core.response;

import lombok.Data;

@Data
public class SignRes {
    private String id;
    private String code;
    private String title;
    private String imageName;
    private String description;

    public SignRes(String id, String code, String title, String imageName, String description) {
        this.id = id;
        this.code = code;
        this.title = title;
        this.imageName = imageName;
        this.description = description;
    }
}
