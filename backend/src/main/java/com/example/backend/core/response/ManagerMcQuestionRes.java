package com.example.backend.core.response;

import lombok.Data;

@Data
public class ManagerMcQuestionRes {
    private String id;
    private int questionNumber;
    private String prompt;
    private String type;

    public ManagerMcQuestionRes(String id, int questionNumber, String prompt, String type) {
        this.id = id;
        this.questionNumber = questionNumber;
        this.prompt = prompt;
        this.type = type;
    }
}
