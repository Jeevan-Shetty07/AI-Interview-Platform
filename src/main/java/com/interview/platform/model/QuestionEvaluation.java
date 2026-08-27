package com.interview.platform.model;

import java.util.List;

public class QuestionEvaluation {
    private String questionId;
    private String questionTitle;
    private String candidateAnswer;
    private String candidateCode;
    private int score; // 0 - 100
    private int technicalScore;
    private int communicationScore;
    private int problemSolvingScore;
    private List<String> strengths;
    private List<String> areasForImprovement;
    private String idealAnswer;
    private String codeFeedback;
    private String aiFollowUpQuestion;
    private boolean isSatisfactory;
    private String interviewerRemarks;

    public QuestionEvaluation() {}

    public String getQuestionId() { return questionId; }
    public void setQuestionId(String questionId) { this.questionId = questionId; }

    public String getQuestionTitle() { return questionTitle; }
    public void setQuestionTitle(String questionTitle) { this.questionTitle = questionTitle; }

    public String getCandidateAnswer() { return candidateAnswer; }
    public void setCandidateAnswer(String candidateAnswer) { this.candidateAnswer = candidateAnswer; }

    public String getCandidateCode() { return candidateCode; }
    public void setCandidateCode(String candidateCode) { this.candidateCode = candidateCode; }

    public int getScore() { return score; }
    public void setScore(int score) { this.score = score; }

    public int getTechnicalScore() { return technicalScore; }
    public void setTechnicalScore(int technicalScore) { this.technicalScore = technicalScore; }

    public int getCommunicationScore() { return communicationScore; }
    public void setCommunicationScore(int communicationScore) { this.communicationScore = communicationScore; }

    public int getProblemSolvingScore() { return problemSolvingScore; }
    public void setProblemSolvingScore(int problemSolvingScore) { this.problemSolvingScore = problemSolvingScore; }

    public List<String> getStrengths() { return strengths; }
    public void setStrengths(List<String> strengths) { this.strengths = strengths; }

    public List<String> getAreasForImprovement() { return areasForImprovement; }
    public void setAreasForImprovement(List<String> areasForImprovement) { this.areasForImprovement = areasForImprovement; }

    public String getIdealAnswer() { return idealAnswer; }
    public void setIdealAnswer(String idealAnswer) { this.idealAnswer = idealAnswer; }

    public String getCodeFeedback() { return codeFeedback; }
    public void setCodeFeedback(String codeFeedback) { this.codeFeedback = codeFeedback; }

    public String getAiFollowUpQuestion() { return aiFollowUpQuestion; }
    public void setAiFollowUpQuestion(String aiFollowUpQuestion) { this.aiFollowUpQuestion = aiFollowUpQuestion; }

    public boolean isSatisfactory() { return isSatisfactory; }
    public void setSatisfactory(boolean satisfactory) { isSatisfactory = satisfactory; }

    public String getInterviewerRemarks() { return interviewerRemarks; }
    public void setInterviewerRemarks(String interviewerRemarks) { this.interviewerRemarks = interviewerRemarks; }
}
