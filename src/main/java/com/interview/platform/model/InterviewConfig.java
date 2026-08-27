package com.interview.platform.model;

import java.util.List;

public class InterviewConfig {
    private String candidateName;
    private String role; // e.g. "Full Stack Developer", "Backend Engineer", "Data Scientist"
    private String seniority; // "Junior", "Mid-Level", "Senior", "Staff/Lead"
    private String domain; // "frontend", "backend", "fullstack", "devops", "data-science", "system-design", "behavioral"
    private String persona; // "alex", "sarah", "david", "maya"
    private int questionCount = 4;
    private String difficulty; // "Easy", "Medium", "Hard", "FAANG"
    private String interviewType; // "technical", "system-design", "behavioral", "mixed"
    private String resumeText;
    private String jobDescriptionText;
    private List<String> customQuestions;

    public InterviewConfig() {}

    public String getCandidateName() { return candidateName; }
    public void setCandidateName(String candidateName) { this.candidateName = candidateName; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getSeniority() { return seniority; }
    public void setSeniority(String seniority) { this.seniority = seniority; }

    public String getDomain() { return domain; }
    public void setDomain(String domain) { this.domain = domain; }

    public String getPersona() { return persona; }
    public void setPersona(String persona) { this.persona = persona; }

    public int getQuestionCount() { return questionCount; }
    public void setQuestionCount(int questionCount) { this.questionCount = questionCount; }

    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }

    public String getInterviewType() { return interviewType; }
    public void setInterviewType(String interviewType) { this.interviewType = interviewType; }

    public String getResumeText() { return resumeText; }
    public void setResumeText(String resumeText) { this.resumeText = resumeText; }

    public String getJobDescriptionText() { return jobDescriptionText; }
    public void setJobDescriptionText(String jobDescriptionText) { this.jobDescriptionText = jobDescriptionText; }

    public List<String> getCustomQuestions() { return customQuestions; }
    public void setCustomQuestions(List<String> customQuestions) { this.customQuestions = customQuestions; }
}
