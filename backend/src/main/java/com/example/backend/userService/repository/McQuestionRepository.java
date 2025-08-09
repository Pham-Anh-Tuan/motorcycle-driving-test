package com.example.backend.userService.repository;

import com.example.backend.userService.model.McQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface McQuestionRepository extends JpaRepository<McQuestion, String> {

}
