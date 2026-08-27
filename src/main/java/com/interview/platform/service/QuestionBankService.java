package com.interview.platform.service;

import com.interview.platform.model.Question;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class QuestionBankService {

    private final List<Question> questionBank = new ArrayList<>();

    @PostConstruct
    public void init() {
        // --- BACKEND & JAVA / SPRING BOOT ---
        addQuestion(new Question(
                "be-001",
                "Explain Spring Boot Auto-Configuration & Bean Lifecycle",
                "How does Spring Boot determine which beans to load automatically via @EnableAutoConfiguration and spring.factories/AutoConfiguration.imports? Walk through the Bean Lifecycle from instantiation to destruction.",
                "backend", "Mid-Level", "Spring Framework",
                List.of("Mention @ConditionalOnClass and @ConditionalOnMissingBean", "Explain BeanPostProcessor and InitializingBean callbacks"),
                "// Example Spring Configuration:\n@Configuration\npublic class AppConfig {\n    @Bean\n    public MyService myService() {\n        return new MyServiceImpl();\n    }\n}",
                "java", "O(1) runtime configuration",
                "Spring Boot uses conditions like @ConditionalOnClass to inspect classpath. Lifecycle: 1. Instantiation 2. Populating properties 3. BeanNameAware/BeanFactoryAware 4. BeanPostProcessor pre-initialization 5. @PostConstruct / afterPropertiesSet 6. BeanPostProcessor post-initialization 7. Ready for use 8. @PreDestroy / DisposableBean.",
                List.of("Spring Boot", "IoC Container", "Bean Lifecycle", "AutoConfiguration", "Conditional Annotations"),
                List.of("Amazon", "Microsoft", "JPMorgan", "Oracle")
        ));

        addQuestion(new Question(
                "be-002",
                "Design a Resilient Distributed Rate Limiter",
                "How would you implement a distributed rate limiter in a Spring Boot microservice architecture handling 100,000 requests/sec? Compare Token Bucket vs Sliding Window Log.",
                "backend", "Senior", "Distributed Systems",
                List.of("Consider Redis with Lua scripts for atomicity", "Discuss sliding window counters to avoid boundary spikes"),
                "public class RateLimiter {\n    public boolean isAllowed(String apiKey, int maxRequests, int windowSeconds) {\n        // Implement rate check logic\n        return true;\n    }\n}",
                "java", "O(1) Redis execution time with Lua script",
                "Use Redis with Sliding Window Counter or Token Bucket implemented via Lua script to guarantee atomic decrement. Keys keyed by client IP or API key with TTL expiration.",
                List.of("Rate Limiting", "Redis", "Lua Scripts", "Token Bucket", "Sliding Window"),
                List.of("Stripe", "Uber", "Netflix", "Google")
        ));

        addQuestion(new Question(
                "be-003",
                "Database Indexing & Query Optimization (B-Tree vs Hash)",
                "Explain how B-Tree indexes work in relational databases (PostgreSQL/MySQL). When does an index scan degrade into a sequential scan, and how do composite indexes obey the leftmost prefix rule?",
                "backend", "Mid-Level", "Databases",
                List.of("Explain B-Tree depth and logarithmic search", "Cover composite index column ordering (A, B, C)"),
                "-- Analyze query execution plan\nEXPLAIN ANALYZE \nSELECT * FROM orders \nWHERE user_id = 1042 AND status = 'COMPLETED' \nORDER BY created_at DESC;",
                "sql", "O(log N) lookup vs O(N) full table scan",
                "B-Trees maintain sorted balanced keys on disk pages. Composite index on (user_id, status, created_at) satisfies filter and sort without filesort. Leftmost prefix rule dictates queries must filter on leading columns to utilize subsequent indexed fields.",
                List.of("B-Tree", "PostgreSQL", "Query Planner", "Index Scan", "Composite Keys"),
                List.of("Meta", "Amazon", "Uber", "Airbnb")
        ));

        addQuestion(new Question(
                "be-004",
                "Concurrency, ThreadPools & Virtual Threads in Java 21",
                "How do Project Loom Virtual Threads differ from traditional OS platform threads in JVM? When should you use Virtual Threads vs reactive programming (Spring WebFlux)?",
                "backend", "Senior", "Core Java & Concurrency",
                List.of("Discuss 1:1 OS thread mapping vs M:N carrier threads", "Mention blocking I/O offloading to JVM continuation scheduler"),
                "try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {\n    IntStream.range(0, 10_000).forEach(i -> {\n        executor.submit(() -> {\n            Thread.sleep(Duration.ofMillis(100));\n            return i;\n        });\n    });\n}",
                "java", "M:N lightweight scheduling with low memory footprint (~few KBs)",
                "Virtual threads are user-mode threads managed by JVM runtime mounted onto carrier platform threads. Ideal for high-throughput blocking I/O without reactive complexity. WebFlux still excels for backpressure streaming.",
                List.of("Virtual Threads", "Project Loom", "Thread Pool", "Non-blocking I/O"),
                List.of("Netflix", "Google", "Amazon", "Spotify")
        ));

        // --- FRONTEND & WEB ---
        addQuestion(new Question(
                "fe-001",
                "React Reconciliation & Virtual DOM Diffing Algorithm",
                "How does the React reconciliation engine determine when to remount or update components? Explain the role of keys, Fiber architecture, and how concurrent rendering works.",
                "frontend", "Mid-Level", "React Core",
                List.of("Explain heuristic O(N) diffing algorithm", "Explain why array index keys cause state bugs in dynamic lists"),
                "function ItemList({ items, onDelete }) {\n  return (\n    <ul>\n      {items.map(item => (\n        <li key={item.id}>\n          <span>{item.name}</span>\n          <button onClick={() => onDelete(item.id)}>Delete</button>\n        </li>\n      ))}\n    </ul>\n  );\n}",
                "javascript", "O(N) diffing with unique keys",
                "React uses Fiber tree with two phases: Render (asynchronous, interruptible) and Commit (synchronous DOM mutations). Stable unique keys allow React to track element identity across re-renders without re-instantiating subtrees.",
                List.of("React Fiber", "Virtual DOM", "Reconciliation", "Component Lifecycle", "Hooks"),
                List.of("Meta", "Airbnb", "Microsoft", "Twitter")
        ));

        addQuestion(new Question(
                "fe-002",
                "Web Performance Optimization & Core Web Vitals",
                "How would you optimize a large single-page web app failing Largest Contentful Paint (LCP) and Interaction to Next Paint (INP)?",
                "frontend", "Senior", "Web Performance",
                List.of("Discuss critical rendering path, code splitting, resource hints", "Explain main-thread blocking long tasks and yielded scheduling"),
                "// Dynamic Import with React Lazy\nconst HeavyAnalyticsDashboard = React.lazy(() => import('./AnalyticsDashboard'));\n\n// Preload critical assets\n// <link rel=\"preload\" href=\"/hero.webp\" as=\"image\">",
                "javascript", "Sub-2.5s LCP, sub-200ms INP",
                "Optimize LCP via critical CSS inlining, preloading hero assets, CDN edge caching, and server-side rendering/streaming. Improve INP by breaking down long tasks via requestAnimationFrame or scheduler.yield(), debouncing inputs, and offloading heavy computation to Web Workers.",
                List.of("Core Web Vitals", "LCP", "INP", "Code Splitting", "Web Workers"),
                List.of("Google", "Netflix", "Shopify", "Vercel")
        ));

        addQuestion(new Question(
                "fe-003",
                "Implement Deep Clone with Circular Reference Handling",
                "Write a JavaScript function that performs a true deep clone of any arbitrary object, handling nested objects, arrays, Dates, RegExps, and circular self-references.",
                "frontend", "Mid-Level", "JavaScript Algorithms",
                List.of("Use a WeakMap to track visited objects", "Handle primitives and special object types correctly"),
                "function deepClone(obj, hash = new WeakMap()) {\n  // Implement deep clone logic\n  if (Object(obj) !== obj) return obj;\n  if (hash.has(obj)) return hash.get(obj);\n  \n  const result = Array.isArray(obj) ? [] : Object.create(Object.getPrototypeOf(obj));\n  hash.set(obj, result);\n  \n  for (const key of Reflect.ownKeys(obj)) {\n    result[key] = deepClone(obj[key], hash);\n  }\n  return result;\n}",
                "javascript", "O(N) time, O(N) space where N is number of nested keys",
                "Utilize a WeakMap to memoize visited object references. When encountering a previously seen reference in the map, return the cloned instance to prevent infinite call stack recursion.",
                List.of("JavaScript", "WeakMap", "Recursion", "Memory Management", "Deep Clone"),
                List.of("Google", "Amazon", "Uber", "Apple")
        ));

        // --- SYSTEM DESIGN & DISTRIBUTED SYSTEMS ---
        addQuestion(new Question(
                "sd-001",
                "Design a Scalable URL Shortener (TinyURL)",
                "Design a distributed URL shortener handling 100M new URLs/day with 10:1 read-to-write ratio, low latency (<20ms read), high availability, and custom alias support.",
                "system-design", "Senior", "System Architecture",
                List.of("Calculate QPS and storage requirements (Base62 encoding)", "Discuss caching tier (Redis LRU) and distributed key generator (Snowflake / ZooKeeper range allocator)"),
                "// System Design Architecture Components:\n// [Clients] -> [API Gateway / Load Balancer] -> [Shortener Service]\n//                      |\n//         +------------+------------+\n//         |                         |\n//    [Redis Cache]            [Postgres / Cassandra Shards]\n//         |                         |\n//    [Cache Hit <5ms]          [Unique Key Generator (Snowflake)]",
                "system-design", "O(1) Base62 lookup with Redis cache hit",
                "Use 7-character Base62 string (62^7 ≈ 3.5 trillion URLs). Architecture: Load Balancer -> Stateless API Service -> Redis Cache -> Sharded DB (PostgreSQL / DynamoDB). Key generation via central Ticket Server / ZooKeeper range or Snowflake ID converted to Base62.",
                List.of("Base62 Encoding", "Redis Cache", "Database Sharding", "Snowflake ID", "High Availability"),
                List.of("Amazon", "Meta", "Google", "Microsoft", "Twitter")
        ));

        addQuestion(new Question(
                "sd-002",
                "Design a Real-time Collaborative Document Editing System",
                "Design the backend architecture for a real-time collaborative editor (like Google Docs or Figma). Compare Operational Transformation (OT) vs Conflict-free Replicated Data Types (CRDTs).",
                "system-design", "Staff/Lead", "Distributed Consensus & Collaboration",
                List.of("Discuss state convergence and causality tracking", "Explain WebSocket communication with regional presence servers"),
                "// Architecture Flow:\n// [Client A] <--- WebSocket ---> [Gateway / Presence Node] <---> [PubSub / Kafka]\n// [Client B] <--- WebSocket ---> [Document Worker Cluster] <---> [Redis State]\n//                                        |\n//                                 [CRDT Engine] ---> [S3 / Document DB]",
                "system-design", "Sub-50ms peer sync latency",
                "Use CRDTs (e.g., Yjs or Automerge) for decentralized eventual consistency or OT with a central document authority server. Regional WebSocket edges connect via Kafka/Redis Streams for room broadcasting with append-only log persistence.",
                List.of("CRDTs", "Operational Transformation", "WebSockets", "Kafka", "Eventual Consistency"),
                List.of("Google", "Figma", "Notion", "Slack")
        ));

        // --- FULL STACK & DEV OPS ---
        addQuestion(new Question(
                "fs-001",
                "Design Secure End-to-End JWT Authentication & Token Refresh Flow",
                "How do you implement a secure authentication architecture using short-lived Access Tokens and HttpOnly Refresh Tokens with rotation to mitigate XSS and CSRF vulnerabilities?",
                "fullstack", "Mid-Level", "Security & Architecture",
                List.of("Explain HttpOnly SameSite cookies vs localStorage", "Discuss refresh token reuse detection and revocation blacklist"),
                "// Security Flow:\n// 1. Client sends credentials -> Server validates & sets:\n//    - Access Token (in-memory / short 15m)\n//    - Refresh Token (HttpOnly, Secure, SameSite=Strict cookie with 7d expiry)\n// 2. On 401: Interceptor hits /api/auth/refresh -> Rotates refresh token in DB",
                "java", "O(1) cryptographic verification without DB hit for access token",
                "Access token is signed with HMAC-SHA256/RSA and stored in memory. Refresh token is stored in HttpOnly, Secure, SameSite cookie. On refresh, rotate the token and invalidate previous family if replay is detected.",
                List.of("JWT", "OAuth 2.0", "XSS Mitigation", "CSRF", "Token Rotation"),
                List.of("Stripe", "Auth0", "Amazon", "Salesforce")
        ));

        addQuestion(new Question(
                "devops-001",
                "Zero-Downtime Blue-Green & Canary Deployments in Kubernetes",
                "Explain the mechanics of rolling updates, blue-green deployments, and canary releases in Kubernetes. How do readiness probes, ingress traffic splitting, and automated rollbacks work?",
                "devops", "Senior", "Kubernetes & Cloud Infrastructure",
                List.of("Explain difference between Liveness and Readiness probes", "Discuss Istio / Service Mesh for weight-based canary traffic routing"),
                "apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: interview-service-v2\nspec:\n  replicas: 5\n  strategy:\n    type: RollingUpdate\n    rollingUpdate:\n      maxSurge: 25%\n      maxUnavailable: 0\n  template:\n    spec:\n      containers:\n      - name: app\n        image: interview-api:v2.0\n        readinessProbe:\n          httpGet:\n            path: /actuator/health\n            port: 8080\n          initialDelaySeconds: 10\n          periodSeconds: 5",
                "yaml", "Zero-downtime cutover with automated health verification",
                "Readiness probes prevent traffic routing until container is warmed up. Canary splits 5-10% traffic via Ingress/Service Mesh, monitoring Prometheus error rates before full progressive rollout. Blue-Green switches service selectors instantaneously.",
                List.of("Kubernetes", "Canary Deployment", "Readiness Probes", "Service Mesh", "CI/CD"),
                List.of("Netflix", "AWS", "Google Cloud", "Uber")
        ));

        // --- DATA SCIENCE & AI / ML ---
        addQuestion(new Question(
                "ds-001",
                "Self-Attention Mechanism in Transformers & LLM Architecture",
                "Explain mathematically and conceptually how Scaled Dot-Product Attention works (Query, Key, Value). Why do we divide by sqrt(d_k), and how does Multi-Head Attention enhance representational capacity?",
                "data-science", "Senior", "Machine Learning & LLMs",
                List.of("Attention(Q, K, V) = softmax(Q * K^T / sqrt(d_k)) * V", "Explain why vanishing gradients occur without scaling factor"),
                "# Python PyTorch Scaled Dot-Product Attention\nimport torch\nimport torch.nn.functional as F\n\ndef attention(Q, K, V, mask=None):\n    d_k = Q.size(-1)\n    scores = torch.matmul(Q, K.transpose(-2, -1)) / (d_k ** 0.5)\n    if mask is not None:\n        scores = scores.masked_fill(mask == 0, -1e9)\n    p_attn = F.softmax(scores, dim=-1)\n    return torch.matmul(p_attn, V), p_attn",
                "python", "O(N^2 * d) attention computation where N is sequence length",
                "Scaled dot product computes pairwise similarity between queries and keys. Dividing by sqrt(d_k) stabilizes softmax gradients for large dimensions. Multi-Head Attention allows the model to jointly attend to information from different representation subspaces at different positions.",
                List.of("Transformers", "Self-Attention", "Multi-Head Attention", "PyTorch", "LLMs"),
                List.of("Google", "OpenAI", "Anthropic", "Meta")
        ));

        // --- BEHAVIORAL & HR (STAR METHOD) ---
        addQuestion(new Question(
                "beh-001",
                "Tell Me About a Time You Disagreed With a Technical Decision",
                "Describe a situation where you had a strong technical disagreement with a team member or manager. How did you advocate your perspective, test assumptions, and what was the outcome? (Apply STAR framework: Situation, Task, Action, Result).",
                "behavioral", "All Levels", "Leadership & Communication",
                List.of("Structure response using STAR method", "Highlight empathy, data-driven prototyping, and team alignment over ego"),
                "// STAR Framework Guide:\n// [Situation]: Context and conflict background\n// [Task]: What was your objective and responsibility?\n// [Action]: How did you gather data, prototype, and communicate respectfully?\n// [Result]: Measurable impact, learnings, and team relationship status",
                "text", "Clear, structured 2-3 minute STAR narrative",
                "Exemplary answers frame disagreement around customer and architectural goals rather than personal opinion. Showcases building a quick prototype or benchmark to let data resolve the debate, followed by wholehearted commitment to the team's final direction.",
                List.of("STAR Method", "Conflict Resolution", "Technical Leadership", "Teamwork"),
                List.of("Amazon (Disagree and Commit)", "Google", "Meta", "Apple")
        ));

        addQuestion(new Question(
                "beh-002",
                "Describe How You Handled a Critical Production Outage Under Pressure",
                "Walk through a time when a system you owned experienced a critical Sev-1 outage or massive performance degradation in production. How did you triage, communicate, resolve the incident, and prevent recurrence?",
                "behavioral", "Senior", "Crisis Management & Accountability",
                List.of("Highlight blameless post-mortem culture", "Focus on immediate mitigation (rollback/failover) before root-cause analysis"),
                "// STAR Response Structure:\n// 1. Situation: Outage scope and business impact\n// 2. Task: Incident commander role & triage goals\n// 3. Action: Mitigation steps, stakeholder updates, hotfix\n// 4. Result: Mean Time to Recovery (MTTR) and systemic fixes implemented",
                "text", "Calm, structured incident management narrative",
                "Demonstrates emotional resilience, clear prioritization of customer mitigation over root cause analysis during live fires, transparent stakeholder updates, and thorough blameless root cause analysis (RCA) with preventive automated testing.",
                List.of("Incident Response", "Production Outages", "Root Cause Analysis", "Blameless Culture"),
                List.of("Netflix", "Stripe", "AWS", "Datadog")
        ));
    }

    private void addQuestion(Question q) {
        questionBank.add(q);
    }

    public List<Question> getAllQuestions() {
        return new ArrayList<>(questionBank);
    }

    public Optional<Question> getQuestionById(String id) {
        return questionBank.stream().filter(q -> q.getId().equalsIgnoreCase(id)).findFirst();
    }

    public List<Question> filterQuestions(String domain, String difficulty, String search) {
        return questionBank.stream()
                .filter(q -> domain == null || domain.isBlank() || domain.equalsIgnoreCase("all") || q.getDomain().equalsIgnoreCase(domain))
                .filter(q -> difficulty == null || difficulty.isBlank() || difficulty.equalsIgnoreCase("all") || q.getDifficulty().equalsIgnoreCase(difficulty))
                .filter(q -> search == null || search.isBlank() ||
                        q.getTitle().toLowerCase().contains(search.toLowerCase()) ||
                        q.getDescription().toLowerCase().contains(search.toLowerCase()) ||
                        q.getKeyConcepts().stream().anyMatch(k -> k.toLowerCase().contains(search.toLowerCase())) ||
                        q.getCompanyTags().stream().anyMatch(c -> c.toLowerCase().contains(search.toLowerCase())))
                .collect(Collectors.toList());
    }

    public List<Question> selectQuestionsForInterview(String domain, String difficulty, int count) {
        List<Question> filtered = filterQuestions(domain, null, null);
        if (filtered.isEmpty()) {
            filtered = new ArrayList<>(questionBank);
        }
        Collections.shuffle(filtered);
        return filtered.stream().limit(Math.max(1, Math.min(count, filtered.size()))).collect(Collectors.toList());
    }
}
