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
import java.util.*;
import java.util.function.Function;

@Service
public class McQuestionService {
    @Autowired
    private McQuestionRepository mcQuestionRepository;

    @Autowired
    private ImageService imageService;

    public int getMaxQuestionNumber() {
        Integer maxNumber = mcQuestionRepository.findMaxQuestionNumber();
        return maxNumber != null ? maxNumber : 1; // nếu chưa có câu hỏi thì trả 0
    }

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

    public Map<String, Object> getManagerCriticalMcQuestions(Pageable pageable) {
        Page<McQuestion> mcQuestionsPage = mcQuestionRepository.findAllByIsCriticalOrderByQuestionNumberAsc(true ,pageable);
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
        mcQuestion.setCritical(mcQuestionReq.isCritical());
        mcQuestion.setPrompt(mcQuestionReq.getPrompt());

        List<Choice> choiceList = new ArrayList<>();
        for (ChoiceReq choiceReq : mcQuestionReq.getChoices()) {
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

        MultipartFile file = mcQuestionReq.getImageFile();

        imageService.setPath(ImageConfig.questionPath);
        try {
            String imageName = imageService.saveImage(file);
            mcQuestion.setImageName(imageName);
        } catch (IOException e) {
            return ResponseEntity.badRequest().body("Lưu ảnh thất bại");
        }
        mcQuestionRepository.save(mcQuestion);
        return ResponseEntity.ok("1");
    }

    @Transactional
    public ResponseEntity<?> updateMcQuestion(McQuestionReq req) {
        try {
            McQuestion mcQuestion = mcQuestionRepository.findById(req.getId())
                    .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy câu hỏi này."));

            // Cập nhật thông tin cơ bản
            mcQuestion.setQuestionNumber(req.getQuestionNumber());
            mcQuestion.setCritical(req.isCritical());
            mcQuestion.setPrompt(req.getPrompt());
            mcQuestion.setAnswer(req.getAnswer());
            mcQuestion.setExplanation(req.getExplanation());
            mcQuestion.setType(req.getType());

            // Cập nhật danh sách choice
            List<Choice> choiceList = req.getChoices().stream()
                    .map(c -> {
                        Choice choice = new Choice();
                        choice.setId(UUID.randomUUID().toString());
                        choice.setOrderNumber(c.getOrderNumber());
                        choice.setContent(c.getContent());
                        choice.setMcQuestion(mcQuestion);
                        return choice;
                    })
                    .toList();

            mcQuestion.getChoices().clear();
            mcQuestion.getChoices().addAll(choiceList);

            // Cập nhật ảnh qua ImageService
            imageService.setPath(ImageConfig.questionPath);
            String updatedImageName = imageService.updateImage(mcQuestion.getImageName(), req.getImageFile(), req.getImageName());
            mcQuestion.setImageName(updatedImageName);

            mcQuestionRepository.save(mcQuestion);
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
    public ResponseEntity<?> deleteMcQuestion(String mcQuestionId) {
        Optional<McQuestion> optionalMcQuestion = mcQuestionRepository.findById(mcQuestionId);
        if (optionalMcQuestion.isEmpty()) {
            return ResponseEntity.badRequest().body("Không tìm thấy câu hỏi với ID: " + mcQuestionId);
        }
        McQuestion mcQuestion = optionalMcQuestion.get();
        // Xóa file ảnh nếu có
        String imageName = mcQuestion.getImageName();
        imageService.setPath(ImageConfig.questionPath);
        try {
            imageService.deleteImage(imageName);
        } catch (IOException e) {
            ResponseEntity.badRequest().body("Không thể xóa file ảnh.");
        }

        mcQuestionRepository.delete(mcQuestion);
        return ResponseEntity.ok("Đã xóa câu hỏi thành công.");
    }

}
