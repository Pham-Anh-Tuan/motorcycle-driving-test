package com.example.backend.core.response;

import lombok.Data;

@Data
public class LoginRes {
    private String token;
    private String email;
    private String fullName;
    private String imageName;
    private int role;

    public LoginRes(String token, String email, String fullName, String imageName, int role) {
        this.token = token;
        this.email = email;
        this.fullName = fullName;
        this.imageName = imageName;
        this.role = role;
    }
}
