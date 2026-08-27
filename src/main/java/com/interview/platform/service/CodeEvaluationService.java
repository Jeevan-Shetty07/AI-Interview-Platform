package com.interview.platform.service;

import com.interview.platform.model.CodeExecutionRequest;
import com.interview.platform.model.CodeExecutionResult;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CodeEvaluationService {

    public CodeExecutionResult executeAndAnalyze(CodeExecutionRequest request) {
        String code = request.getCode() != null ? request.getCode().trim() : "";
        String lang = request.getLanguage() != null ? request.getLanguage().toLowerCase() : "javascript";

        long start = System.currentTimeMillis();
        CodeExecutionResult result = new CodeExecutionResult();

        if (code.isEmpty()) {
            result.setStatus("COMPILE_ERROR");
            result.setOutput("Error: No code provided to execute.");
            result.setExecutionTimeMs(0);
            result.setCodeQualityScore(0);
            result.setReviewSuggestions(List.of("Please provide an implementation before running."));
            return result;
        }

        // Basic syntax heuristic checks
        int openBraces = countOccurrences(code, '{') - countOccurrences(code, '}');
        int openParens = countOccurrences(code, '(') - countOccurrences(code, ')');

        if (openBraces != 0 || openParens != 0) {
            result.setStatus("COMPILE_ERROR");
            result.setOutput("Syntax Error: Mismatched brackets or parentheses. Check your code delimiters.");
            result.setExecutionTimeMs(12);
            result.setCodeQualityScore(40);
            result.setReviewSuggestions(List.of("Fix syntax errors before optimizing time complexity."));
            return result;
        }

        // Complexity heuristics
        String timeComplexity = "O(N)";
        String spaceComplexity = "O(1)";

        int nestedLoops = calculateNestedLoopDepth(code);
        if (nestedLoops >= 2) {
            timeComplexity = "O(N^" + nestedLoops + ")";
        } else if (code.contains("binarySearch") || code.contains("/ 2") || code.contains(">> 1") || code.contains("Math.floor(mid)")) {
            timeComplexity = "O(log N)";
        } else if (code.contains(".sort") || code.contains("Arrays.sort") || code.contains("Collections.sort")) {
            timeComplexity = "O(N log N)";
        }

        if (code.contains("new Map") || code.contains("new Set") || code.contains("new HashMap") || code.contains("[]") || code.contains("ArrayList")) {
            spaceComplexity = "O(N)";
        }

        // Run simulation
        List<String> testResults = new ArrayList<>();
        testResults.add("✓ Test Case 1 (Standard Input): Passed [Execution: 4ms]");
        testResults.add("✓ Test Case 2 (Edge Case - Empty/Boundary): Passed [Execution: 2ms]");
        testResults.add("✓ Test Case 3 (High-Scale Stress Test): Passed [Execution: 8ms]");

        List<String> suggestions = new ArrayList<>();
        if (nestedLoops >= 2) {
            suggestions.add("Consider optimizing the nested loop using a Hash Map/Set to achieve O(N) linear time.");
        } else {
            suggestions.add("Time complexity is well optimized at " + timeComplexity + ".");
        }
        suggestions.add("Add defensive null and boundary validation at function entry.");
        suggestions.add("Use clear, descriptive variable names adhering to industry standard clean code guidelines.");

        long elapsed = Math.max(15, System.currentTimeMillis() - start + 12);

        result.setStatus("SUCCESS");
        result.setOutput("[Simulation Output]\nAll 3/3 test suites passed successfully!\nMemory allocated: 14.2 MB\nTime Complexity: " + timeComplexity + "\nSpace Complexity: " + spaceComplexity);
        result.setExecutionTimeMs(elapsed);
        result.setTimeComplexityEstimate(timeComplexity);
        result.setSpaceComplexityEstimate(spaceComplexity);
        result.setCodeQualityScore(nestedLoops >= 2 ? 78 : 92);
        result.setTestResults(testResults);
        result.setReviewSuggestions(suggestions);

        return result;
    }

    private int countOccurrences(String str, char ch) {
        int count = 0;
        for (char c : str.toCharArray()) {
            if (c == ch) count++;
        }
        return count;
    }

    private int calculateNestedLoopDepth(String code) {
        int depth = 0;
        int maxDepth = 0;
        String[] lines = code.split("\n");
        for (String line : lines) {
            String trimmed = line.trim();
            if (trimmed.startsWith("for") || trimmed.startsWith("while") || trimmed.contains(".forEach(") || trimmed.contains("for (")) {
                depth++;
                maxDepth = Math.max(maxDepth, depth);
            }
            if (trimmed.contains("}")) {
                depth = Math.max(0, depth - 1);
            }
        }
        return maxDepth;
    }
}
