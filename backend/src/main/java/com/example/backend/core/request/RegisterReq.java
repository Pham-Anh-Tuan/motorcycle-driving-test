package com.example.backend.core.request;

import lombok.Data;

@Data
public class RegisterReq {
    private String email;
    private String fullName;
    private String password;
}
