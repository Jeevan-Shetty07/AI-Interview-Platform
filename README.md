# ⚡ IntervIO AI — AI Interview & Mock Assessment Platform

An enterprise-grade, ultra-modern **AI-Powered Mock Interview Platform** built with **Spring Boot** (Java 21) and a high-performance **Luxury Dark Glassmorphic Frontend**.

Featuring real-time AI interviewer personas, live speech-to-text / text-to-speech interaction, integrated coding execution & system design architecture whiteboards, ATS resume tailoring, and comprehensive hiring readiness radar analytics.

---

## 🌟 Key Features

### 1. 🎙️ Live Interactive AI Studio
- **Adaptive AI Interviewer Personas**:
  - **Sarah Chen** — Principal Architect & FAANG Bar Raiser (*rigorous system scalability, trade-offs, and critical edge cases*).
  - **Alex Vance** — Senior Tech Lead & Constructive Mentor (*supportive, focusing on clean code, unit testing, and design patterns*).
  - **David Miller** — VP of Engineering (*engineering economics, architecture lifecycle, and leadership maturity*).
  - **Maya Patel** — People & Culture Director (*STAR framework, conflict resolution, and leadership*).
- **Dynamic Lip-Sync & Audio Waveforms**: SVG avatar with talking mouth animations synchronized with Web Speech synthesis.
- **Hands-Free Speech-to-Text & TTS**: Real-time STT captioning with fallback text typing.
- **Live Performance HUD**: Real-time speaking pace (WPM counter), filler word detector (`um`, `uh`, `like`, `basically`), and answer timer.

### 2. 💻 Multi-Tool Engineering Workspace
- **Live Code Editor**: Syntax formatting, multi-language support (Java 21, Python 3, JavaScript ES6+, C++ 20, SQL), test case runner, and automated asymptotic complexity estimation ($O(N)$, $O(\log N)$, $O(N^2)$).
- **System Design Whiteboard**: Interactive diagramming canvas with draggable cloud architecture nodes (Client Apps, API Gateway / Load Balancers, Microservices, Redis Caches, PostgreSQL DBs, Kafka Event Streams) + freehand drawing.
- **STAR Behavioral Assistant**: Guided live prompts for Situation, Task, Action, and Result structuring.

### 3. 📊 In-Depth Evaluation & Hiring Readiness Report
- **Hire Recommendation Verdict**: Calibrated rating (*Strong Hire*, *Hire*, *Lean Hire*, *Lean No Hire*, *No Hire*) with overall score ring (0–100%).
- **5-Axis Competency Radar Chart**: Technical Depth, System Architecture, Problem Solving, Verbal Communication, STAR Alignment.
- **Question-by-Question AI Critique**: Audio transcripts, strengths, critical gaps, code feedback, and benchmark ideal model answers.
- **4-Week Actionable Growth Roadmap**: Targeted milestones and recommended technical reading.

### 4. 📄 ATS Resume Scanner & Tailored Mock Generator
- Upload/paste resume and target job description.
- Computes ATS match score, extracts present skills, identifies missing keywords, and automatically synthesizes tailored mock questions.

### 5. 📚 FAANG & Tier-1 Question Bank
- 150+ curated technical and behavioral questions categorized across **Backend**, **Frontend**, **Fullstack**, **System Design**, **DevOps & Cloud**, **AI/ML**, and **Behavioral**.
- Filter by domain, difficulty tier, and company tags (Google, Meta, Amazon, Netflix, Apple, Uber, Stripe).

---

## 🛠️ Technology Stack

- **Backend**: Spring Boot 4.x / 3.x, Java 21+ (OpenJDK 25 compatible), Spring WebMVC, Spring WebSocket, Jackson JSON.
- **Frontend**: Vanilla HTML5, Vanilla CSS Design System (Cyber Obsidian Glassmorphism with HSL tokens, CSS keyframe wave animations), ES6+ JavaScript Modules.
- **Web APIs**: Web Audio API (real-time frequency analyzer), Web Speech Recognition API (STT), Web Speech Synthesis API (TTS), WebRTC (video preview).

---

## 🚀 Getting Started & Running Locally

### Prerequisites
- Java 21 or higher (e.g. OpenJDK 21/25 or JetBrains JBR)
- Maven Wrapper is included (`mvnw` / `mvnw.cmd`)

### Running the Application

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Jeevan-Shetty07/AI-Interview-Platform.git
   cd AI-Interview-Platform
   ```

2. **Run using Maven Wrapper**:
   ```bash
   # On Windows (PowerShell):
   .\mvnw.cmd spring-boot:run

   # On Linux/macOS:
   ./mvnw spring-boot:run
   ```

3. **Or Build and Run the Packaged JAR**:
   ```bash
   .\mvnw.cmd package -DskipTests
   java -jar target/ai-interview-platform-0.0.1-SNAPSHOT.jar
   ```

4. **Open in Browser**:
   Navigate to [http://localhost:8088](http://localhost:8088)

---

## 🔌 API Endpoints Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/questions` | Filter questions by domain, difficulty, and search term |
| `GET` | `/api/questions/{id}` | Get detailed question with hints and benchmark solution |
| `POST` | `/api/interview/start` | Initialize interview session with persona and questions |
| `POST` | `/api/interview/submit-answer` | Submit answer text/code for real-time AI scoring & remarks |
| `POST` | `/api/interview/{sessionId}/finalize` | Generate comprehensive hiring report & radar data |
| `GET` | `/api/interview/{sessionId}/report` | Retrieve existing session report |
| `POST` | `/api/resume/analyze` | ATS resume keyword analysis & tailored questions |
| `POST` | `/api/code/run` | Code simulation runner with complexity analysis |
| `GET` | `/api/analytics/history` | List completed candidate interview sessions |
| `GET` | `/api/analytics/summary` | Aggregate platform statistics and pass rates |

---

## 📁 Project Structure

```
AI-Interview-Platform/
├── pom.xml                               # Maven project configuration
├── mvnw / mvnw.cmd                       # Maven wrappers
├── src/main/java/com/interview/platform/
│   ├── AiInterviewPlatformApplication.java
│   ├── config/
│   │   └── CorsConfig.java               # CORS & Static resource handlers
│   ├── controller/
│   │   ├── InterviewSessionController.java # /api/interview session lifecycle
│   │   ├── QuestionController.java       # /api/questions question bank
│   │   ├── ResumeController.java         # /api/resume ATS scanner
│   │   ├── CodeExecutionController.java  # /api/code code runner
│   │   └── AnalyticsController.java      # /api/analytics candidate metrics
│   ├── model/                            # Data transfer and domain models
│   └── service/
│       ├── QuestionBankService.java      # 150+ curated interview problems
│       ├── AiEvaluationService.java      # Multi-dimensional heuristic AI scoring
│       ├── ResumeService.java            # ATS scoring & tailored question generation
│       ├── CodeEvaluationService.java    # Code analyzer & complexity estimator
│       └── SessionStorageService.java    # Thread-safe in-memory session persistence
└── src/main/resources/
    ├── application.properties            # Server port 8088, multipart, and JSON settings
    └── static/                           # Modern SPA Frontend
        ├── index.html                    # Main HTML5 entry point
        ├── favicon.svg                   # Brand icon
        ├── css/                          # Luxury design system & component styles
        └── js/                           # Reactive state, audio engine, STT/TTS & views
```