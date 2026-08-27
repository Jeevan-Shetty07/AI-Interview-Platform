package com.interview.platform.controller;

import com.interview.platform.model.*;
import com.interview.platform.service.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/interview")
public class InterviewSessionController {

    private final QuestionBankService questionBankService;
    private final AiEvaluationService aiEvaluationService;
    private final ResumeService resumeService;
    private final SessionStorageService sessionStorageService;

    public InterviewSessionController(
            QuestionBankService questionBankService,
            AiEvaluationService aiEvaluationService,
            ResumeService resumeService,
            SessionStorageService sessionStorageService) {
        this.questionBankService = questionBankService;
        this.aiEvaluationService = aiEvaluationService;
        this.resumeService = resumeService;
        this.sessionStorageService = sessionStorageService;
    }

    @PostMapping("/start")
    public ResponseEntity<InterviewSession> startSession(@RequestBody InterviewConfig config) {
        InterviewSession session = new InterviewSession();
        session.setId(UUID.randomUUID().toString());
        session.setConfig(config);
        session.setStartTime(System.currentTimeMillis());
        session.setStatus("IN_PROGRESS");
        session.setCurrentQuestionIndex(0);

        List<Question> selectedQuestions = new ArrayList<>();

        if (config.getResumeText() != null && !config.getResumeText().isBlank()) {
            ResumeAnalysisResult resumeResult = resumeService.analyzeResume(config.getResumeText(), config.getJobDescriptionText());
            selectedQuestions.addAll(resumeResult.getTailoredQuestions());
        }

        int needed = Math.max(1, config.getQuestionCount() - selectedQuestions.size());
        List<Question> domainQuestions = questionBankService.selectQuestionsForInterview(
                config.getDomain(),
                config.getDifficulty(),
                needed
        );
        selectedQuestions.addAll(domainQuestions);

        session.setQuestions(selectedQuestions);
        sessionStorageService.saveSession(session);

        return ResponseEntity.ok(session);
    }

    @GetMapping("/{sessionId}")
    public ResponseEntity<InterviewSession> getSession(@PathVariable String sessionId) {
        return sessionStorageService.getSession(sessionId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/submit-answer")
    public ResponseEntity<QuestionEvaluation> submitAnswer(@RequestBody AnswerSubmission submission) {
        Optional<InterviewSession> optSession = sessionStorageService.getSession(submission.getSessionId());
        if (optSession.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        InterviewSession session = optSession.get();
        Question currentQuestion = session.getQuestions().stream()
                .filter(q -> q.getId().equalsIgnoreCase(submission.getQuestionId()))
                .findFirst()
                .orElse(session.getQuestions().get(Math.min(session.getCurrentQuestionIndex(), session.getQuestions().size() - 1)));

        QuestionEvaluation evaluation = aiEvaluationService.evaluateAnswer(
                currentQuestion,
                submission,
                session.getConfig().getPersona()
        );

        session.getEvaluations().add(evaluation);
        session.setCurrentQuestionIndex(session.getCurrentQuestionIndex() + 1);
        sessionStorageService.saveSession(session);

        return ResponseEntity.ok(evaluation);
    }

    @PostMapping("/{sessionId}/finalize")
    public ResponseEntity<FinalInterviewReport> finalizeInterview(@PathVariable String sessionId) {
        Optional<InterviewSession> optSession = sessionStorageService.getSession(sessionId);
        if (optSession.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        InterviewSession session = optSession.get();
        session.setStatus("COMPLETED");
        session.setEndTime(System.currentTimeMillis());

        FinalInterviewReport report = aiEvaluationService.generateFinalReport(session);
        session.setFinalReport(report);
        sessionStorageService.saveSession(session);
        sessionStorageService.saveReport(report);

        return ResponseEntity.ok(report);
    }

    @GetMapping("/{sessionId}/report")
    public ResponseEntity<FinalInterviewReport> getReport(@PathVariable String sessionId) {
        return sessionStorageService.getReportBySessionId(sessionId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
