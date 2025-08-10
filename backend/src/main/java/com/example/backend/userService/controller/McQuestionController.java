package com.example.backend.userService.controller;

import com.example.backend.core.request.McQuestionReq;
import com.example.backend.userService.service.McQuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class McQuestionController {
    @Autowired
    private McQuestionService mcQuestionService;

    @GetMapping(path = "/admin/managerMcQuestions")
    public Map<String, Object> getManagerProducts(@RequestParam(defaultValue = "0") int page,
                                                  @RequestParam(defaultValue = "15") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return mcQuestionService.getManagerMcQuestions(pageable);
    }

    @GetMapping(path = "/admin/searchManagerMcQuestions")
    public Map<String, Object> searchManagerMcQuestions(
            @RequestParam(defaultValue = "") String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "15") int size
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("questionNumber").ascending());
        return mcQuestionService.searchManagerMcQuestions(keyword, pageable);
    }

    @PostMapping(value = "/admin/createMcQuestion", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createBanner(@ModelAttribute McQuestionReq mcQuestionReq) {
        return mcQuestionService.createMcQuestion(mcQuestionReq);
    }

}
