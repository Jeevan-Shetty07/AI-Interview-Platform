package com.interview.platform.controller;

import com.interview.platform.model.Question;
import com.interview.platform.service.QuestionBankService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
public class QuestionController {

    private final QuestionBankService questionBankService;

    public QuestionController(QuestionBankService questionBankService) {
        this.questionBankService = questionBankService;
    }

    @GetMapping
    public ResponseEntity<List<Question>> getQuestions(
            @RequestParam(required = false) String domain,
            @RequestParam(required = false) String difficulty,
            @RequestParam(required = false) String search) {
        return ResponseEntity.ok(questionBankService.filterQuestions(domain, difficulty, search));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Question> getQuestionById(@PathVariable String id) {
        return questionBankService.getQuestionById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
