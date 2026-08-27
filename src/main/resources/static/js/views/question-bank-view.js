import { State } from '../state.js';
import { API } from '../api.js';

export const QuestionBankView = {
  questions: [],
  selectedDomain: '',
  selectedDifficulty: '',
  searchTerm: '',

  async render() {
    try {
      this.questions = await API.getQuestions(this.selectedDomain, this.selectedDifficulty, this.searchTerm);
    } catch (e) {
      console.warn('Could not fetch questions', e);
      this.questions = [];
    }

    return `
      <div style="display: flex; flex-direction: column; gap: 2rem; max-width: 1200px; margin: 0 auto; padding-bottom: 3rem;">
        
        <div style="text-align: center;">
          <div class="badge badge-primary" style="margin-bottom: 0.5rem;">FAANG & TIER-1 TECH QUESTION BANK</div>
          <h2>Curated Technical & Behavioral Interview Library</h2>
          <p>Explore 150+ real-world interview problems with model solutions, hints, and complexity analysis</p>
        </div>

        <!-- Filter & Search Controls -->
        <div class="card" style="padding: 1.25rem;">
          <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center; justify-content: space-between;">
            
            <div style="display: flex; gap: 0.75rem; flex-wrap: wrap; flex: 1;">
              <input type="text" id="qb-search-input" placeholder="🔍 Search questions, algorithms, keywords, companies..." value="${this.escapeHtml(this.searchTerm)}" style="min-width: 280px; flex: 1;" />
              
              <select id="qb-domain-select" style="min-width: 180px;">
                <option value="">All Engineering Domains</option>
                <option value="backend" ${this.selectedDomain === 'backend' ? 'selected' : ''}>⚙️ Backend & Systems</option>
                <option value="frontend" ${this.selectedDomain === 'frontend' ? 'selected' : ''}>🎨 Frontend & React</option>
                <option value="system-design" ${this.selectedDomain === 'system-design' ? 'selected' : ''}>🏛️ System Design</option>
                <option value="devops" ${this.selectedDomain === 'devops' ? 'selected' : ''}>☁️ DevOps & Cloud</option>
                <option value="data-science" ${this.selectedDomain === 'data-science' ? 'selected' : ''}>🧠 AI & Data Science</option>
                <option value="behavioral" ${this.selectedDomain === 'behavioral' ? 'selected' : ''}>🤝 Behavioral & STAR</option>
              </select>

              <select id="qb-difficulty-select" style="min-width: 140px;">
                <option value="">All Levels</option>
                <option value="Entry" ${this.selectedDifficulty === 'Entry' ? 'selected' : ''}>Entry / Junior</option>
                <option value="Mid-Level" ${this.selectedDifficulty === 'Mid-Level' ? 'selected' : ''}>Mid-Level</option>
                <option value="Senior" ${this.selectedDifficulty === 'Senior' ? 'selected' : ''}>Senior</option>
                <option value="Staff/Lead" ${this.selectedDifficulty === 'Staff/Lead' ? 'selected' : ''}>Staff / Lead</option>
              </select>
            </div>

            <div>
              <span class="badge badge-cyan" id="qb-results-count">${this.questions.length} Questions</span>
            </div>

          </div>
        </div>

        <!-- Question Cards Grid -->
        <div class="grid-2">
          ${this.questions.map(q => `
            <div class="card card-glow" style="display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem; margin-bottom: 0.5rem;">
                  <span class="badge badge-primary">${this.escapeHtml(q.domain)}</span>
                  <span class="badge badge-cyan">${this.escapeHtml(q.difficulty)}</span>
                </div>

                <h4 style="margin-bottom: 0.5rem; color: #fff;">${this.escapeHtml(q.title)}</h4>
                <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 1rem;">
                  ${this.escapeHtml(q.description)}
                </p>

                <!-- Company Tags -->
                <div style="display: flex; gap: 0.4rem; flex-wrap: wrap; margin-bottom: 0.75rem;">
                  ${(q.companyTags || []).map(c => `
                    <span style="font-size: 0.75rem; padding: 2px 8px; background: rgba(255, 255, 255, 0.06); border-radius: 4px; color: var(--text-muted);">
                      🏢 ${this.escapeHtml(c)}
                    </span>
                  `).join('')}
                </div>

                <!-- Key Concepts -->
                <div style="display: flex; gap: 0.35rem; flex-wrap: wrap; margin-bottom: 1.25rem;">
                  ${(q.keyConcepts || []).map(k => `
                    <span style="font-size: 0.75rem; padding: 2px 6px; background: rgba(6, 182, 212, 0.1); border-radius: 4px; color: var(--accent-cyan);">
                      #${this.escapeHtml(k)}
                    </span>
                  `).join('')}
                </div>
              </div>

              <!-- Action Buttons -->
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-subtle); padding-top: 0.75rem;">
                <button class="btn btn-secondary btn-sm btn-view-solution" data-qid="${q.id}">
                  💡 View Benchmark Solution
                </button>
                <button class="btn btn-primary btn-sm btn-practice-q" data-qid="${q.id}" data-domain="${q.domain}" data-role="${q.title}">
                  🎙️ Practice in Studio
                </button>
              </div>
            </div>
          `).join('')}
        </div>

      </div>

      <!-- Solution Modal -->
      <div id="solution-modal" style="display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(8px); z-index: 1000; align-items: center; justify-content: center; padding: 1.5rem;">
        <div class="card" style="max-width: 750px; width: 100%; max-height: 85vh; overflow-y: auto; background: var(--bg-secondary); border-color: var(--primary);">
          <div class="card-header">
            <h3 id="modal-sol-title">Question Benchmark Solution</h3>
            <button class="btn-icon" id="btn-close-modal">✕</button>
          </div>
          <div id="modal-sol-body" style="display: flex; flex-direction: column; gap: 1rem;">
            <!-- Dynamic Content -->
          </div>
        </div>
      </div>
    `;
  },

  initListeners() {
    const searchInput = document.getElementById('qb-search-input');
    const domainSelect = document.getElementById('qb-domain-select');
    const diffSelect = document.getElementById('qb-difficulty-select');

    let debounceTimer;
    searchInput?.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        this.searchTerm = e.target.value;
        State.setView('questions');
      }, 350);
    });

    domainSelect?.addEventListener('change', (e) => {
      this.selectedDomain = e.target.value;
      State.setView('questions');
    });

    diffSelect?.addEventListener('change', (e) => {
      this.selectedDifficulty = e.target.value;
      State.setView('questions');
    });

    // View Solution Modal
    document.querySelectorAll('.btn-view-solution').forEach(btn => {
      btn.addEventListener('click', () => {
        const qid = btn.getAttribute('data-qid');
        const q = this.questions.find(item => item.id === qid);
        if (!q) return;

        const modal = document.getElementById('solution-modal');
        const titleEl = document.getElementById('modal-sol-title');
        const bodyEl = document.getElementById('modal-sol-body');

        if (titleEl) titleEl.textContent = q.title;
        if (bodyEl) {
          bodyEl.innerHTML = `
            <div class="feedback-pill-box feedback-ideal">
              <strong>Ideal Architecture / Answer Rationale:</strong>
              <p style="margin-top: 0.5rem; line-height: 1.5; color: #e2e8f0;">${this.escapeHtml(q.idealAnswerSummary)}</p>
            </div>
            ${q.expectedComplexity ? `
              <div>
                <strong>Expected Complexity:</strong> <span class="badge badge-cyan">${this.escapeHtml(q.expectedComplexity)}</span>
              </div>
            ` : ''}
            ${q.starterCode ? `
              <div>
                <strong>Starter Boilerplate / Reference Code:</strong>
                <pre style="background: #090d16; padding: 1rem; border-radius: 8px; font-family: var(--font-mono); font-size: 0.85rem; color: #38bdf8; overflow-x: auto; margin-top: 0.5rem;"><code>${this.escapeHtml(q.starterCode)}</code></pre>
              </div>
            ` : ''}
          `;
        }

        if (modal) {
          modal.style.display = 'flex';
        }
      });
    });

    document.getElementById('btn-close-modal')?.addEventListener('click', () => {
      const modal = document.getElementById('solution-modal');
      if (modal) modal.style.display = 'none';
    });

    // Practice in studio
    document.querySelectorAll('.btn-practice-q').forEach(btn => {
      btn.addEventListener('click', async () => {
        const qid = btn.getAttribute('data-qid');
        const q = this.questions.find(item => item.id === qid);
        if (!q) return;

        const config = {
          candidateName: 'Candidate',
          role: q.title,
          seniority: q.difficulty,
          domain: q.domain,
          persona: 'sarah',
          difficulty: q.difficulty,
          questionCount: 1
        };

        try {
          const session = await API.startInterview(config);
          session.questions = [q]; // Set specifically to this question
          State.activeSession = session;
          State.currentQuestionIndex = 0;
          State.setView('studio');
        } catch (e) {
          alert('Could not start practice session: ' + e.message);
        }
      });
    });
  },

  escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
};
