package com.example.backend.core.response;

import lombok.Data;

@Data
public class ManagerMcQuestionRes {
    private int questionNumber;
    private String prompt;
    private String type;

    public ManagerMcQuestionRes(int questionNumber, String prompt, String type) {
        this.questionNumber = questionNumber;
        this.prompt = prompt;
        this.type = type;
    }
}
