package com.example.backend.userService.repository;

import com.example.backend.userService.model.Sign;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SignRepository extends JpaRepository<Sign, String> {
    List<Sign> findAllByOrderByCreatedAtDesc();

    Page<Sign> findAllByOrderByCreatedAtDesc(Pageable pageable);

    Page<Sign> findByCodeContainingIgnoreCaseOrTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(
            String code, String title, String description, Pageable pageable
    );
}
