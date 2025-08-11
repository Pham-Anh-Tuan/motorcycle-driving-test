package com.example.backend.core.request;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class McQuestionReq {
    private String id;
    private int questionNumber;
    private String prompt;
    private String imageName;
    private MultipartFile imageFile;
    private List<ChoiceReq> choices;
    private int answer;
    private String explanation;
    private String type;
}
