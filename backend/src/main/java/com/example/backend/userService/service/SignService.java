package com.example.backend.userService.service;

import com.example.backend.core.config.ImageConfig;
import com.example.backend.core.mapper.McQuestionMapper;
import com.example.backend.core.mapper.SignMapper;
import com.example.backend.core.request.SignReq;
import com.example.backend.userService.model.McQuestion;
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
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
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

    public Map<String, Object> getManagerSigns(Pageable pageable) {
        Page<Sign> signsPage = signRepository.findAllByOrderByCreatedAtDesc(pageable);
        return toPagedResponse(signsPage, SignMapper::toSignResList);
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
}
