import { State } from '../state.js';
import { API } from '../api.js';
import { AvatarComponent } from '../components/avatar.js';
import { AudioVisualizer } from '../components/audio-visualizer.js';
import { SpeechManager } from '../components/speech-manager.js';
import { CodeEditorComponent } from '../components/code-editor.js';
import { WhiteboardComponent } from '../components/whiteboard.js';

export const StudioView = {
  isMicActive: false,
  isCameraActive: false,
  webcamStream: null,
  activeTab: 'code',

  render() {
    const session = State.activeSession;
    if (!session || !session.questions || session.questions.length === 0) {
      return `
        <div style="text-align: center; padding: 4rem;">
          <h2>No active interview session found</h2>
          <button class="btn btn-primary" id="btn-return-setup" style="margin-top: 1rem;">Go to Setup</button>
        </div>
      `;
    }

    const currentQ = session.questions[State.currentQuestionIndex] || session.questions[0];
    const persona = session.config.persona || 'sarah';
    const currentQNum = State.currentQuestionIndex + 1;
    const totalQNum = session.questions.length;

    return `
      <div class="studio-container">
        
        <!-- Left Panel: AI Avatar & Candidate Feeds -->
        <div class="studio-left-panel">
          
          <!-- AI Interviewer Card -->
          <div class="ai-interviewer-card">
            <div class="ai-avatar-viewport" id="ai-avatar-container">
              ${AvatarComponent.renderAvatar(persona, false)}
              <div class="ai-status-pill">
                <span class="status-dot thinking" id="ai-status-dot"></span>
                <span id="ai-status-text">AI Ready</span>
              </div>
            </div>

            <!-- Dialogue Transcript Balloon -->
            <div class="ai-speech-transcript" id="ai-speech-balloon">
              "${this.escapeHtml(currentQ.description || currentQ.title)}"
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.75rem;">
              <div class="audio-waves" id="ai-audio-waves">
                <div class="audio-bar"></div>
                <div class="audio-bar"></div>
                <div class="audio-bar"></div>
                <div class="audio-bar"></div>
                <div class="audio-bar"></div>
              </div>
              <button class="btn btn-secondary btn-sm" id="btn-repeat-speech">🔊 Replay Voice</button>
            </div>
          </div>

          <!-- Candidate Feed & STT Card -->
          <div class="candidate-feed-card">
            <div class="candidate-video-viewport">
              <video id="candidate-webcam" autoplay playsinline muted></video>
              <div class="webcam-placeholder" id="webcam-placeholder">
                <div style="font-size: 2rem;">👤</div>
                <span>Camera Off (Click Camera to Enable)</span>
              </div>

              <!-- HUD overlay -->
              <div class="candidate-hud">
                <span id="hud-timer">00:00</span>
                <span>Pace: <strong id="hud-wpm" style="color: var(--accent-cyan);">0 WPM</strong></span>
                <span>Fillers: <strong id="hud-fillers" style="color: var(--accent-amber);">0</strong></span>
              </div>
            </div>

            <!-- Audio waveform canvas -->
            <canvas id="mic-visualizer-canvas" width="400" height="24" style="width: 100%; height: 24px; background: rgba(0,0,0,0.3); border-radius: 4px;"></canvas>

            <!-- Live Speech-to-Text / Answer Box -->
            <div style="display: flex; flex-direction: column; gap: 0.35rem;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <label style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted);">Your Spoken / Typed Answer</label>
                <span style="font-size: 0.75rem; color: var(--text-subtle);">Live Speech Transcription Active</span>
              </div>
              <div class="live-stt-box">
                <textarea id="candidate-answer-input" placeholder="Speak into your microphone or type your response here..."></textarea>
              </div>
            </div>

            <!-- Mic & Cam Control Buttons -->
            <div style="display: flex; gap: 0.5rem;">
              <button class="btn btn-secondary btn-sm" id="btn-toggle-mic" style="flex: 1;">
                🎙️ <span id="mic-btn-label">Start Speaking</span>
              </button>
              <button class="btn btn-secondary btn-sm" id="btn-toggle-cam">
                📷 <span id="cam-btn-label">Cam On</span>
              </button>
            </div>
          </div>

        </div>

        <!-- Right Panel: Tabs (Code Editor, Whiteboard, STAR Notes, Details) -->
        <div class="studio-right-panel">
          
          <!-- Question Banner -->
          <div class="studio-question-banner">
            <div class="studio-question-title">
              <span>Question ${currentQNum} of ${totalQNum}: ${this.escapeHtml(currentQ.title)}</span>
              <div style="display: flex; gap: 0.5rem;">
                <span class="badge badge-primary">${this.escapeHtml(currentQ.domain)}</span>
                <span class="badge badge-cyan">${this.escapeHtml(currentQ.difficulty)}</span>
              </div>
            </div>
            <div class="studio-question-desc">
              ${this.escapeHtml(currentQ.description)}
            </div>
          </div>

          <!-- Tab Bar Header -->
          <div class="workspace-tabs-header">
            <div class="workspace-tabs">
              <button class="ws-tab-btn active" data-tab="code">💻 Live Code Editor</button>
              <button class="ws-tab-btn" data-tab="whiteboard">📐 System Whiteboard</button>
              <button class="ws-tab-btn" data-tab="star">🎯 STAR Structure Guide</button>
              <button class="ws-tab-btn" data-tab="hints">💡 Hints & Concepts</button>
            </div>
          </div>

          <!-- Tab Contents -->
          <div class="workspace-body">
            
            <!-- Code Tab -->
            <div class="workspace-tab-content active" id="tab-content-code">
              ${CodeEditorComponent.render(currentQ.starterCode, currentQ.language || 'javascript')}
            </div>

            <!-- Whiteboard Tab -->
            <div class="workspace-tab-content" id="tab-content-whiteboard">
              ${WhiteboardComponent.render()}
            </div>

            <!-- STAR Guide Tab -->
            <div class="workspace-tab-content" id="tab-content-star" style="padding: 1.5rem; overflow-y: auto;">
              <div class="card" style="margin-bottom: 1rem; background: rgba(30, 41, 59, 0.4);">
                <h4 style="color: var(--accent-cyan); margin-bottom: 0.4rem;">🎯 STAR Framework Guidelines</h4>
                <p style="font-size: 0.9rem;">Structure your verbal responses for maximum clarity and executive impact:</p>
                <div style="margin-top: 1rem; display: flex; flex-direction: column; gap: 0.75rem;">
                  <div><strong style="color: #fff;">S - Situation:</strong> Set the context, problem scope, and technical constraints.</div>
                  <div><strong style="color: #fff;">T - Task:</strong> State your specific role and key deliverables.</div>
                  <div><strong style="color: #fff;">A - Action:</strong> Walk through the architectural decisions, trade-offs, and technical implementation.</div>
                  <div><strong style="color: #fff;">R - Result:</strong> Share quantified business & performance impact (latency reduction, QPS, uptime).</div>
                </div>
              </div>
            </div>

            <!-- Hints & Details Tab -->
            <div class="workspace-tab-content" id="tab-content-hints" style="padding: 1.5rem; overflow-y: auto;">
              <div class="card" style="margin-bottom: 1rem;">
                <h4 style="color: var(--accent-amber); margin-bottom: 0.5rem;">💡 Hints for this Question</h4>
                <ul style="padding-left: 1.25rem; font-size: 0.9rem; color: var(--text-muted); display: flex; flex-direction: column; gap: 0.5rem;">
                  ${(currentQ.hints || []).map(h => `<li>${this.escapeHtml(h)}</li>`).join('')}
                </ul>
              </div>
              <div class="card">
                <h4 style="color: var(--primary-light); margin-bottom: 0.5rem;">🏢 Company Tags & Key Concepts</h4>
                <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.75rem;">
                  ${(currentQ.companyTags || []).map(c => `<span class="badge badge-primary">${this.escapeHtml(c)}</span>`).join('')}
                </div>
                <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                  ${(currentQ.keyConcepts || []).map(k => `<span class="badge badge-cyan">${this.escapeHtml(k)}</span>`).join('')}
                </div>
              </div>
            </div>

          </div>

          <!-- Bottom Action Bar -->
          <div class="studio-footer-controls">
            <button class="btn btn-secondary" id="btn-abandon-interview">Exit Session</button>
            <div style="display: flex; gap: 0.75rem;">
              <button class="btn btn-primary" id="btn-submit-answer">
                ${currentQNum < totalQNum ? 'Submit Answer & Next Question →' : 'Complete & Generate Report 📊'}
              </button>
            </div>
          </div>

        </div>

      </div>
    `;
  },

  initListeners() {
    const session = State.activeSession;
    if (!session || !session.questions || session.questions.length === 0) {
      document.getElementById('btn-return-setup')?.addEventListener('click', () => State.setView('setup'));
      return;
    }

    const currentQ = session.questions[State.currentQuestionIndex];
    const persona = session.config.persona || 'sarah';

    // Initialize Sub-components
    CodeEditorComponent.initListeners(currentQ.id);
    WhiteboardComponent.initListeners();
    AudioVisualizer.initMicVisualizer('mic-visualizer-canvas');
    State.startTimer();

    // Tab switching
    document.querySelectorAll('.ws-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        document.querySelectorAll('.ws-tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.workspace-tab-content').forEach(c => c.classList.remove('active'));

        btn.classList.add('active');
        const content = document.getElementById(`tab-content-${tab}`);
        if (content) content.classList.add('active');
      });
    });

    // Auto-Speak AI Question on load
    this.playAiQuestion(currentQ.description || currentQ.title, persona);

    // Replay speech button
    document.getElementById('btn-repeat-speech')?.addEventListener('click', () => {
      this.playAiQuestion(currentQ.description || currentQ.title, persona);
    });

    // Speech-to-text toggle
    const micBtn = document.getElementById('btn-toggle-mic');
    const micLabel = document.getElementById('mic-btn-label');
    const answerInput = document.getElementById('candidate-answer-input');

    SpeechManager.initSTT(
      (transcript, metrics) => {
        if (answerInput) answerInput.value = transcript;
        document.getElementById('hud-wpm').textContent = `${metrics.wpm} WPM`;
        document.getElementById('hud-fillers').textContent = `${metrics.fillerWords}`;
      },
      () => {
        this.isMicActive = false;
        if (micLabel) micLabel.textContent = 'Start Speaking';
      }
    );

    micBtn?.addEventListener('click', () => {
      if (!this.isMicActive) {
        SpeechManager.startListening();
        this.isMicActive = true;
        micLabel.textContent = 'Listening (Click to Pause)';
        micBtn.classList.add('btn-primary');
        micBtn.classList.remove('btn-secondary');
      } else {
        SpeechManager.stopListening();
        this.isMicActive = false;
        micLabel.textContent = 'Start Speaking';
        micBtn.classList.remove('btn-primary');
        micBtn.classList.add('btn-secondary');
      }
    });

    // Camera toggle
    const camBtn = document.getElementById('btn-toggle-cam');
    camBtn?.addEventListener('click', async () => {
      const video = document.getElementById('candidate-webcam');
      const placeholder = document.getElementById('webcam-placeholder');
      const camLabel = document.getElementById('cam-btn-label');

      if (!this.isCameraActive) {
        try {
          this.webcamStream = await navigator.mediaDevices.getUserMedia({ video: true });
          if (video) {
            video.srcObject = this.webcamStream;
            video.style.display = 'block';
          }
          if (placeholder) placeholder.style.display = 'none';
          this.isCameraActive = true;
          camLabel.textContent = 'Cam Off';
        } catch (e) {
          alert('Could not access camera: ' + e.message);
        }
      } else {
        if (this.webcamStream) {
          this.webcamStream.getTracks().forEach(t => t.stop());
        }
        if (video) video.style.display = 'none';
        if (placeholder) placeholder.style.display = 'flex';
        this.isCameraActive = false;
        camLabel.textContent = 'Cam On';
      }
    });

    // Exit session
    document.getElementById('btn-abandon-interview')?.addEventListener('click', () => {
      if (confirm('Are you sure you want to exit the interview studio?')) {
        this.cleanup();
        State.setView('landing');
      }
    });

    // Submit Answer & Next Question
    document.getElementById('btn-submit-answer')?.addEventListener('click', async () => {
      const submitBtn = document.getElementById('btn-submit-answer');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Analyzing Answer...';

      SpeechManager.stopListening();
      this.setAiStatus('thinking', 'AI Analyzing Answer...');

      const metrics = SpeechManager.getMetrics();
      const submission = {
        sessionId: session.id,
        questionId: currentQ.id,
        candidateAnswerText: answerInput ? answerInput.value : '',
        candidateCode: CodeEditorComponent.getCode(),
        codeLanguage: CodeEditorComponent.getLanguage(),
        fillerWordsCount: metrics.fillerWords,
        speechWpm: metrics.wpm,
        audioDurationSeconds: State.metrics.timeElapsedSeconds
      };

      try {
        const evaluation = await API.submitAnswer(submission);
        
        // Show AI critique briefly in balloon
        const balloon = document.getElementById('ai-speech-balloon');
        if (balloon) {
          balloon.innerHTML = `<strong>Feedback:</strong> ${this.escapeHtml(evaluation.interviewerRemarks)}<br/><br/><em>Score: ${evaluation.score}/100</em>`;
        }

        // Advance to next question or finalize
        State.currentQuestionIndex++;
        
        if (State.currentQuestionIndex < session.questions.length) {
          setTimeout(() => {
            SpeechManager.resetTranscript();
            State.setView('studio');
          }, 2000);
        } else {
          // Finalize session
          const finalReport = await API.finalizeInterview(session.id);
          State.latestReport = finalReport;
          this.cleanup();
          State.setView('report');
        }
      } catch (e) {
        alert('Error submitting answer: ' + e.message);
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Answer & Next Question →';
      }
    });
  },

  playAiQuestion(text, persona) {
    this.setAiStatus('speaking', 'AI Speaking...');
    AvatarComponent.updateSpeakingState('ai-avatar-container', persona, true);
    document.getElementById('ai-audio-waves')?.classList.add('active');

    SpeechManager.speak(
      text,
      persona,
      () => {},
      () => {
        this.setAiStatus('listening', 'Listening for your response...');
        AvatarComponent.updateSpeakingState('ai-avatar-container', persona, false);
        document.getElementById('ai-audio-waves')?.classList.remove('active');
      }
    );
  },

  setAiStatus(statusClass, label) {
    const dot = document.getElementById('ai-status-dot');
    const text = document.getElementById('ai-status-text');
    if (dot) {
      dot.className = `status-dot ${statusClass}`;
    }
    if (text) {
      text.textContent = label;
    }
  },

  cleanup() {
    SpeechManager.stopSpeaking();
    SpeechManager.stopListening();
    AudioVisualizer.stop();
    State.stopTimer();
    if (this.webcamStream) {
      this.webcamStream.getTracks().forEach(t => t.stop());
    }
  },

  escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
};
