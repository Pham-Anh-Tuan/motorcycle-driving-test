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

    @GetMapping("/admin/max-question-number")
    public ResponseEntity<Integer> getMaxQuestionNumber() {
        return ResponseEntity.ok(mcQuestionService.getMaxQuestionNumber());
    }

    @GetMapping(path = "/admin/managerMcQuestions")
    public Map<String, Object> getManagerQuestions(@RequestParam(defaultValue = "0") int page,
                                                  @RequestParam(defaultValue = "15") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return mcQuestionService.getManagerMcQuestions(pageable);
    }

    @GetMapping(path = "/admin/managerCriticalMcQuestions")
    public Map<String, Object> getManagerCriticalQuestions(@RequestParam(defaultValue = "0") int page,
                                                  @RequestParam(defaultValue = "15") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return mcQuestionService.getManagerCriticalMcQuestions(pageable);
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

    @GetMapping(path = "/public/mcQuestion/{id}")
    public ResponseEntity<?> getMcQuestionRes(@PathVariable("id") String id) {
        return mcQuestionService.getMcQuestionRes(id);
    }

    @PostMapping(value = "/admin/createMcQuestion", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createMcQuestion(@ModelAttribute McQuestionReq mcQuestionReq) {
        return mcQuestionService.createMcQuestion(mcQuestionReq);
    }

    @PostMapping(value = "/admin/updateMcQuestion", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateMcQuestion(@ModelAttribute McQuestionReq mcQuestionReq) {
        return mcQuestionService.updateMcQuestion(mcQuestionReq);
    }

    @DeleteMapping("/admin/deleteMcQuestion/{id}")
    public ResponseEntity<?> deleteMcQuestion(@PathVariable String id) {
        return mcQuestionService.deleteMcQuestion(id);
    }
}
