package com.interview.platform.service;

import com.interview.platform.model.Question;
import com.interview.platform.model.ResumeAnalysisResult;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class ResumeService {

    private static final List<String> TECH_KEYWORDS = List.of(
            "Java", "Spring Boot", "Microservices", "REST API", "GraphQL", "Docker", "Kubernetes",
            "PostgreSQL", "MySQL", "MongoDB", "Redis", "Kafka", "AWS", "Azure", "GCP", "CI/CD",
            "React", "TypeScript", "JavaScript", "Node.js", "Python", "System Design", "Git",
            "Distributed Systems", "JUnit", "SQL", "DevOps", "Cybersecurity", "Terraform", "Agile"
    );

    public ResumeAnalysisResult analyzeResume(String resumeText, String targetJobDescription) {
        String rText = resumeText != null ? resumeText.toLowerCase() : "";
        String jdText = targetJobDescription != null ? targetJobDescription.toLowerCase() : "";

        List<String> matchedSkills = new ArrayList<>();
        List<String> missingKeywords = new ArrayList<>();

        for (String keyword : TECH_KEYWORDS) {
            String lowerKey = keyword.toLowerCase();
            boolean inResume = rText.contains(lowerKey);
            boolean inJd = jdText.isEmpty() || jdText.contains(lowerKey);

            if (inResume) {
                matchedSkills.add(keyword);
            } else if (inJd && !jdText.isEmpty()) {
                missingKeywords.add(keyword);
            }
        }

        if (missingKeywords.isEmpty()) {
            missingKeywords.addAll(List.of("System Design", "Kubernetes", "Kafka", "Performance Profiling"));
            missingKeywords.removeAll(matchedSkills);
        }

        int baseAts = Math.min(95, Math.max(45, (matchedSkills.size() * 6) + (rText.length() > 500 ? 20 : 10)));
        if (!jdText.isEmpty()) {
            long overlapWithJd = matchedSkills.stream().filter(s -> jdText.contains(s.toLowerCase())).count();
            baseAts = (int) Math.min(98, Math.max(50, (overlapWithJd * 12) + 40));
        }

        String experienceLevel = "Mid-Level";
        if (rText.contains("senior") || rText.contains("lead") || rText.contains("architect") || rText.contains("years") && containsHighYears(rText)) {
            experienceLevel = "Senior / Lead";
        } else if (rText.contains("junior") || rText.contains("intern") || rText.contains("fresh graduate")) {
            experienceLevel = "Entry / Junior";
        }

        List<String> strengths = List.of(
                "Strong technical stack presence across: " + String.join(", ", matchedSkills.stream().limit(4).toList()),
                "Clear project architecture and tool proficiency evidenced in experience summary.",
                "Well-formatted keywords enabling high ATS parser visibility."
        );

        List<String> suggestions = List.of(
                "Incorporate quantified metric impact (e.g. 'Reduced latency by 42%', 'Scaled QPS to 50k').",
                "Add missing high-demand keywords: " + String.join(", ", missingKeywords.stream().limit(3).toList()),
                "Include architectural diagrams or GitHub repository links for notable systems."
        );

        List<Question> tailoredQuestions = generateTailoredQuestions(matchedSkills, experienceLevel);

        ResumeAnalysisResult result = new ResumeAnalysisResult();
        result.setAtsScore(baseAts);
        result.setMatchedRole(rText.contains("full stack") ? "Full Stack Engineer" : (rText.contains("data") ? "Data / ML Engineer" : "Backend Systems Engineer"));
        result.setExperienceLevel(experienceLevel);
        result.setExtractedSkills(matchedSkills);
        result.setMissingKeywords(missingKeywords);
        result.setStrengths(strengths);
        result.setSuggestions(suggestions);
        result.setTailoredQuestions(tailoredQuestions);
        result.setOverallFeedback("Resume is well structured with an ATS score of " + baseAts + "%. Practice speaking about your highest-scale projects using the STAR framework.");

        return result;
    }

    private boolean containsHighYears(String text) {
        Pattern pattern = Pattern.compile("(\\d+)\\+?\\s*years");
        Matcher matcher = pattern.matcher(text);
        if (matcher.find()) {
            try {
                int years = Integer.parseInt(matcher.group(1));
                return years >= 5;
            } catch (NumberFormatException ignored) {}
        }
        return false;
    }

    private List<Question> generateTailoredQuestions(List<String> skills, String level) {
        List<Question> questions = new ArrayList<>();
        questions.add(new Question(
                "custom-01",
                "Deep Dive: Architecture of Your Most Complex Project",
                "Based on your resume, walk me through the highest-scale service or system you designed. What were the critical performance bottlenecks and how did you resolve them?",
                "backend", level, "System Design & Architecture",
                List.of("State the business problem and traffic scale", "Highlight specific trade-offs and tech choices"),
                "// Describe architecture: Load Balancers, Services, Caching, DB, Async Queues",
                "text", "O(1) lookup / scalable distributed design",
                "Candidate articulates end-to-end data flow, caching strategies, concurrency controls, and failure recovery mechanisms.",
                skills.subList(0, Math.min(4, skills.size())),
                List.of("Resume Tailored", "FAANG High-Scale")
        ));

        questions.add(new Question(
                "custom-02",
                "Database Indexing & Query Tuning Experience",
                "You listed " + (skills.contains("PostgreSQL") ? "PostgreSQL" : "Database systems") + " on your resume. How do you analyze slow queries, optimize execution plans, and structure composite indexes for high-write workloads?",
                "backend", level, "Data Persistence",
                List.of("Discuss EXPLAIN ANALYZE", "Explain write amplification and index bloat"),
                "EXPLAIN ANALYZE SELECT * FROM records WHERE active = true ORDER BY created_at DESC;",
                "sql", "Logarithmic index traversal",
                "Candidate demonstrates practical knowledge of B-Tree indexing, execution plans, partition pruning, and avoiding unnecessary full scans.",
                List.of("Databases", "Indexing", "Performance Tuning"),
                List.of("Resume Tailored")
        ));

        return questions;
    }
}
