package com.interview.platform.controller;

import com.interview.platform.model.ResumeAnalysisResult;
import com.interview.platform.service.ResumeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/resume")
public class ResumeController {

    private final ResumeService resumeService;

    public ResumeController(ResumeService resumeService) {
        this.resumeService = resumeService;
    }

    @PostMapping("/analyze")
    public ResponseEntity<ResumeAnalysisResult> analyzeResume(@RequestBody Map<String, String> payload) {
        String resumeText = payload.getOrDefault("resumeText", "");
        String jobDescription = payload.getOrDefault("jobDescription", "");
        ResumeAnalysisResult result = resumeService.analyzeResume(resumeText, jobDescription);
        return ResponseEntity.ok(result);
    }
}
