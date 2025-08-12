package com.example.backend.userService.service;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class ImageService {
    private String path;

    public void setPath(String path) {
        this.path = path;
    }

    public ResponseEntity<byte[]> getImage(String imageName, String dir) throws IOException {
        // Lấy đường dẫn thư mục gốc của project
        String projectDir = System.getProperty("user.dir");

        // Tạo đường dẫn đến file ảnh
        Path imagePath = Paths.get(projectDir, "imgDir/" + dir, imageName);

        if (!Files.exists(imagePath)) {
            return ResponseEntity.notFound().build(); // Trả về 404 nếu ảnh không tồn tại
        }

        // Đọc dữ liệu ảnh
        byte[] imageBytes = Files.readAllBytes(imagePath);

        // Xác định kiểu nội dung dựa vào phần mở rộng của ảnh
        String contentType = Files.probeContentType(imagePath);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .body(imageBytes);
    }

    public void deleteImage(String imageName) throws IOException {
        if (imageName != null) {
            Path oldImagePath = Paths.get(System.getProperty("user.dir"), path, imageName);
            Files.deleteIfExists(oldImagePath);
        }
    }

    public String saveImage(MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) {
            return null;
        }

        String newImageName = UUID.randomUUID() + ".png";
        Path newImagePath = Paths.get(System.getProperty("user.dir"), path, newImageName);
        Files.createDirectories(newImagePath.getParent());
        Files.copy(file.getInputStream(), newImagePath, StandardCopyOption.REPLACE_EXISTING);
        return newImageName;
    }

    public String updateImage(String oldImageName, MultipartFile newImageFile, String reqImageName) throws IOException {
        // Nếu không có ảnh mới và tên ảnh rỗng → xóa ảnh
        if (newImageFile == null && (reqImageName == null || reqImageName.isEmpty())) {
            deleteImage(oldImageName);
            return null;
        }

        // Nếu có ảnh mới → xóa ảnh cũ rồi lưu ảnh mới
        if (newImageFile != null && !newImageFile.isEmpty()) {
            deleteImage(oldImageName);
            return saveImage(newImageFile);
        }

        // Nếu không thay đổi ảnh
        return oldImageName;
    }

}
