package com.interview.platform.model;

import java.util.List;

public class Question {
    private String id;
    private String title;
    private String description;
    private String domain; // frontend, backend, fullstack, devops, data-science, system-design, behavioral
    private String difficulty; // Entry, Mid, Senior, Lead, FAANG
    private String category;
    private List<String> hints;
    private String starterCode;
    private String language;
    private String expectedComplexity;
    private String idealAnswerSummary;
    private List<String> keyConcepts;
    private List<String> companyTags;

    public Question() {}

    public Question(String id, String title, String description, String domain, String difficulty,
                    String category, List<String> hints, String starterCode, String language,
                    String expectedComplexity, String idealAnswerSummary, List<String> keyConcepts,
                    List<String> companyTags) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.domain = domain;
        this.difficulty = difficulty;
        this.category = category;
        this.hints = hints;
        this.starterCode = starterCode;
        this.language = language;
        this.expectedComplexity = expectedComplexity;
        this.idealAnswerSummary = idealAnswerSummary;
        this.keyConcepts = keyConcepts;
        this.companyTags = companyTags;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getDomain() { return domain; }
    public void setDomain(String domain) { this.domain = domain; }

    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public List<String> getHints() { return hints; }
    public void setHints(List<String> hints) { this.hints = hints; }

    public String getStarterCode() { return starterCode; }
    public void setStarterCode(String starterCode) { this.starterCode = starterCode; }

    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }

    public String getExpectedComplexity() { return expectedComplexity; }
    public void setExpectedComplexity(String expectedComplexity) { this.expectedComplexity = expectedComplexity; }

    public String getIdealAnswerSummary() { return idealAnswerSummary; }
    public void setIdealAnswerSummary(String idealAnswerSummary) { this.idealAnswerSummary = idealAnswerSummary; }

    public List<String> getKeyConcepts() { return keyConcepts; }
    public void setKeyConcepts(List<String> keyConcepts) { this.keyConcepts = keyConcepts; }

    public List<String> getCompanyTags() { return companyTags; }
    public void setCompanyTags(List<String> companyTags) { this.companyTags = companyTags; }
}
