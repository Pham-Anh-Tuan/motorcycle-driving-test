package com.example.backend.core.request;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class McQuestionReq {
    private String id;
    private int questionNumber;
    private Boolean isCritical;
    private String prompt;
    private String imageName;
    private MultipartFile imageFile;
    private List<ChoiceReq> choices;
    private int answer;
    private String explanation;
    private String type;

    public void setCritical(boolean critical) {
        isCritical = critical;
    }

    public boolean isCritical() {
        return isCritical;
    }
}
