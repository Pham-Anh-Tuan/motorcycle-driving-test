package com.example.backend.core.mapper;

import com.example.backend.core.request.ChoiceReq;
import com.example.backend.core.response.ManagerMcQuestionRes;
import com.example.backend.core.response.McQuestionRes;
import com.example.backend.userService.model.Choice;
import com.example.backend.userService.model.McQuestion;
import org.springframework.data.domain.Page;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class McQuestionMapper {
    public static List<ManagerMcQuestionRes> toManagerMcQuestionResList(Page<McQuestion> mcQuestionsPage) {
        return mcQuestionsPage.getContent().stream().map(mcQuestion -> {
            ManagerMcQuestionRes res = new ManagerMcQuestionRes(
                    mcQuestion.getId(),
                    mcQuestion.getQuestionNumber(),
                    mcQuestion.getPrompt(),
                    mcQuestion.getType()
            );
            return res;
        }).collect(Collectors.toList());
    }

    public static McQuestionRes toMcQuestionRes(McQuestion mcQuestion) {
        McQuestionRes res = new McQuestionRes(mcQuestion.getId(),
                mcQuestion.getQuestionNumber(),
                mcQuestion.getPrompt(),
                mcQuestion.getImageName(),
                mcQuestion.getAnswer(),
                mcQuestion.getExplanation(),
                mcQuestion.getType());

        List<ChoiceReq> choiceList = new ArrayList<>();
        for (Choice choice: mcQuestion.getChoices()) {
            ChoiceReq choiceReq = new ChoiceReq();
            choiceReq.setOrderNumber(choice.getOrderNumber());
            choiceReq.setContent(choice.getContent());
            choiceList.add(choiceReq);
        }
        res.setChoices(choiceList);
        return res;
    }
}
