import { State } from '../state.js';
import { API } from '../api.js';
import { AvatarComponent } from '../components/avatar.js';

export const SetupView = {
  selectedPersona: 'sarah',
  selectedDomain: 'backend',
  selectedSeniority: 'Senior',
  selectedDifficulty: 'Medium',

  render() {
    return `
      <div style="max-width: 960px; margin: 0 auto; display: flex; flex-direction: column; gap: 2rem; padding-bottom: 3rem;">
        
        <div style="text-align: center;">
          <div class="badge badge-primary" style="margin-bottom: 0.5rem;">INTERVIEW CONFIGURATOR</div>
          <h2>Configure Your Live AI Mock Interview</h2>
          <p>Customize the role, seniority level, AI interviewer persona, and optional resume</p>
        </div>

        <form id="setup-form" class="card" style="padding: 2.5rem; display: flex; flex-direction: column; gap: 2rem;">
          
          <!-- Candidate & Role Info -->
          <div class="grid-2">
            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
              <label style="font-size: 0.9rem; font-weight: 700;">Candidate Name</label>
              <input type="text" id="cfg-name" value="${State.setupConfig.candidateName}" placeholder="e.g. Alex Mercer" required />
            </div>

            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
              <label style="font-size: 0.9rem; font-weight: 700;">Target Role</label>
              <input type="text" id="cfg-role" value="${State.setupConfig.role}" placeholder="e.g. Senior Backend Engineer" required />
            </div>
          </div>

          <!-- Domain & Track Selection -->
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <label style="font-size: 0.9rem; font-weight: 700;">Engineering Track / Domain</label>
            <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;" id="track-selector">
              <button type="button" class="btn btn-secondary btn-sm track-btn active" data-domain="backend">⚙️ Backend & Systems</button>
              <button type="button" class="btn btn-secondary btn-sm track-btn" data-domain="frontend">🎨 Frontend & React</button>
              <button type="button" class="btn btn-secondary btn-sm track-btn" data-domain="fullstack">🌐 Full Stack</button>
              <button type="button" class="btn btn-secondary btn-sm track-btn" data-domain="system-design">🏛️ System Design</button>
              <button type="button" class="btn btn-secondary btn-sm track-btn" data-domain="devops">☁️ DevOps & Cloud</button>
              <button type="button" class="btn btn-secondary btn-sm track-btn" data-domain="data-science">🧠 AI & Data Science</button>
              <button type="button" class="btn btn-secondary btn-sm track-btn" data-domain="behavioral">🤝 Behavioral & STAR</button>
            </div>
          </div>

          <!-- Seniority & Difficulty -->
          <div class="grid-3">
            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
              <label style="font-size: 0.9rem; font-weight: 700;">Seniority Level</label>
              <select id="cfg-seniority">
                <option value="Entry / Junior">Entry / Junior (0-2 yrs)</option>
                <option value="Mid-Level">Mid-Level (2-5 yrs)</option>
                <option value="Senior" selected>Senior (5-8 yrs)</option>
                <option value="Staff / Lead">Staff / Principal (8+ yrs)</option>
              </select>
            </div>

            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
              <label style="font-size: 0.9rem; font-weight: 700;">Difficulty Tier</label>
              <select id="cfg-difficulty">
                <option value="Easy">Standard Industry</option>
                <option value="Medium" selected>Tier-1 Tech / Unicorn</option>
                <option value="Hard">FAANG Bar Raiser</option>
              </select>
            </div>

            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
              <label style="font-size: 0.9rem; font-weight: 700;">Questions Count</label>
              <select id="cfg-count">
                <option value="2">2 Questions (Fast ~10m)</option>
                <option value="3" selected>3 Questions (Standard ~15m)</option>
                <option value="4">4 Questions (Comprehensive ~20m)</option>
              </select>
            </div>
          </div>

          <!-- AI Interviewer Persona Selector -->
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <label style="font-size: 0.9rem; font-weight: 700;">Select AI Interviewer Persona</label>
            <div class="grid-4" id="persona-selector">
              <div class="persona-card selected" data-persona="sarah">
                <div class="persona-img-wrap">
                  ${AvatarComponent.renderAvatar('sarah', false)}
                </div>
                <div class="persona-name">Sarah Chen</div>
                <div class="persona-title">FAANG Bar Raiser</div>
                <div class="persona-desc">Rigorously evaluates system trade-offs and edge cases.</div>
              </div>

              <div class="persona-card" data-persona="alex">
                <div class="persona-img-wrap">
                  ${AvatarComponent.renderAvatar('alex', false)}
                </div>
                <div class="persona-name">Alex Vance</div>
                <div class="persona-title">Tech Lead Mentor</div>
                <div class="persona-desc">Supportive, constructive, focuses on clean code and design.</div>
              </div>

              <div class="persona-card" data-persona="david">
                <div class="persona-img-wrap">
                  ${AvatarComponent.renderAvatar('david', false)}
                </div>
                <div class="persona-name">David Miller</div>
                <div class="persona-title">VP of Engineering</div>
                <div class="persona-desc">Probes high-level architecture and business trade-offs.</div>
              </div>

              <div class="persona-card" data-persona="maya">
                <div class="persona-img-wrap">
                  ${AvatarComponent.renderAvatar('maya', false)}
                </div>
                <div class="persona-name">Maya Patel</div>
                <div class="persona-title">HR & Culture Lead</div>
                <div class="persona-desc">Specializes in STAR behavioral stories and leadership.</div>
              </div>
            </div>
          </div>

          <!-- Optional Resume & JD for Tailored Questions -->
          <div style="display: flex; flex-direction: column; gap: 0.75rem; border-top: 1px solid var(--border-subtle); padding-top: 1.5rem;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <label style="font-size: 0.9rem; font-weight: 700;">Paste Resume / Skills (Optional - Generates Tailored Questions)</label>
              <button type="button" class="btn btn-secondary btn-sm" id="btn-sample-resume">Fill Sample Resume</button>
            </div>
            <textarea id="cfg-resume" rows="3" placeholder="Paste key bullet points from your resume (skills, past projects, high-scale services)..."></textarea>
          </div>

          <!-- Submit Button -->
          <div style="display: flex; justify-content: flex-end; gap: 1rem; align-items: center;">
            <button type="button" class="btn btn-secondary" id="btn-cancel-setup">Cancel</button>
            <button type="submit" class="btn btn-primary btn-lg" id="btn-launch-interview">
              🎙️ Launch Live Interview Studio →
            </button>
          </div>

        </form>

      </div>
    `;
  },

  initListeners() {
    // Track selection
    document.querySelectorAll('.track-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.track-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.selectedDomain = btn.getAttribute('data-domain');
      });
    });

    // Persona selection
    document.querySelectorAll('#persona-selector .persona-card').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('#persona-selector .persona-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        this.selectedPersona = card.getAttribute('data-persona');
      });
    });

    // Sample resume autofill
    document.getElementById('btn-sample-resume')?.addEventListener('click', () => {
      const resumeArea = document.getElementById('cfg-resume');
      if (resumeArea) {
        resumeArea.value = `Senior Backend Software Engineer with 6+ years of experience in Java 21, Spring Boot, Microservices, and Distributed Systems. Designed distributed payment service handling 35k QPS with Redis caching, PostgreSQL partitioning, and Kafka event streaming. Led incident response reducing MTTR by 45%.`;
      }
    });

    document.getElementById('btn-cancel-setup')?.addEventListener('click', () => {
      State.setView('landing');
    });

    // Form submit
    document.getElementById('setup-form')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const launchBtn = document.getElementById('btn-launch-interview');
      launchBtn.disabled = true;
      launchBtn.textContent = 'Initializing Studio...';

      const config = {
        candidateName: document.getElementById('cfg-name').value || 'Alex Mercer',
        role: document.getElementById('cfg-role').value || 'Senior Software Engineer',
        seniority: document.getElementById('cfg-seniority').value,
        domain: this.selectedDomain,
        persona: this.selectedPersona,
        difficulty: document.getElementById('cfg-difficulty').value,
        questionCount: parseInt(document.getElementById('cfg-count').value, 10) || 3,
        resumeText: document.getElementById('cfg-resume').value,
        interviewType: this.selectedDomain === 'behavioral' ? 'behavioral' : (this.selectedDomain === 'system-design' ? 'system-design' : 'technical')
      };

      State.setupConfig = config;

      try {
        const session = await API.startInterview(config);
        State.activeSession = session;
        State.currentQuestionIndex = 0;
        State.setView('studio');
      } catch (err) {
        alert('Could not start interview session: ' + err.message);
        launchBtn.disabled = false;
        launchBtn.textContent = '🎙️ Launch Live Interview Studio →';
      }
    });
  }
};
