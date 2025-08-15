package com.example.backend.core.response;

import lombok.Data;

@Data
public class ManagerMcQuestionRes {
    private String id;
    private int questionNumber;
    private Boolean isCritical;
    private String prompt;
    private String type;

    public ManagerMcQuestionRes(String id, int questionNumber, Boolean isCritical, String prompt, String type) {
        this.id = id;
        this.questionNumber = questionNumber;
        this.isCritical = isCritical;
        this.prompt = prompt;
        this.type = type;
    }
}
