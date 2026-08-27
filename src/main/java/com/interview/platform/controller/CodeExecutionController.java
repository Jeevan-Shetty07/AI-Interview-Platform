package com.interview.platform.controller;

import com.interview.platform.model.CodeExecutionRequest;
import com.interview.platform.model.CodeExecutionResult;
import com.interview.platform.service.CodeEvaluationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/code")
public class CodeExecutionController {

    private final CodeEvaluationService codeEvaluationService;

    public CodeExecutionController(CodeEvaluationService codeEvaluationService) {
        this.codeEvaluationService = codeEvaluationService;
    }

    @PostMapping("/run")
    public ResponseEntity<CodeExecutionResult> executeCode(@RequestBody CodeExecutionRequest request) {
        CodeExecutionResult result = codeEvaluationService.executeAndAnalyze(request);
        return ResponseEntity.ok(result);
    }
}
