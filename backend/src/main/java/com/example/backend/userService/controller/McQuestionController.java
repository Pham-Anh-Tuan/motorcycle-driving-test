package com.example.backend.userService.controller;

import com.example.backend.core.dto.DonutSliceDTO;
import com.example.backend.core.dto.SeriesItemDTO;
import com.example.backend.core.request.McQuestionReq;
import com.example.backend.userService.service.McQuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
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

    @GetMapping(path = "/public/critical-questions")
    public ResponseEntity<?> getCriticalMcQuestions() {
        return ResponseEntity.ok(mcQuestionService.getCriticalMcQuestions(true));
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

    @GetMapping(path = "/public/build-random-A1-exam")
    public ResponseEntity<?> buildRandomA1Exam() {
        return mcQuestionService.buildRandomA1Exam();
    }

//    @GetMapping(path = "/public/generate_exams")
//    public ResponseEntity<?> generateExams() {
//        examService.generateExams();
//        return ResponseEntity.ok("ok");
//    }

    @GetMapping(path = "/public/mcQuestion-type/{type}")
    public ResponseEntity<?> getMcQuestionsByType(@PathVariable("type") String type) {
        return mcQuestionService.getMcQuestionListByType(type);
    }

    @GetMapping(path = "/public/mcQuestion-by-numbers")
    public ResponseEntity<?> getByNumbers() {
        List<Integer> numbers = Arrays.asList(
                225, 217, 218, 224, 230, 71, 49, 62, 173, 160,
                215, 219, 223, 233, 239, 241, 249, 247, 246, 248,
                156, 226, 191, 95, 231, 229, 168, 142, 195, 194
        );
        return mcQuestionService.getQuestionsByNumbers(numbers);
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

    @GetMapping("/admin/questions/by-type")
    public ResponseEntity<List<SeriesItemDTO>> getQuestionStatsByType() {
        return ResponseEntity.ok(mcQuestionService.getQuestionStatsByType());
    }

    @GetMapping("/admin/questions/critical-vs-noncritical")
    public ResponseEntity<List<DonutSliceDTO>> getCriticalVsNonCritical() {
        return ResponseEntity.ok(mcQuestionService.getCriticalVsNonCriticalStats());
    }
}
