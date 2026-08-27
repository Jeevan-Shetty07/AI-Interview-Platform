/**
 * Spring Boot AI Interview Platform API Client
 */
export const API = {
  baseUrl: '',

  async startInterview(config) {
    const response = await fetch(`${this.baseUrl}/api/interview/start`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config)
    });
    if (!response.ok) throw new Error('Failed to start interview session');
    return await response.json();
  },

  async submitAnswer(submission) {
    const response = await fetch(`${this.baseUrl}/api/interview/submit-answer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submission)
    });
    if (!response.ok) throw new Error('Failed to evaluate answer');
    return await response.json();
  },

  async finalizeInterview(sessionId) {
    const response = await fetch(`${this.baseUrl}/api/interview/${sessionId}/finalize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) throw new Error('Failed to finalize interview report');
    return await response.json();
  },

  async getReport(sessionId) {
    const response = await fetch(`${this.baseUrl}/api/interview/${sessionId}/report`);
    if (!response.ok) throw new Error('Failed to fetch report');
    return await response.json();
  },

  async getQuestions(domain = '', difficulty = '', search = '') {
    const params = new URLSearchParams();
    if (domain) params.append('domain', domain);
    if (difficulty) params.append('difficulty', difficulty);
    if (search) params.append('search', search);

    const response = await fetch(`${this.baseUrl}/api/questions?${params.toString()}`);
    if (!response.ok) throw new Error('Failed to fetch questions');
    return await response.json();
  },

  async analyzeResume(resumeText, jobDescription) {
    const response = await fetch(`${this.baseUrl}/api/resume/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resumeText, jobDescription })
    });
    if (!response.ok) throw new Error('Failed to analyze resume');
    return await response.json();
  },

  async executeCode(code, language, questionId) {
    const response = await fetch(`${this.baseUrl}/api/code/run`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, language, questionId })
    });
    if (!response.ok) throw new Error('Failed to execute code');
    return await response.json();
  },

  async getHistory() {
    const response = await fetch(`${this.baseUrl}/api/analytics/history`);
    if (!response.ok) throw new Error('Failed to fetch session history');
    return await response.json();
  },

  async getSummaryStats() {
    const response = await fetch(`${this.baseUrl}/api/analytics/summary`);
    if (!response.ok) throw new Error('Failed to fetch summary stats');
    return await response.json();
  }
};
