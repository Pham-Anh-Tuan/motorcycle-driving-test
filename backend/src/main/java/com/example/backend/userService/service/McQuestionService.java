package com.example.backend.userService.service;

import com.example.backend.core.request.ChoiceReq;
import com.example.backend.core.request.McQuestionReq;
import com.example.backend.userService.model.Choice;
import com.example.backend.userService.model.McQuestion;
import com.example.backend.userService.repository.McQuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class McQuestionService {
    @Autowired
    private McQuestionRepository mcQuestionRepository;

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

        if (mcQuestionReq.getImageFile() != null) {
            MultipartFile file = mcQuestionReq.getImageFile();
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
}
