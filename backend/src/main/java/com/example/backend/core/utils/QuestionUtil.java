package com.example.backend.core.utils;

import com.example.backend.core.response.McQuestionRes;

import java.util.List;

public class QuestionUtil {
    public static void resetQuestionNumber(List<McQuestionRes> mcQuestionResList) {
        for (int i = 0; i < mcQuestionResList.size(); i++) {
            mcQuestionResList.get(i).setQuestionNumber(i + 1);
        }
    }
}
