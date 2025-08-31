package com.example.backend.userService.service;

import com.example.backend.core.config.ImageConfig;
import com.example.backend.core.config.NewsImgApi;
import com.example.backend.core.mapper.NewsMapper;
import com.example.backend.core.mapper.SignMapper;
import com.example.backend.core.request.NewsReq;
import com.example.backend.core.utils.ImageProcessor;
import com.example.backend.userService.model.McQuestion;
import com.example.backend.userService.model.News;
import com.example.backend.userService.model.Sign;
import com.example.backend.userService.repository.NewsRepository;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.nio.file.Paths;
import java.util.Map;
import java.util.UUID;
import java.util.*;
import java.util.function.Function;
import java.nio.file.Files;
import java.nio.file.Path;

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
        Page<News> newsPage = newsRepository.search(
                keyword, pageable
        );
        return toPagedResponse(newsPage, NewsMapper::toManagerNewsResList);
    }

    public Map<String, Object> getManagerNews(Pageable pageable) {
        Page<News> newsPage = newsRepository.findAllByOrderByCreatedAtDesc(pageable);
        return toPagedResponse(newsPage, NewsMapper::toManagerNewsResList);
    }

    public Map<String, Object> getSumNews(Pageable pageable) {
        Page<News> newsPage = newsRepository.findAllByOrderByCreatedAtDesc(pageable);
        return toPagedResponse(newsPage, NewsMapper::toManagerNewsResList);
    }

    public ResponseEntity<?> getUpdatedNewsRes(String newsId) {
        Optional<News> optionalNews = newsRepository.findById(newsId);
        if (optionalNews.isEmpty()) {
            return ResponseEntity.badRequest().body("Không tìm thấy bài viết này.");
        }
        return ResponseEntity.ok(NewsMapper.toUpdatedNewsRes(optionalNews.get()));
    }

    public ResponseEntity<?> getDetailNewsRes(String newsId) {
        Optional<News> optionalNews = newsRepository.findById(newsId);
        if (optionalNews.isEmpty()) {
            return ResponseEntity.badRequest().body("Không tìm thấy bài viết này.");
        }
        return ResponseEntity.ok(NewsMapper.toDetailNewsRes(optionalNews.get()));
    }

    @Transactional
    public ResponseEntity<?> createNews(NewsReq newsReq) {
        News news = new News();
        news.setId(UUID.randomUUID().toString());
        news.setTitle(newsReq.getTitle());

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

    @Transactional
    public ResponseEntity<?> updateNews(NewsReq newsReq) {
        String newsId = newsReq.getId();
        Optional<News> optionalNews = newsRepository.findById(newsId);
        if (optionalNews.isEmpty()) {
            return ResponseEntity.badRequest().body("Không tìm thấy bài viết với ID: " + newsId);
        }

        News news = optionalNews.get();
        String projectDir = System.getProperty("user.dir");

        // 1. Cập nhật các trường cơ bản
        news.setTitle(newsReq.getTitle());

        // Cập nhật ảnh qua ImageService
        try {
            imageService.setPath(ImageConfig.thumbnailPath);
            String updatedImageName = imageService.updateImage(news.getThumbnailName(), newsReq.getThumbnailFile(), newsReq.getThumbnailName());
            news.setThumbnailName(updatedImageName);
        } catch (IOException e) {
            return ResponseEntity.badRequest().body("Lỗi xử lý ảnh: " + e.getMessage());
        }

        // 3. Xử lý content
        String oldContent = news.getContent(); // nội dung cũ để so sánh ảnh
        Set<String> oldImages = extractImageFileNames(oldContent);

        String newContent;
        try {
            newContent = ImageProcessor.processBase64Images(newsReq.getContent(), ImageConfig.newsPath, NewsImgApi.newsImgApi);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Không thể xử lý nội dung mới.");
        }

        Set<String> newImages = extractImageFileNames(newContent);

        // 4. Xóa ảnh không còn được sử dụng
        Set<String> removedImages = new HashSet<>(oldImages);
        removedImages.removeAll(newImages);
        for (String imageFileName : removedImages) {
            Path imagePath = Paths.get(projectDir, ImageConfig.newsPath, imageFileName);
            try {
                Files.deleteIfExists(imagePath);
            } catch (IOException e) {
                return ResponseEntity.badRequest().body("Không thể xóa ảnh không còn dùng: " + imageFileName);
            }
        }

        // 5. Cập nhật content mới
        news.setContent(newContent);

        // 6. Lưu vào DB
        newsRepository.save(news);
        return ResponseEntity.ok("1");
    }

    private Set<String> extractImageFileNames(String htmlContent) {
        Set<String> fileNames = new HashSet<>();
        if (htmlContent == null || htmlContent.isEmpty()) return fileNames;

        Document doc = Jsoup.parse(htmlContent);
        Elements imgs = doc.select("img");

        for (Element img : imgs) {
            String src = img.attr("src");
            if (src != null && !src.startsWith("data:image")) {
                try {
                    String fileName = Paths.get(new URI(src).getPath()).getFileName().toString();
                    fileNames.add(fileName);
                } catch (Exception e) {
                    System.err.println("Lỗi khi phân tích src: " + src);
                }
            }
        }
        return fileNames;
    }

    @Transactional
    public ResponseEntity<?> deleteNews(String newsId) {
        Optional<News> optionalNews = newsRepository.findById(newsId);
        if (optionalNews.isEmpty()) {
            return ResponseEntity.badRequest().body("Không tìm thấy bài viết với ID: " + newsId);
        }

        News news = optionalNews.get();

        String projectDir = System.getProperty("user.dir");

        // 1. XÓA ẢNH THUMBNAIL
        String imageName = news.getThumbnailName();
        imageService.setPath(ImageConfig.thumbnailPath);
        try {
            imageService.deleteImage(imageName);
        } catch (IOException e) {
            ResponseEntity.badRequest().body("Không thể xóa file ảnh.");
        }

        // 2. XÓA ẢNH TRONG NỘI DUNG HTML
        String htmlContent = news.getContent();
        if (htmlContent != null && !htmlContent.isEmpty()) {
            Document doc = Jsoup.parse(htmlContent);
            Elements imgs = doc.select("img");

            for (Element img : imgs) {
                String src = img.attr("src");
                String fileName = src.substring(src.lastIndexOf("/") + 1); // Lấy tên ảnh từ URL
                Path imagePath = Paths.get(projectDir, ImageConfig.newsPath, fileName);

                try {
                    Files.deleteIfExists(imagePath);
                } catch (IOException e) {
                    return ResponseEntity.badRequest().body("Không thể xóa ảnh trong content.");
                }
            }
        }

        // 3. XÓA NEWS
        newsRepository.deleteById(newsId);
        return ResponseEntity.ok("Đã xóa bài viết thành công và các ảnh liên quan.");
    }
}
