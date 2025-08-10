package com.example.backend.core.mapper;

import com.example.backend.core.response.ManagerMcQuestionRes;
import com.example.backend.userService.model.McQuestion;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.stream.Collectors;

public class McQuestionMapper {
    public static List<ManagerMcQuestionRes> toManagerMcQuestionResList(Page<McQuestion> mcQuestionsPage) {
        return mcQuestionsPage.getContent().stream().map(mcQuestion -> {
            ManagerMcQuestionRes res = new ManagerMcQuestionRes(
                    mcQuestion.getQuestionNumber(),
                    mcQuestion.getPrompt(),
                    mcQuestion.getType()
            );
            return res;
        }).collect(Collectors.toList());
    }
}
