package com.example.backend.core.response;

import lombok.Getter;

@Getter
public class ProfileRes {
    private String email;
    private String fullName;
    private String imageName = "";

    public ProfileRes(String email, String fullName, String imageName) {
        this.email = email;
        this.fullName = fullName;
        this.imageName = imageName;
    }
}
