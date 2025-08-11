package com.example.backend.userService.service;

import com.example.backend.core.mapper.McQuestionMapper;
import com.example.backend.core.request.ChoiceReq;
import com.example.backend.core.request.McQuestionReq;
import com.example.backend.core.response.McQuestionRes;
import com.example.backend.userService.model.Choice;
import com.example.backend.userService.model.McQuestion;
import com.example.backend.userService.repository.McQuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import com.example.backend.core.config.ImageConfig;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;
import java.util.function.Function;

@Service
public class McQuestionService {
    @Autowired
    private McQuestionRepository mcQuestionRepository;

    private Map<String, Object> toPagedResponse(Page<McQuestion> mcQuestionsPage, Function<Page<McQuestion>, List<?>> mapper) {
        Map<String, Object> response = new HashMap<>();
        response.put("content", mapper.apply(mcQuestionsPage));
        response.put("totalElements", mcQuestionsPage.getTotalElements());
        response.put("totalPages", mcQuestionsPage.getTotalPages());
        response.put("number", mcQuestionsPage.getNumber());
        response.put("size", mcQuestionsPage.getSize());
        response.put("hasNext", mcQuestionsPage.hasNext());
        response.put("hasPrevious", mcQuestionsPage.hasPrevious());
        return response;
    }

    public Map<String, Object> searchManagerMcQuestions(String keyword, Pageable pageable) {
        Page<McQuestion> mcQuestionsPage = mcQuestionRepository.searchAllFields(keyword, pageable);
        return toPagedResponse(mcQuestionsPage, McQuestionMapper::toManagerMcQuestionResList);
    }

    public Map<String, Object> getManagerMcQuestions(Pageable pageable) {
        Page<McQuestion> mcQuestionsPage = mcQuestionRepository.findAllByOrderByQuestionNumberAsc(pageable);
        return toPagedResponse(mcQuestionsPage, McQuestionMapper::toManagerMcQuestionResList);
    }

    public ResponseEntity<?> getMcQuestionRes(String mcQuestionId) {
        Optional<McQuestion> optionalMcQuestion = mcQuestionRepository.findById(mcQuestionId);
        if (optionalMcQuestion.isEmpty()) {
            return ResponseEntity.badRequest().body("Không tìm thấy câu hỏi này.");
        }
        return ResponseEntity.ok(McQuestionMapper.toMcQuestionRes(optionalMcQuestion.get()));
    }

    @Transactional
    public ResponseEntity<?> createMcQuestion(McQuestionReq mcQuestionReq) {
        McQuestion mcQuestion = new McQuestion();
        mcQuestion.setId(UUID.randomUUID().toString());
        mcQuestion.setQuestionNumber(mcQuestionReq.getQuestionNumber());
        mcQuestion.setPrompt(mcQuestionReq.getPrompt());

        List<Choice> choiceList = new ArrayList<>();
        for (ChoiceReq choiceReq: mcQuestionReq.getChoices()) {
            Choice choice = new Choice();
            choice.setId(UUID.randomUUID().toString());
            choice.setOrderNumber(choiceReq.getOrderNumber());
            choice.setContent(choiceReq.getContent());
            choice.setMcQuestion(mcQuestion);
            choiceList.add(choice);
        }
        mcQuestion.setChoices(choiceList);
        mcQuestion.setAnswer(mcQuestionReq.getAnswer());
        mcQuestion.setExplanation(mcQuestionReq.getExplanation());
        mcQuestion.setType(mcQuestionReq.getType());

        String projectDir = System.getProperty("user.dir");
        MultipartFile file = mcQuestionReq.getImageFile();
        if (file != null) {
            String fileName = UUID.randomUUID().toString() + ".png";
            Path uploadPath = Paths.get(projectDir, ImageConfig.questionPath, fileName);
            mcQuestion.setImageName(fileName);
            try {
                Files.createDirectories(uploadPath.getParent()); // tạo thư mục nếu chưa có
                Files.copy(file.getInputStream(), uploadPath, StandardCopyOption.REPLACE_EXISTING);
            } catch (IOException e) {
                throw new RuntimeException("Failed to store image: " + fileName, e);
            }
        }
        mcQuestionRepository.save(mcQuestion);
        return ResponseEntity.ok("1");
    }

    @Transactional
    public ResponseEntity<?> updateMcQuestion(McQuestionReq mcQuestionReq) {
        String mcQuestionId = mcQuestionReq.getId();
        Optional<McQuestion> optionalMcQuestion = mcQuestionRepository.findById(mcQuestionId);
        if (optionalMcQuestion.isEmpty()) {
            return ResponseEntity.badRequest().body("Không tìm thấy câu hỏi này.");
        }

        McQuestion mcQuestion = optionalMcQuestion.get();
        mcQuestion.setQuestionNumber(mcQuestionReq.getQuestionNumber());
        mcQuestion.setPrompt(mcQuestionReq.getPrompt());

        mcQuestion.setAnswer(mcQuestionReq.getAnswer());
        mcQuestion.setExplanation(mcQuestionReq.getExplanation());
        mcQuestion.setType(mcQuestionReq.getType());

        List<Choice> choiceList = new ArrayList<>();
        List<ChoiceReq> choiceReqList = mcQuestionReq.getChoices();
        for (ChoiceReq choiceReq: choiceReqList) {
            Choice choice = new Choice();
            choice.setId(UUID.randomUUID().toString());
            choice.setOrderNumber(choiceReq.getOrderNumber());
            choice.setContent(choiceReq.getContent());
            choice.setMcQuestion(mcQuestion);
            choiceList.add(choice);
        }
        mcQuestion.getChoices().clear();
        mcQuestion.getChoices().addAll(choiceList);

        String projectDir = System.getProperty("user.dir");
        MultipartFile newImageFile = mcQuestionReq.getImageFile();

        String reqImageName = mcQuestionReq.getImageName();

        if (newImageFile == null && reqImageName.isEmpty()) {
            // Xóa image cũ nếu có
            String oldImageName = mcQuestion.getImageName();
            if(oldImageName != null ) {
                Path questionPath = Paths.get(projectDir, ImageConfig.questionPath, oldImageName);
                try {
                    Files.deleteIfExists(questionPath);
                } catch (IOException e) {
                    return ResponseEntity.badRequest().body("Không thể xóa ảnh cũ.");
                }
            }
        }

        if((newImageFile != null && !newImageFile.isEmpty())) {
            // Xóa image cũ nếu có
            String oldImageName = mcQuestion.getImageName();
            if(oldImageName != null ) {
                Path questionPath = Paths.get(projectDir, ImageConfig.questionPath, oldImageName);
                try {
                    Files.deleteIfExists(questionPath);
                } catch (IOException e) {
                    return ResponseEntity.badRequest().body("Không thể xóa ảnh cũ.");
                }
            }

            // Lưu ảnh mới
            String newImageName = UUID.randomUUID().toString() + ".png";
            Path newImagePath = Paths.get(projectDir, ImageConfig.questionPath, newImageName);
            try {
                Files.createDirectories(newImagePath.getParent());
                Files.copy(newImageFile.getInputStream(), newImagePath, StandardCopyOption.REPLACE_EXISTING);
                mcQuestion.setImageName(newImageName);
            } catch (IOException e) {
                return ResponseEntity.badRequest().body("Không thể lưu ảnh mới.");
            }
        }

        mcQuestionRepository.save(mcQuestion);
        return ResponseEntity.ok("1");
    }
}
