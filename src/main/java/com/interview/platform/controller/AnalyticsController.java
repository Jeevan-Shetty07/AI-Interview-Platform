package com.interview.platform.controller;

import com.interview.platform.model.FinalInterviewReport;
import com.interview.platform.service.SessionStorageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    private final SessionStorageService sessionStorageService;

    public AnalyticsController(SessionStorageService sessionStorageService) {
        this.sessionStorageService = sessionStorageService;
    }

    @GetMapping("/history")
    public ResponseEntity<List<FinalInterviewReport>> getHistory() {
        return ResponseEntity.ok(sessionStorageService.getAllCompletedReports());
    }

    @GetMapping("/summary")
    public ResponseEntity<Map<String, Object>> getSummaryStats() {
        List<FinalInterviewReport> reports = sessionStorageService.getAllCompletedReports();
        Map<String, Object> summary = new HashMap<>();
        summary.put("totalInterviews", reports.size());

        if (reports.isEmpty()) {
            summary.put("averageScore", 0);
            summary.put("strongHireRate", "0%");
            summary.put("mostPracticedDomain", "Full Stack");
            return ResponseEntity.ok(summary);
        }

        double avgScore = reports.stream().mapToInt(FinalInterviewReport::getOverallScore).average().orElse(0);
        long strongHires = reports.stream().filter(r -> "Strong Hire".equalsIgnoreCase(r.getHireRecommendation()) || "Hire".equalsIgnoreCase(r.getHireRecommendation())).count();

        summary.put("averageScore", Math.round(avgScore));
        summary.put("strongHireRate", Math.round(((double) strongHires / reports.size()) * 100) + "%");
        summary.put("mostPracticedDomain", reports.get(0).getRole());

        return ResponseEntity.ok(summary);
    }
}
