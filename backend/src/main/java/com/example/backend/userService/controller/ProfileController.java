package com.example.backend.userService.controller;

import com.example.backend.userService.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ProfileController {
    @Autowired
    private ProfileService profileService;

    @GetMapping(path = "/user/profile/{email}")
    public ResponseEntity<?> getProfileByEmail(@PathVariable("email") String email) {
        return profileService.getProfileByEmail(email);
    }
}
