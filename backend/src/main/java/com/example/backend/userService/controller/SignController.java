package com.example.backend.userService.controller;

import com.example.backend.core.request.McQuestionReq;
import com.example.backend.core.request.SignReq;
import com.example.backend.userService.service.McQuestionService;
import com.example.backend.userService.service.SignService;
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
public class SignController {
    @Autowired
    private SignService signService;

    @GetMapping(path = "/admin/search-signs")
    public Map<String, Object> searchSigns(
            @RequestParam(defaultValue = "") String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "15") int size
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").ascending());
        return signService.searchSigns(keyword, pageable);
    }

    @GetMapping(path = "/admin/manager-signs")
    public Map<String, Object> getManagerSigns(@RequestParam(defaultValue = "0") int page,
                                                   @RequestParam(defaultValue = "15") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return signService.getManagerSigns(pageable);
    }

    @GetMapping(path = "/admin/sign/{id}")
    public ResponseEntity<?> getSignRes(@PathVariable("id") String id) {
        return signService.getSignRes(id);
    }

    @PostMapping(value = "/admin/create-sign", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createSign(@ModelAttribute SignReq signReq) {
        return signService.createSign(signReq);
    }

    @PostMapping(value = "/admin/update-sign", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateSign(@ModelAttribute SignReq signReq) {
        return signService.updateSign(signReq);
    }

    @DeleteMapping("/admin/delete-sign/{id}")
    public ResponseEntity<?> deleteSign(@PathVariable String id) {
        return signService.deleteSign(id);
    }
}
