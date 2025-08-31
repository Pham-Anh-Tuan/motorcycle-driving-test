package com.example.backend.core.request;

import lombok.Data;

@Data
public class ChangePasswordReq {
    private String email;
    private String oldPassword;
    private String newPassword;
}
