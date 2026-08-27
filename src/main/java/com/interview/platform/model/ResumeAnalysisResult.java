package com.interview.platform.model;

import java.util.List;

public class ResumeAnalysisResult {
    private int atsScore; // 0 - 100
    private String matchedRole;
    private String experienceLevel;
    private List<String> extractedSkills;
    private List<String> missingKeywords;
    private List<String> strengths;
    private List<String> suggestions;
    private List<Question> tailoredQuestions;
    private String overallFeedback;

    public ResumeAnalysisResult() {}

    public int getAtsScore() { return atsScore; }
    public void setAtsScore(int atsScore) { this.atsScore = atsScore; }

    public String getMatchedRole() { return matchedRole; }
    public void setMatchedRole(String matchedRole) { this.matchedRole = matchedRole; }

    public String getExperienceLevel() { return experienceLevel; }
    public void setExperienceLevel(String experienceLevel) { this.experienceLevel = experienceLevel; }

    public List<String> getExtractedSkills() { return extractedSkills; }
    public void setExtractedSkills(List<String> extractedSkills) { this.extractedSkills = extractedSkills; }

    public List<String> getMissingKeywords() { return missingKeywords; }
    public void setMissingKeywords(List<String> missingKeywords) { this.missingKeywords = missingKeywords; }

    public List<String> getStrengths() { return strengths; }
    public void setStrengths(List<String> strengths) { this.strengths = strengths; }

    public List<String> getSuggestions() { return suggestions; }
    public void setSuggestions(List<String> suggestions) { this.suggestions = suggestions; }

    public List<Question> getTailoredQuestions() { return tailoredQuestions; }
    public void setTailoredQuestions(List<Question> tailoredQuestions) { this.tailoredQuestions = tailoredQuestions; }

    public String getOverallFeedback() { return overallFeedback; }
    public void setOverallFeedback(String overallFeedback) { this.overallFeedback = overallFeedback; }
}
