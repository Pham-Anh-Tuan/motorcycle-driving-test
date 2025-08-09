package com.example.backend.userService.controller;

import com.example.backend.core.request.McQuestionReq;
import com.example.backend.userService.service.McQuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class McQuestionController {
    @Autowired
    private McQuestionService mcQuestionService;

    @PostMapping(value = "/admin/createMcQuestion", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createBanner(@ModelAttribute McQuestionReq mcQuestionReq) {
        return mcQuestionService.createMcQuestion(mcQuestionReq);
    }

}
