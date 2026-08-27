package com.interview.platform.model;

import java.util.List;

public class CodeExecutionResult {
    private String status; // "SUCCESS", "COMPILE_ERROR", "RUNTIME_ERROR"
    private String output;
    private long executionTimeMs;
    private String timeComplexityEstimate;
    private String spaceComplexityEstimate;
    private int codeQualityScore; // 0 - 100
    private List<String> testResults;
    private List<String> reviewSuggestions;

    public CodeExecutionResult() {}

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getOutput() { return output; }
    public void setOutput(String output) { this.output = output; }

    public long getExecutionTimeMs() { return executionTimeMs; }
    public void setExecutionTimeMs(long executionTimeMs) { this.executionTimeMs = executionTimeMs; }

    public String getTimeComplexityEstimate() { return timeComplexityEstimate; }
    public void setTimeComplexityEstimate(String timeComplexityEstimate) { this.timeComplexityEstimate = timeComplexityEstimate; }

    public String getSpaceComplexityEstimate() { return spaceComplexityEstimate; }
    public void setSpaceComplexityEstimate(String spaceComplexityEstimate) { this.spaceComplexityEstimate = spaceComplexityEstimate; }

    public int getCodeQualityScore() { return codeQualityScore; }
    public void setCodeQualityScore(int codeQualityScore) { this.codeQualityScore = codeQualityScore; }

    public List<String> getTestResults() { return testResults; }
    public void setTestResults(List<String> testResults) { this.testResults = testResults; }

    public List<String> getReviewSuggestions() { return reviewSuggestions; }
    public void setReviewSuggestions(List<String> reviewSuggestions) { this.reviewSuggestions = reviewSuggestions; }
}
