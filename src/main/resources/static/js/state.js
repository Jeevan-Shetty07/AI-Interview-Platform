/**
 * Global Reactive State Management
 */
export const State = {
  currentView: 'landing',
  
  // Current active interview session
  activeSession: null,
  currentQuestionIndex: 0,
  
  // Real-time HUD stats
  metrics: {
    wpm: 0,
    fillerWords: 0,
    timeElapsedSeconds: 0,
    timerInterval: null
  },

  // Setup form draft
  setupConfig: {
    candidateName: 'Alex Mercer',
    role: 'Full Stack Engineer',
    seniority: 'Mid-Level',
    domain: 'backend',
    persona: 'sarah',
    difficulty: 'Medium',
    questionCount: 3,
    interviewType: 'technical',
    resumeText: '',
    jobDescriptionText: ''
  },

  // Latest generated report
  latestReport: null,

  listeners: new Set(),

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  },

  notify() {
    this.listeners.forEach(fn => fn(this));
  },

  setView(viewName) {
    this.currentView = viewName;
    window.location.hash = viewName;
    this.notify();
  },

  startTimer() {
    this.stopTimer();
    this.metrics.timeElapsedSeconds = 0;
    this.metrics.timerInterval = setInterval(() => {
      this.metrics.timeElapsedSeconds++;
      const timerEl = document.getElementById('hud-timer');
      if (timerEl) {
        const mins = Math.floor(this.metrics.timeElapsedSeconds / 60).toString().padStart(2, '0');
        const secs = (this.metrics.timeElapsedSeconds % 60).toString().padStart(2, '0');
        timerEl.textContent = `${mins}:${secs}`;
      }
    }, 1000);
  },

  stopTimer() {
    if (this.metrics.timerInterval) {
      clearInterval(this.metrics.timerInterval);
      this.metrics.timerInterval = null;
    }
  }
};
