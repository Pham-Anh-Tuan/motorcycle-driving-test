package com.example.backend.userService.controller;

import com.example.backend.core.request.ChangePasswordReq;
import com.example.backend.core.request.RegisterReq;
import com.example.backend.userService.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/public/register")
    public ResponseEntity<String> register(@RequestBody RegisterReq registerReq) {
        return authService.register(registerReq);
    }

    @PostMapping("/public/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        return authService.login(request);
    }

    @PostMapping("/user/change-password")
    public ResponseEntity<String> changePassword(@RequestBody ChangePasswordReq request) {
        return authService.changePassword(request.getEmail(), request.getOldPassword(), request.getNewPassword());
    }

    @PostMapping("/public/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        return authService.forgotPassword(email);
    }
}
