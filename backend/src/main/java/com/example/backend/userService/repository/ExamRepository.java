package com.example.backend.userService.repository;

import com.example.backend.userService.model.Exam;
import com.example.backend.userService.model.ExamQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExamRepository extends JpaRepository<Exam, String> {
    Exam findByExamNumber(int examNumber);
}
