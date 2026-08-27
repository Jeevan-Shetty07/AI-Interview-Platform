package com.interview.platform.model;

import java.util.List;

public class CodeExecutionRequest {
    private String code;
    private String language; // javascript, python, java, cpp, sql
    private String questionId;
    private List<String> testInputs;

    public CodeExecutionRequest() {}

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }

    public String getQuestionId() { return questionId; }
    public void setQuestionId(String questionId) { this.questionId = questionId; }

    public List<String> getTestInputs() { return testInputs; }
    public void setTestInputs(List<String> testInputs) { this.testInputs = testInputs; }
}
