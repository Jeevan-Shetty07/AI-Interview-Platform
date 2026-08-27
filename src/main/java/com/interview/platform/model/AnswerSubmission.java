package com.interview.platform.model;

public class AnswerSubmission {
    private String sessionId;
    private String questionId;
    private String candidateAnswerText;
    private String candidateCode;
    private String codeLanguage;
    private int audioDurationSeconds;
    private int fillerWordsCount;
    private int speechWpm;
    private String diagramDataJson;

    public AnswerSubmission() {}

    public String getSessionId() { return sessionId; }
    public void setSessionId(String sessionId) { this.sessionId = sessionId; }

    public String getQuestionId() { return questionId; }
    public void setQuestionId(String questionId) { this.questionId = questionId; }

    public String getCandidateAnswerText() { return candidateAnswerText; }
    public void setCandidateAnswerText(String candidateAnswerText) { this.candidateAnswerText = candidateAnswerText; }

    public String getCandidateCode() { return candidateCode; }
    public void setCandidateCode(String candidateCode) { this.candidateCode = candidateCode; }

    public String getCodeLanguage() { return codeLanguage; }
    public void setCodeLanguage(String codeLanguage) { this.codeLanguage = codeLanguage; }

    public int getAudioDurationSeconds() { return audioDurationSeconds; }
    public void setAudioDurationSeconds(int audioDurationSeconds) { this.audioDurationSeconds = audioDurationSeconds; }

    public int getFillerWordsCount() { return fillerWordsCount; }
    public void setFillerWordsCount(int fillerWordsCount) { this.fillerWordsCount = fillerWordsCount; }

    public int getSpeechWpm() { return speechWpm; }
    public void setSpeechWpm(int speechWpm) { this.speechWpm = speechWpm; }

    public String getDiagramDataJson() { return diagramDataJson; }
    public void setDiagramDataJson(String diagramDataJson) { this.diagramDataJson = diagramDataJson; }
}
