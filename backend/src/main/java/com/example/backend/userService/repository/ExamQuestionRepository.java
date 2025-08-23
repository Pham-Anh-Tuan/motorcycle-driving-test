package com.example.backend.userService.repository;

import com.example.backend.userService.model.Exam;
import com.example.backend.userService.model.ExamQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExamQuestionRepository extends JpaRepository<ExamQuestion, String> {
    List<ExamQuestion> findByExam(Exam exam);
}
