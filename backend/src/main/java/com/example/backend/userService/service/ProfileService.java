package com.example.backend.userService.service;

import com.example.backend.core.response.ProfileRes;
import com.example.backend.userService.model.Account;
import com.example.backend.userService.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProfileService {
    @Autowired
    private AccountRepository accountRepository;

    public ResponseEntity<?> getProfileByEmail(String email) {
        Optional<Account> account = accountRepository.findByEmail(email);

        if (!account.isPresent()) {
            return ResponseEntity.badRequest().body("This account not found");
        }
        Account acc = account.get();
        ProfileRes profileRes = new ProfileRes(
                acc.getEmail(),
                acc.getFullName(),
                acc.getImageName());
        return ResponseEntity.ok(profileRes);
    }
}
