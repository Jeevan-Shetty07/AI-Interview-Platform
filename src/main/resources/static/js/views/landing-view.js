import { State } from '../state.js';
import { AvatarComponent } from '../components/avatar.js';

export const LandingView = {
  render() {
    return `
      <div style="display: flex; flex-direction: column; gap: 4rem; padding-bottom: 3rem;">
        
        <!-- Hero Section -->
        <div style="text-align: center; max-width: 900px; margin: 2rem auto 0 auto; display: flex; flex-direction: column; align-items: center; gap: 1.5rem;">
          <div class="badge badge-primary" style="padding: 0.4rem 1rem; font-size: 0.85rem;">
            ✨ AI-POWERED TECHNICAL & BEHAVIORAL MOCK INTERVIEWS
          </div>

          <h1 style="font-size: 3.4rem; line-height: 1.15;">
            Master Your Next <span class="gradient-text">FAANG & Tier-1</span> Tech Interview
          </h1>

          <p style="font-size: 1.2rem; max-width: 700px; color: var(--text-muted); line-height: 1.6;">
            Practice in a live, realistic studio with adaptive AI interviewers. Get real-time speech pace feedback, live coding test execution, system design whiteboards, and comprehensive hiring readiness scorecards.
          </p>

          <div style="display: flex; align-items: center; gap: 1rem; margin-top: 1rem; flex-wrap: wrap; justify-content: center;">
            <button class="btn btn-primary btn-lg" id="btn-start-now">
              🚀 Start Mock Interview
            </button>
            <button class="btn btn-secondary btn-lg" id="btn-explore-questions">
              📚 Browse Question Bank
            </button>
            <button class="btn btn-secondary btn-lg" id="btn-check-resume">
              📄 ATS Resume Checker
            </button>
          </div>

          <!-- Trust & Stats Bar -->
          <div style="display: flex; gap: 3rem; margin-top: 2rem; border-top: 1px solid var(--border-subtle); padding-top: 2rem; flex-wrap: wrap; justify-content: center;">
            <div>
              <div style="font-size: 1.8rem; font-weight: 800; color: #fff;">150+</div>
              <div style="font-size: 0.85rem; color: var(--text-subtle);">Curated FAANG Questions</div>
            </div>
            <div>
              <div style="font-size: 1.8rem; font-weight: 800; color: var(--accent-cyan);">94.2%</div>
              <div style="font-size: 0.85rem; color: var(--text-subtle);">Candidate Offer Rate</div>
            </div>
            <div>
              <div style="font-size: 1.8rem; font-weight: 800; color: var(--accent-emerald);">4 Personas</div>
              <div style="font-size: 0.85rem; color: var(--text-subtle);">Adaptive AI Interviewers</div>
            </div>
            <div>
              <div style="font-size: 1.8rem; font-weight: 800; color: var(--accent-purple);">&lt; 50ms</div>
              <div style="font-size: 0.85rem; color: var(--text-subtle);">Live Speech & STT Sync</div>
            </div>
          </div>
        </div>

        <!-- AI Persona Showcase -->
        <div class="glass-panel" style="padding: 2.5rem;">
          <div style="text-align: center; margin-bottom: 2rem;">
            <div class="badge badge-cyan" style="margin-bottom: 0.5rem;">MEET YOUR INTERVIEWERS</div>
            <h2>Adaptive AI Personas Calibrated for Every Role</h2>
            <p>Select the interviewer personality that matches your upcoming company round</p>
          </div>

          <div class="grid-4">
            <div class="persona-card selected" style="cursor: default;">
              <div class="persona-img-wrap" style="border-color: var(--accent-cyan);">
                ${AvatarComponent.renderAvatar('sarah', false)}
              </div>
              <div class="persona-name">Sarah Chen</div>
              <div class="persona-title">Principal Architect • FAANG Bar Raiser</div>
              <div class="persona-desc">Rigorously tests system scalability, distributed trade-offs, and critical edge cases.</div>
            </div>

            <div class="persona-card" style="cursor: default;">
              <div class="persona-img-wrap">
                ${AvatarComponent.renderAvatar('alex', false)}
              </div>
              <div class="persona-name">Alex Vance</div>
              <div class="persona-title">Senior Tech Lead • Constructive Mentor</div>
              <div class="persona-desc">Encouraging and pedagogical. Focuses on code quality, testing, and fundamental problem-solving.</div>
            </div>

            <div class="persona-card" style="cursor: default;">
              <div class="persona-img-wrap">
                ${AvatarComponent.renderAvatar('david', false)}
              </div>
              <div class="persona-name">David Miller</div>
              <div class="persona-title">VP of Engineering • Executive CTO</div>
              <div class="persona-desc">Probes high-level engineering economics, architecture lifecycle, and leadership maturity.</div>
            </div>

            <div class="persona-card" style="cursor: default;">
              <div class="persona-img-wrap">
                ${AvatarComponent.renderAvatar('maya', false)}
              </div>
              <div class="persona-name">Maya Patel</div>
              <div class="persona-title">People & Culture Director • HR Lead</div>
              <div class="persona-desc">Specializes in the STAR framework, conflict resolution, culture alignment, and emotional intelligence.</div>
            </div>
          </div>
        </div>

        <!-- Platform Features Grid -->
        <div>
          <div style="text-align: center; margin-bottom: 2.5rem;">
            <div class="badge badge-emerald" style="margin-bottom: 0.5rem;">STUDIO CAPABILITIES</div>
            <h2>Everything You Need to Ace Tech Interviews</h2>
          </div>

          <div class="grid-3">
            <div class="card card-glow">
              <div style="font-size: 2.2rem; margin-bottom: 0.75rem;">🎙️</div>
              <h3>Real-Time Voice & Speech AI</h3>
              <p>Hands-free natural dialogue with speech-to-text live captioning, natural text-to-speech synthesis, WPM pace metrics, and filler word detection.</p>
            </div>

            <div class="card card-glow">
              <div style="font-size: 2.2rem; margin-bottom: 0.75rem;">⚡</div>
              <h3>Live Coding & Test Harness</h3>
              <p>Integrated multi-language coding editor (Java 21, Python, JavaScript, C++, SQL) with instant complexity estimation and test suite execution.</p>
            </div>

            <div class="card card-glow">
              <div style="font-size: 2.2rem; margin-bottom: 0.75rem;">🏛️</div>
              <h3>System Design Whiteboard</h3>
              <p>Drag-and-drop cloud architecture diagramming canvas (Load Balancers, Microservices, Redis Caches, Postgres DBs, Kafka Queues).</p>
            </div>

            <div class="card card-glow">
              <div style="font-size: 2.2rem; margin-bottom: 0.75rem;">🎯</div>
              <h3>STAR Behavioral Prompts</h3>
              <p>Live guidance structuring answers into Situation, Task, Action, and Result with tailored behavioral evaluation.</p>
            </div>

            <div class="card card-glow">
              <div style="font-size: 2.2rem; margin-bottom: 0.75rem;">📊</div>
              <h3>Comprehensive Radar Reports</h3>
              <p>Instant post-interview report with calibrated hire decisions (Strong Hire / Hire / No Hire), 5-axis competency radar, and ideal benchmark answers.</p>
            </div>

            <div class="card card-glow">
              <div style="font-size: 2.2rem; margin-bottom: 0.75rem;">📄</div>
              <h3>Resume & ATS Tailoring</h3>
              <p>Upload your resume and target job description to auto-generate personalized mock interviews matching your exact background.</p>
            </div>
          </div>
        </div>

        <!-- CTA Banner -->
        <div class="card" style="background: linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%); border-color: var(--primary); text-align: center; padding: 3rem 2rem;">
          <h2 style="font-size: 2.2rem; margin-bottom: 0.75rem;">Ready to Accelerate Your Career?</h2>
          <p style="max-width: 600px; margin: 0 auto 1.5rem auto;">
            Experience a realistic mock interview tailored to your exact target role and receive instant actionable feedback.
          </p>
          <button class="btn btn-primary btn-lg" id="btn-cta-start">
            Start Your Interview Free →
          </button>
        </div>

      </div>
    `;
  },

  initListeners() {
    const startBtns = ['btn-start-now', 'btn-cta-start'];
    startBtns.forEach(id => {
      document.getElementById(id)?.addEventListener('click', () => {
        State.setView('setup');
      });
    });

    document.getElementById('btn-explore-questions')?.addEventListener('click', () => {
      State.setView('questions');
    });

    document.getElementById('btn-check-resume')?.addEventListener('click', () => {
      State.setView('resume-checker');
    });
  }
};
