package com.interview.platform.model;

import java.util.ArrayList;
import java.util.List;

public class InterviewSession {
    private String id;
    private InterviewConfig config;
    private List<Question> questions = new ArrayList<>();
    private int currentQuestionIndex = 0;
    private List<QuestionEvaluation> evaluations = new ArrayList<>();
    private String status = "NOT_STARTED"; // NOT_STARTED, IN_PROGRESS, COMPLETED
    private long startTime;
    private long endTime;
    private FinalInterviewReport finalReport;

    public InterviewSession() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public InterviewConfig getConfig() { return config; }
    public void setConfig(InterviewConfig config) { this.config = config; }

    public List<Question> getQuestions() { return questions; }
    public void setQuestions(List<Question> questions) { this.questions = questions; }

    public int getCurrentQuestionIndex() { return currentQuestionIndex; }
    public void setCurrentQuestionIndex(int currentQuestionIndex) { this.currentQuestionIndex = currentQuestionIndex; }

    public List<QuestionEvaluation> getEvaluations() { return evaluations; }
    public void setEvaluations(List<QuestionEvaluation> evaluations) { this.evaluations = evaluations; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public long getStartTime() { return startTime; }
    public void setStartTime(long startTime) { this.startTime = startTime; }

    public long getEndTime() { return endTime; }
    public void setEndTime(long endTime) { this.endTime = endTime; }

    public FinalInterviewReport getFinalReport() { return finalReport; }
    public void setFinalReport(FinalInterviewReport finalReport) { this.finalReport = finalReport; }
}
