package com.example.backend.core.response;

import com.example.backend.core.request.ChoiceReq;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class McQuestionRes {
    private String id;
    private int questionNumber;
    private Boolean isCritical;
    private String prompt;
    private String imageName;
    private List<ChoiceReq> choices;
    private int answer;
    private String explanation;
    private String type;

    public McQuestionRes(String id, int questionNumber, Boolean isCritical, String prompt, String imageName, int answer, String explanation, String type) {
        this.id = id;
        this.questionNumber = questionNumber;
        this.isCritical = isCritical;
        this.prompt = prompt;
        this.imageName = imageName;
        this.answer = answer;
        this.explanation = explanation;
        this.type = type;
    }
}
