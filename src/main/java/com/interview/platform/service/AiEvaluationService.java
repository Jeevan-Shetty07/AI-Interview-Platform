package com.interview.platform.service;

import com.interview.platform.model.*;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class AiEvaluationService {

    public QuestionEvaluation evaluateAnswer(Question question, AnswerSubmission submission, String persona) {
        String answer = submission.getCandidateAnswerText() != null ? submission.getCandidateAnswerText().trim() : "";
        String code = submission.getCandidateCode() != null ? submission.getCandidateCode().trim() : "";
        int wordCount = answer.isEmpty() ? 0 : answer.split("\\s+").length;

        // Keyword coverage analysis
        long matchedConcepts = question.getKeyConcepts().stream()
                .filter(concept -> answer.toLowerCase().contains(concept.toLowerCase()) || code.toLowerCase().contains(concept.toLowerCase()))
                .count();

        double conceptRatio = question.getKeyConcepts().isEmpty() ? 0.8 : (double) matchedConcepts / question.getKeyConcepts().size();

        // Calculate scores
        int technicalScore = (int) Math.min(100, Math.max(30, (conceptRatio * 60) + (wordCount > 40 ? 30 : wordCount * 0.75) + (code.length() > 20 ? 10 : 0)));
        int communicationScore = calculateCommunicationScore(answer, submission.getFillerWordsCount(), submission.getSpeechWpm());
        int problemSolvingScore = (int) Math.min(100, Math.max(35, (technicalScore * 0.6) + (code.length() > 30 ? 35 : 20)));

        int overallScore = (int) Math.round((technicalScore * 0.45) + (communicationScore * 0.25) + (problemSolvingScore * 0.30));

        // Strengths & Areas for improvement
        List<String> strengths = new ArrayList<>();
        List<String> areasForImprovement = new ArrayList<>();

        if (conceptRatio >= 0.5) {
            strengths.add("Demonstrated solid understanding of core concepts like " + String.join(", ", question.getKeyConcepts().subList(0, Math.min(2, question.getKeyConcepts().size()))));
        } else {
            areasForImprovement.add("Deepen explanation around: " + String.join(", ", question.getKeyConcepts()));
        }

        if (wordCount >= 50) {
            strengths.add("Provided a detailed and structured explanation with concrete reasoning.");
        } else if (wordCount < 25) {
            areasForImprovement.add("Answer was quite brief. In real interviews, elaborate more with examples and edge cases.");
        }

        if (submission.getFillerWordsCount() > 4) {
            areasForImprovement.add("Detected " + submission.getFillerWordsCount() + " filler words. Practice replacing pauses with silent breaths.");
        } else {
            strengths.add("Clean delivery with minimal filler words.");
        }

        if (!code.isEmpty()) {
            strengths.add("Provided concrete code/pseudo-code demonstrating implementation competence.");
        }

        // Persona-based follow-up question
        String followUp = generatePersonaFollowUp(persona, question, answer);
        String interviewerRemarks = generateInterviewerRemarks(persona, overallScore, question.getTitle());

        QuestionEvaluation eval = new QuestionEvaluation();
        eval.setQuestionId(question.getId());
        eval.setQuestionTitle(question.getTitle());
        eval.setCandidateAnswer(answer);
        eval.setCandidateCode(code);
        eval.setScore(overallScore);
        eval.setTechnicalScore(technicalScore);
        eval.setCommunicationScore(communicationScore);
        eval.setProblemSolvingScore(problemSolvingScore);
        eval.setStrengths(strengths);
        eval.setAreasForImprovement(areasForImprovement);
        eval.setIdealAnswer(question.getIdealAnswerSummary());
        eval.setCodeFeedback(code.isEmpty() ? "No code provided for this question." : "Implementation captured key logic. Ensure time/space complexity is optimal.");
        eval.setAiFollowUpQuestion(followUp);
        eval.setSatisfactory(overallScore >= 65);
        eval.setInterviewerRemarks(interviewerRemarks);

        return eval;
    }

    private int calculateCommunicationScore(String text, int fillerWords, int wpm) {
        int base = 80;
        if (text.length() > 150) base += 10;
        if (fillerWords > 3) base -= (fillerWords * 3);
        if (wpm > 0) {
            if (wpm >= 110 && wpm <= 160) base += 8; // Optimal speaking rate
            else if (wpm < 80 || wpm > 190) base -= 8;
        }
        return Math.min(100, Math.max(35, base));
    }

    private String generatePersonaFollowUp(String persona, Question question, String answer) {
        String p = persona != null ? persona.toLowerCase() : "sarah";
        return switch (p) {
            case "sarah" -> // Rigorous FAANG Bar Raiser
                    "That's a good baseline. Now, how would this solution behave under a 100x traffic spike or network partitions? Where is the single point of failure?";
            case "david" -> // VP of Engineering / Executive
                    "From an engineering economics perspective, what are the operational trade-offs and maintenance costs of this architectural approach?";
            case "maya" -> // Behavioral / Culture Lead
                    "How would you align cross-functional stakeholders (Product, Security, QA) if they pushed back against this implementation?";
            default -> // Alex - Tech Lead Mentor
                    "Great explanation! Could you walk me through one specific edge case you'd want to write a unit test for?";
        };
    }

    private String generateInterviewerRemarks(String persona, int score, String title) {
        String p = persona != null ? persona.toLowerCase() : "alex";
        if (score >= 85) {
            return switch (p) {
                case "sarah" -> "Exceptional depth and structural clarity. Strong grasp of high-scale trade-offs on " + title + ".";
                case "david" -> "Strategic, mature engineering mindset. Communicated system trade-offs with confidence.";
                case "maya" -> "Outstanding communication and structured response. Highly collaborative tone.";
                default -> "Fantastic answer! You covered the fundamental principles and clearly explained your rationale.";
            };
        } else if (score >= 65) {
            return switch (p) {
                case "sarah" -> "Competent technical answer, though I'd like to see deeper consideration of edge cases and resilience.";
                case "david" -> "Solid baseline. Focus more on long-term scalability and monitoring in your next answer.";
                case "maya" -> "Good response. Try to weave in more concrete impact metrics and structured STAR storytelling.";
                default -> "Good effort! With a little more depth on internal mechanics, this would be top tier.";
            };
        } else {
            return switch (p) {
                case "sarah" -> "Needs improvement. The response lacked technical precision and missed critical architectural considerations.";
                case "david" -> "Underdeveloped answer. Recommend brushing up on system design principles before advancing.";
                case "maya" -> "The answer felt ambiguous. Structure your thoughts clearly before speaking.";
                default -> "Don't worry! This is a challenging topic. Review the benchmark notes and give it another try.";
            };
        }
    }

    public FinalInterviewReport generateFinalReport(InterviewSession session) {
        List<QuestionEvaluation> evals = session.getEvaluations();
        int count = Math.max(1, evals.size());

        int avgTechnical = (int) evals.stream().mapToInt(QuestionEvaluation::getTechnicalScore).average().orElse(70);
        int avgComm = (int) evals.stream().mapToInt(QuestionEvaluation::getCommunicationScore).average().orElse(75);
        int avgProbSolving = (int) evals.stream().mapToInt(QuestionEvaluation::getProblemSolvingScore).average().orElse(70);
        int avgArch = (int) Math.min(100, Math.max(40, (avgTechnical * 0.7) + (avgProbSolving * 0.3)));
        int avgBehavioral = (int) Math.min(100, Math.max(45, (avgComm * 0.8) + (avgTechnical * 0.2)));

        int overallScore = (int) Math.round((avgTechnical * 0.35) + (avgProbSolving * 0.25) + (avgComm * 0.20) + (avgArch * 0.20));

        String hireRecommendation;
        String verdictSummary;

        if (overallScore >= 88) {
            hireRecommendation = "Strong Hire";
            verdictSummary = "Candidate demonstrates superior domain expertise, exceptional communication, and sound architectural judgment. Ready for senior/staff scope.";
        } else if (overallScore >= 75) {
            hireRecommendation = "Hire";
            verdictSummary = "Solid candidate who meets the bar across core technical requirements, problem-solving ability, and team communication.";
        } else if (overallScore >= 62) {
            hireRecommendation = "Lean Hire";
            verdictSummary = "Shows good foundational competence with minor gaps in deep architectural nuances and speed of delivery. Recommended with targeted onboarding.";
        } else if (overallScore >= 50) {
            hireRecommendation = "Lean No Hire";
            verdictSummary = "Candidate struggled with specific complex scenarios and edge cases. Recommend 2-4 weeks of targeted practice before re-interviewing.";
        } else {
            hireRecommendation = "No Hire";
            verdictSummary = "Significant gaps in fundamental concepts and technical articulation. Needs substantial foundational study.";
        }

        List<String> keyStrengths = new ArrayList<>();
        List<String> criticalGaps = new ArrayList<>();

        evals.forEach(e -> {
            keyStrengths.addAll(e.getStrengths());
            criticalGaps.addAll(e.getAreasForImprovement());
        });

        // Deduplicate
        List<String> distinctStrengths = keyStrengths.stream().distinct().limit(4).toList();
        List<String> distinctGaps = criticalGaps.stream().distinct().limit(4).toList();

        List<String> studyPlan = generateStudyPlan(session.getConfig().getDomain(), distinctGaps);
        List<String> resources = List.of(
                "Designing Data-Intensive Applications (Martin Kleppmann)",
                "System Design Primer by Donne Martin (GitHub)",
                "Spring Boot in Action & Modern JVM Internals",
                "Cracking the Coding Interview & NeetCode 150"
        );

        FinalInterviewReport report = new FinalInterviewReport();
        report.setSessionId(session.getId());
        report.setCandidateName(session.getConfig().getCandidateName() != null ? session.getConfig().getCandidateName() : "Candidate");
        report.setRole(session.getConfig().getRole());
        report.setSeniority(session.getConfig().getSeniority());
        report.setPersona(session.getConfig().getPersona());
        report.setOverallScore(overallScore);
        report.setHireRecommendation(hireRecommendation);
        report.setVerdictSummary(verdictSummary);
        report.setTechnicalDepthScore(avgTechnical);
        report.setSystemArchitectureScore(avgArch);
        report.setCommunicationScore(avgComm);
        report.setProblemSolvingScore(avgProbSolving);
        report.setBehavioralStarScore(avgBehavioral);
        report.setPaceWpmAvg(135);
        report.setFillerWordsTotal(evals.size() * 2);
        report.setQuestionEvaluations(evals);
        report.setKeyStrengths(distinctStrengths);
        report.setCriticalGaps(distinctGaps);
        report.setActionableStudyPlan(studyPlan);
        report.setRecommendedResources(resources);
        report.setCreatedAt(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));

        return report;
    }

    private List<String> generateStudyPlan(String domain, List<String> gaps) {
        List<String> plan = new ArrayList<>();
        plan.add("Week 1: Reinforce core architectural patterns, concurrency primitives, and memory models.");
        plan.add("Week 2: Practice live code articulation — talk aloud while structuring algorithms and explaining Big-O tradeoffs.");
        plan.add("Week 3: Deep-dive into distributed caches, indexing strategies, and database sharding techniques.");
        plan.add("Week 4: Conduct timed mock interviews focusing on STAR behavioral storytelling and concise delivery.");
        return plan;
    }
}
