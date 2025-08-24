package com.example.backend.userService.service;

import com.example.backend.core.mapper.McQuestionMapper;
import com.example.backend.core.response.McQuestionRes;
import com.example.backend.core.utils.QuestionUtil;
import com.example.backend.userService.model.Exam;
import com.example.backend.userService.model.ExamQuestion;
import com.example.backend.userService.model.McQuestion;
import com.example.backend.userService.repository.ExamQuestionRepository;
import com.example.backend.userService.repository.ExamRepository;
import com.example.backend.userService.repository.McQuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ExamService {
    @Autowired
    private McQuestionRepository mcQuestionRepository;

    @Autowired
    private ExamRepository examRepository;

    @Autowired
    private ExamQuestionRepository examQuestionRepository;

    @Transactional
    public void generateExams() {
        List<McQuestion> criticalQs = mcQuestionRepository.findAllByIsCriticalOrderByQuestionNumberAsc(true);
        List<McQuestion> ruleQs = mcQuestionRepository.findAllByTypeAndIsCritical("Khái niệm và quy tắc",false);
        List<McQuestion> cultureQs = mcQuestionRepository.findAllByTypeAndIsCritical("Văn hóa và đạo đức lái xe",false);
        List<McQuestion> techniqueQs = mcQuestionRepository.findAllByTypeAndIsCritical("Kỹ thuật lái xe",false);
        List<McQuestion> signQs = mcQuestionRepository.findAllByTypeAndIsCritical("Biển báo đường bộ",false);
        List<McQuestion> diagramQs = mcQuestionRepository.findAllByTypeAndIsCritical("Sa hình",false);

        Collections.shuffle(criticalQs);
        Collections.shuffle(ruleQs);
        Collections.shuffle(cultureQs);
        Collections.shuffle(techniqueQs);
        Collections.shuffle(signQs);
        Collections.shuffle(diagramQs);

        // Số lượng đề cần tạo
        int examCount = 8;

        for (int i = 1; i <= examCount; i++) {
            Exam exam = new Exam();
            exam.setId(UUID.randomUUID().toString());
            exam.setExamNumber(i);
            examRepository.save(exam);

            Set<McQuestion> selected = new HashSet<>();
            // 1. Chọn 1 câu liệt
            McQuestion critical = criticalQs.remove(0);
            selected.add(critical);

            // 2. Chọn 9 câu khái niệm (không trùng câu liệt)
            selected.addAll(ruleQs.stream().limit(9).toList());
            ruleQs = ruleQs.subList(9, ruleQs.size());

            // 3. Chọn 1 câu văn hóa
            selected.add(cultureQs.remove(0));

            // 4. Chọn 1 câu kỹ thuật
            selected.addAll(techniqueQs.stream().limit(1).toList());
            techniqueQs = techniqueQs.subList(1, techniqueQs.size());

            // 5. Chọn 9 câu biển báo
            selected.addAll(signQs.stream().limit(9).toList());
            signQs = signQs.subList(9, signQs.size());

            // 6. Chọn 4 câu sa hình
            selected.addAll(diagramQs.stream().limit(4).toList());
            diagramQs = diagramQs.subList(4, diagramQs.size());

            // Lưu exam_question
            for (McQuestion q : selected) {
                ExamQuestion eq = new ExamQuestion();
                eq.setId(UUID.randomUUID().toString());
                eq.setExam(exam);
                eq.setMcQuestion(q);
                examQuestionRepository.save(eq);
            }
        }
    }

    public List<McQuestionRes> getQuestionsByExamNumber(int examNumber) {
        Exam exam = examRepository.findByExamNumber(examNumber);
        List<ExamQuestion> examQuestions = examQuestionRepository.findByExam(exam);
        List<McQuestion> mcQuestionList = examQuestions.stream().map(ExamQuestion::getMcQuestion).collect(Collectors.toList());
        List<McQuestionRes> res = McQuestionMapper.toMcQuestionResList(mcQuestionList);
        QuestionUtil.resetQuestionNumber(res);
        return res;
    }

    public List<Integer> getExamNumberList() {
        return examRepository.findAll()
                .stream()
                .map(Exam::getExamNumber)
                .sorted()
                .collect(Collectors.toList());
    }
}
