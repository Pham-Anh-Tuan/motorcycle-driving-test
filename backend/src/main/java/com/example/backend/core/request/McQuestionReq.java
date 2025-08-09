package com.example.backend.core.request;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class McQuestionReq {
    private int questionNumber;
    private String prompt;
    private MultipartFile imageFile;
    private List<ChoiceReq> choices;
    private int answer;
    private String explanation;
    private int type;
}
