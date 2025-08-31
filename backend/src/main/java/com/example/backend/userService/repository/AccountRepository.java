package com.example.backend.userService.repository;

import com.example.backend.userService.model.Account;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, String> {
    Optional<Account> findByEmail(String email);
    Page<Account> findAllByOrderByCreatedAtDesc(Pageable pageable);
}
