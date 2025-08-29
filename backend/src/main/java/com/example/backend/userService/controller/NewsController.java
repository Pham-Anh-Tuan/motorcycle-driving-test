package com.example.backend.userService.controller;

import com.example.backend.core.request.NewsReq;
import com.example.backend.userService.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class NewsController {
    @Autowired
    private NewsService newsService;

    @GetMapping(path = "/admin/manager-news")
    public Map<String, Object> getManagerNews(@RequestParam(defaultValue = "0") int page,
                                              @RequestParam(defaultValue = "15") int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return newsService.getManagerNews(pageable);
    }

    @GetMapping(path = "/admin/search-news")
    public Map<String, Object> searchManagerBlogs(@RequestParam(defaultValue = "") String keyword,
                                                  @RequestParam(defaultValue = "0") int page,
                                                  @RequestParam(defaultValue = "15") int size
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return newsService.searchNews(keyword, pageable);
    }

    @GetMapping(path = "/admin/updated-news/{id}")
    public ResponseEntity<?> getUpdatedNews(@PathVariable("id") String id) {
        return newsService.getUpdatedNewsRes(id);
    }

    @PostMapping(value = "/admin/create-news", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createNews(@ModelAttribute NewsReq newsReq) {
        return newsService.createNews(newsReq);
    }

    @PostMapping(value = "/admin/update-news", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateNews(@ModelAttribute NewsReq newsReq) {
        return newsService.updateNews(newsReq);
    }

    @DeleteMapping("/admin/delete-news/{id}")
    public ResponseEntity<?> deleteNews(@PathVariable("id") String id) {
        return newsService.deleteNews(id);
    }



}
