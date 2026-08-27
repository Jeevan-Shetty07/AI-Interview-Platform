package com.interview.platform.service;

import com.interview.platform.model.FinalInterviewReport;
import com.interview.platform.model.InterviewSession;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class SessionStorageService {

    private final Map<String, InterviewSession> sessions = new ConcurrentHashMap<>();
    private final List<FinalInterviewReport> completedReports = Collections.synchronizedList(new ArrayList<>());

    public InterviewSession saveSession(InterviewSession session) {
        if (session.getId() == null || session.getId().isBlank()) {
            session.setId(UUID.randomUUID().toString());
        }
        sessions.put(session.getId(), session);
        return session;
    }

    public Optional<InterviewSession> getSession(String id) {
        return Optional.ofNullable(sessions.get(id));
    }

    public void saveReport(FinalInterviewReport report) {
        completedReports.removeIf(r -> r.getSessionId().equalsIgnoreCase(report.getSessionId()));
        completedReports.add(0, report);
    }

    public List<FinalInterviewReport> getAllCompletedReports() {
        return new ArrayList<>(completedReports);
    }

    public Optional<FinalInterviewReport> getReportBySessionId(String sessionId) {
        return completedReports.stream()
                .filter(r -> r.getSessionId().equalsIgnoreCase(sessionId))
                .findFirst();
    }
}
