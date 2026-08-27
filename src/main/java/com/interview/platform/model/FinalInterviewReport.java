package com.interview.platform.model;

import java.util.List;

public class FinalInterviewReport {
    private String sessionId;
    private String candidateName;
    private String role;
    private String seniority;
    private String persona;
    private int overallScore; // 0 - 100
    private String hireRecommendation; // Strong Hire, Hire, Lean Hire, Lean No Hire, No Hire
    private String verdictSummary;
    private int technicalDepthScore;
    private int systemArchitectureScore;
    private int communicationScore;
    private int problemSolvingScore;
    private int behavioralStarScore;
    private int paceWpmAvg;
    private int fillerWordsTotal;
    private List<QuestionEvaluation> questionEvaluations;
    private List<String> keyStrengths;
    private List<String> criticalGaps;
    private List<String> actionableStudyPlan;
    private List<String> recommendedResources;
    private String createdAt;

    public FinalInterviewReport() {}

    public String getSessionId() { return sessionId; }
    public void setSessionId(String sessionId) { this.sessionId = sessionId; }

    public String getCandidateName() { return candidateName; }
    public void setCandidateName(String candidateName) { this.candidateName = candidateName; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getSeniority() { return seniority; }
    public void setSeniority(String seniority) { this.seniority = seniority; }

    public String getPersona() { return persona; }
    public void setPersona(String persona) { this.persona = persona; }

    public int getOverallScore() { return overallScore; }
    public void setOverallScore(int overallScore) { this.overallScore = overallScore; }

    public String getHireRecommendation() { return hireRecommendation; }
    public void setHireRecommendation(String hireRecommendation) { this.hireRecommendation = hireRecommendation; }

    public String getVerdictSummary() { return verdictSummary; }
    public void setVerdictSummary(String verdictSummary) { this.verdictSummary = verdictSummary; }

    public int getTechnicalDepthScore() { return technicalDepthScore; }
    public void setTechnicalDepthScore(int technicalDepthScore) { this.technicalDepthScore = technicalDepthScore; }

    public int getSystemArchitectureScore() { return systemArchitectureScore; }
    public void setSystemArchitectureScore(int systemArchitectureScore) { this.systemArchitectureScore = systemArchitectureScore; }

    public int getCommunicationScore() { return communicationScore; }
    public void setCommunicationScore(int communicationScore) { this.communicationScore = communicationScore; }

    public int getProblemSolvingScore() { return problemSolvingScore; }
    public void setProblemSolvingScore(int problemSolvingScore) { this.problemSolvingScore = problemSolvingScore; }

    public int getBehavioralStarScore() { return behavioralStarScore; }
    public void setBehavioralStarScore(int behavioralStarScore) { this.behavioralStarScore = behavioralStarScore; }

    public int getPaceWpmAvg() { return paceWpmAvg; }
    public void setPaceWpmAvg(int paceWpmAvg) { this.paceWpmAvg = paceWpmAvg; }

    public int getFillerWordsTotal() { return fillerWordsTotal; }
    public void setFillerWordsTotal(int fillerWordsTotal) { this.fillerWordsTotal = fillerWordsTotal; }

    public List<QuestionEvaluation> getQuestionEvaluations() { return questionEvaluations; }
    public void setQuestionEvaluations(List<QuestionEvaluation> questionEvaluations) { this.questionEvaluations = questionEvaluations; }

    public List<String> getKeyStrengths() { return keyStrengths; }
    public void setKeyStrengths(List<String> keyStrengths) { this.keyStrengths = keyStrengths; }

    public List<String> getCriticalGaps() { return criticalGaps; }
    public void setCriticalGaps(List<String> criticalGaps) { this.criticalGaps = criticalGaps; }

    public List<String> getActionableStudyPlan() { return actionableStudyPlan; }
    public void setActionableStudyPlan(List<String> actionableStudyPlan) { this.actionableStudyPlan = actionableStudyPlan; }

    public List<String> getRecommendedResources() { return recommendedResources; }
    public void setRecommendedResources(List<String> recommendedResources) { this.recommendedResources = recommendedResources; }

    public String getCreatedAt() { return createdAt; }
    public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }
}
