package com.example.backend.userService.controller;

import com.example.backend.userService.service.ExamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ExamController {
    @Autowired
    private ExamService examService;

    @GetMapping("/public/exam-number-list")
    public ResponseEntity<?> getExamNumberList() {
        return ResponseEntity.ok(examService.getExamNumberList());
    }

    @GetMapping(path = "/public/questions/{examNumber}")
    public ResponseEntity<?> getQuestionsByExamNumber(@PathVariable("examNumber") int examNumber) {
        return ResponseEntity.ok(examService.getQuestionsByExamNumber(examNumber));
    }
}
