package com.example.backend.userService.service;

import com.example.backend.core.config.ImageConfig;
import com.example.backend.core.config.NewsImgApi;
import com.example.backend.core.mapper.NewsMapper;
import com.example.backend.core.mapper.SignMapper;
import com.example.backend.core.request.NewsReq;
import com.example.backend.core.utils.ImageProcessor;
import com.example.backend.userService.model.News;
import com.example.backend.userService.model.Sign;
import com.example.backend.userService.repository.NewsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;
import java.util.*;
import java.util.function.Function;

@Service
public class NewsService {
    @Autowired
    private NewsRepository newsRepository;

    @Autowired
    private ImageService imageService;

    private Map<String, Object> toPagedResponse(Page<News> newsPage, Function<Page<News>, List<?>> mapper) {
        Map<String, Object> response = new HashMap<>();
        response.put("content", mapper.apply(newsPage));
        response.put("totalElements", newsPage.getTotalElements());
        response.put("totalPages", newsPage.getTotalPages());
        response.put("number", newsPage.getNumber());
        response.put("size", newsPage.getSize());
        response.put("hasNext", newsPage.hasNext());
        response.put("hasPrevious", newsPage.hasPrevious());
        return response;
    }

    public Map<String, Object> searchNews(String keyword, Pageable pageable) {
        Page<News> newsPage =  newsRepository.search(
                        keyword, pageable
                );
        return toPagedResponse(newsPage, NewsMapper::toManagerNewsResList);
    }

    public Map<String, Object> getManagerNews(Pageable pageable) {
        Page<News> newsPage = newsRepository.findAllByOrderByCreatedAtDesc(pageable);
        return toPagedResponse(newsPage, NewsMapper::toManagerNewsResList);
    }

    @Transactional
    public ResponseEntity<?> createNews(NewsReq newsReq) {
        News news = new News();
        news.setId(UUID.randomUUID().toString());
        news.setTitle(newsReq.getTitle());
        news.setContent(newsReq.getContent());

        MultipartFile file = newsReq.getThumbnailFile();
        imageService.setPath(ImageConfig.thumbnailPath);
        try {
            String imageName = imageService.saveImage(file);
            news.setThumbnailName(imageName);
        } catch (IOException e) {
            return ResponseEntity.badRequest().body("Lưu ảnh thất bại");
        }

        try {
            news.setContent(ImageProcessor.processBase64Images(newsReq.getContent(), ImageConfig.newsPath, NewsImgApi.newsImgApi));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        newsRepository.save(news);
        return ResponseEntity.ok("1");
    }
}
