package com.example.backend.userService.service;

import com.example.backend.core.config.ImageConfig;
import com.example.backend.core.mapper.SignMapper;
import com.example.backend.core.request.SignReq;
import com.example.backend.userService.model.Sign;
import com.example.backend.userService.repository.SignRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;
import java.util.function.Function;

@Service
public class SignService {
    @Autowired
    private SignRepository signRepository;

    @Autowired
    private ImageService imageService;

    private Map<String, Object> toPagedResponse(Page<Sign> signsPage, Function<Page<Sign>, List<?>> mapper) {
        Map<String, Object> response = new HashMap<>();
        response.put("content", mapper.apply(signsPage));
        response.put("totalElements", signsPage.getTotalElements());
        response.put("totalPages", signsPage.getTotalPages());
        response.put("number", signsPage.getNumber());
        response.put("size", signsPage.getSize());
        response.put("hasNext", signsPage.hasNext());
        response.put("hasPrevious", signsPage.hasPrevious());
        return response;
    }

    public Map<String, Object> searchSigns(String keyword, Pageable pageable) {
        Page<Sign> signsPage =  signRepository
                .findByCodeContainingIgnoreCaseOrTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(
                        keyword, keyword, keyword, pageable
                );
        return toPagedResponse(signsPage, SignMapper::toSignResList);
    }

    public Map<String, Object> getManagerSigns(Pageable pageable) {
        Page<Sign> signsPage = signRepository.findAllByOrderByCreatedAtDesc(pageable);
        return toPagedResponse(signsPage, SignMapper::toSignResList);
    }

    public ResponseEntity<?> getSignRes(String signId) {
        Optional<Sign> optionalSign = signRepository.findById(signId);
        if (optionalSign.isEmpty()) {
            return ResponseEntity.badRequest().body("Không tìm thấy biển báo này.");
        }
        return ResponseEntity.ok(SignMapper.toSignRes(optionalSign.get()));
    }

    @Transactional
    public ResponseEntity<?> createSign(SignReq signReq) {
        Sign sign = new Sign();
        sign.setId(UUID.randomUUID().toString());
        sign.setCode(signReq.getCode());
        sign.setTitle(signReq.getTitle());
        sign.setDescription(signReq.getDescription());

        MultipartFile file = signReq.getImageFile();
        imageService.setPath(ImageConfig.signPath);
        try {
            String imageName = imageService.saveImage(file);
            sign.setImageName(imageName);
        } catch (IOException e) {
            return ResponseEntity.badRequest().body("Lưu ảnh thất bại");
        }
        signRepository.save(sign);
        return ResponseEntity.ok("1");
    }

    @Transactional
    public ResponseEntity<?> updateSign(SignReq signReq) {
        try {
            Sign sign = signRepository.findById(signReq.getId())
                    .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy biển báo này."));

            // Cập nhật thông tin cơ bản
            sign.setCode(signReq.getCode());
            sign.setTitle(signReq.getTitle());
            sign.setDescription(signReq.getDescription());

            // Cập nhật ảnh qua ImageService
            imageService.setPath(ImageConfig.signPath);
            String updatedImageName = imageService.updateImage(sign.getImageName(), signReq.getImageFile(), signReq.getImageName());
            sign.setImageName(updatedImageName);

            signRepository.save(sign);
            return ResponseEntity.ok("1");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (IOException e) {
            return ResponseEntity.badRequest().body("Lỗi xử lý ảnh: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Lỗi không xác định: " + e.getMessage());
        }
    }

    @Transactional
    public ResponseEntity<?> deleteSign(String signId) {
        Optional<Sign> optionalSign = signRepository.findById(signId);
        if (optionalSign.isEmpty()) {
            return ResponseEntity.badRequest().body("Không tìm thấy biển báo với ID: " + signId);
        }
        Sign sign = optionalSign.get();
        // Xóa file ảnh nếu có
        String imageName = sign.getImageName();
        imageService.setPath(ImageConfig.signPath);
        try {
            imageService.deleteImage(imageName);
        } catch (IOException e) {
            ResponseEntity.badRequest().body("Không thể xóa file ảnh.");
        }

        signRepository.delete(sign);
        return ResponseEntity.ok("Đã xóa biển báo thành công.");
    }
}
