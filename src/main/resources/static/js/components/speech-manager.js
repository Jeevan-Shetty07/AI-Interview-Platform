/**
 * Speech Recognition (STT) & Speech Synthesis (TTS) Manager
 */
export const SpeechManager = {
  recognition: null,
  isListening: false,
  transcript: '',
  fillerWordCounts: 0,
  wordCount: 0,
  speechStartTime: 0,

  initSTT(onResultCallback, onEndCallback) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn('Web Speech API not supported in this browser.');
      return false;
    }

    this.recognition = new SpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';

    this.recognition.onstart = () => {
      this.isListening = true;
      this.speechStartTime = Date.now();
    };

    this.recognition.onresult = (event) => {
      let interim = '';
      let final = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final += event.results[i][0].transcript + ' ';
        } else {
          interim += event.results[i][0].transcript;
        }
      }

      if (final) {
        this.transcript += final;
        this.analyzeSpeech(this.transcript);
      }

      if (onResultCallback) {
        onResultCallback(this.transcript + interim, this.getMetrics());
      }
    };

    this.recognition.onerror = (e) => {
      console.error('Speech recognition error', e);
    };

    this.recognition.onend = () => {
      this.isListening = false;
      if (onEndCallback) onEndCallback();
    };

    return true;
  },

  startListening() {
    if (this.recognition && !this.isListening) {
      try {
        this.recognition.start();
      } catch (e) {
        console.warn('Recognition start exception:', e);
      }
    }
  },

  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  },

  resetTranscript() {
    this.transcript = '';
    this.fillerWordCounts = 0;
    this.wordCount = 0;
    this.speechStartTime = Date.now();
  },

  analyzeSpeech(text) {
    if (!text) return;
    const fillers = ['um', 'uh', 'like', 'you know', 'basically', 'actually', 'literally', 'sort of', 'kind of', 'i mean'];
    const lower = text.toLowerCase();
    
    let count = 0;
    for (const f of fillers) {
      const regex = new RegExp(`\\b${f}\\b`, 'gi');
      const matches = lower.match(regex);
      if (matches) count += matches.length;
    }
    this.fillerWordCounts = count;

    const words = text.trim().split(/\s+/).filter(Boolean);
    this.wordCount = words.length;
  },

  getMetrics() {
    const elapsedMinutes = Math.max(0.1, (Date.now() - this.speechStartTime) / 60000);
    const wpm = Math.round(this.wordCount / elapsedMinutes);
    return {
      wpm: isNaN(wpm) ? 0 : Math.min(250, wpm),
      fillerWords: this.fillerWordCounts,
      wordCount: this.wordCount
    };
  },

  speak(text, persona = 'sarah', onStart, onEnd) {
    if (!('speechSynthesis' in window)) {
      if (onStart) onStart();
      setTimeout(() => { if (onEnd) onEnd(); }, 3000);
      return;
    }

    window.speechSynthesis.cancel(); // Stop any pending speech

    const cleanText = text.replace(/<[^>]*>?/gm, '').replace(/[`*#_]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);

    // Persona speech characteristics
    if (persona === 'sarah') { // FAANG Bar Raiser (authoritative, clear)
      utterance.pitch = 1.05;
      utterance.rate = 1.02;
    } else if (persona === 'alex') { // Tech Lead (friendly, supportive)
      utterance.pitch = 0.95;
      utterance.rate = 0.98;
    } else if (persona === 'david') { // VP / CTO (deep, deliberate)
      utterance.pitch = 0.85;
      utterance.rate = 0.92;
    } else if (persona === 'maya') { // HR Lead (warm, engaging)
      utterance.pitch = 1.15;
      utterance.rate = 1.0;
    }

    utterance.onstart = () => {
      if (onStart) onStart();
    };

    utterance.onend = () => {
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      if (onEnd) onEnd();
    };

    window.speechSynthesis.speak(utterance);
  },

  stopSpeaking() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
};
