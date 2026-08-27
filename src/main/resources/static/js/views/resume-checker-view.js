import { State } from '../state.js';
import { API } from '../api.js';

export const ResumeCheckerView = {
  analysisResult: null,

  render() {
    return `
      <div style="display: flex; flex-direction: column; gap: 2rem; max-width: 1100px; margin: 0 auto; padding-bottom: 3rem;">
        
        <div style="text-align: center;">
          <div class="badge badge-primary" style="margin-bottom: 0.5rem;">AI RESUME & ATS SCANNER</div>
          <h2>Optimize Your Resume & Generate Tailored Questions</h2>
          <p>Scan your resume against target job requirements to calculate ATS score and synthesize bespoke mock interviews</p>
        </div>

        <!-- Inputs Card -->
        <div class="card" style="padding: 2rem;">
          <div class="grid-2">
            
            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <label style="font-size: 0.9rem; font-weight: 700;">Your Resume Text / Skills Summary</label>
                <button class="btn btn-secondary btn-sm" id="btn-fill-resume-sample">Sample Resume</button>
              </div>
              <textarea id="rc-resume-input" rows="8" placeholder="Paste your resume content, experience bullets, and tech stack here..."></textarea>
            </div>

            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <label style="font-size: 0.9rem; font-weight: 700;">Target Job Description (Optional)</label>
                <button class="btn btn-secondary btn-sm" id="btn-fill-jd-sample">Sample JD</button>
              </div>
              <textarea id="rc-jd-input" rows="8" placeholder="Paste the job posting description and requirements to check keyword overlap..."></textarea>
            </div>

          </div>

          <div style="margin-top: 1.5rem; display: flex; justify-content: flex-end;">
            <button class="btn btn-primary btn-lg" id="btn-run-ats-scan">
              ⚡ Analyze Resume & Generate Mock Interview
            </button>
          </div>
        </div>

        <!-- Analysis Results Container -->
        <div id="ats-results-container" style="${this.analysisResult ? 'display: flex;' : 'display: none;'} flex-direction: column; gap: 1.5rem;">
          ${this.analysisResult ? this.renderResults(this.analysisResult) : ''}
        </div>

      </div>
    `;
  },

  renderResults(result) {
    return `
      <!-- Hero Score Box -->
      <div class="report-hero-card">
        <div class="score-ring-wrap">
          <div style="font-family: var(--font-display); font-size: 3rem; font-weight: 800; color: ${result.atsScore >= 75 ? 'var(--accent-emerald)' : 'var(--accent-amber)'};">
            ${result.atsScore}%
          </div>
        </div>

        <div>
          <div class="badge badge-emerald" style="margin-bottom: 0.5rem;">ATS COMPLIANCE RATING</div>
          <h3>${this.escapeHtml(result.matchedRole)} • ${this.escapeHtml(result.experienceLevel)}</h3>
          <p style="margin-top: 0.35rem; color: var(--text-main);">${this.escapeHtml(result.overallFeedback)}</p>
        </div>

        <div>
          <button class="btn btn-primary btn-lg" id="btn-launch-tailored-interview">
            🎙️ Start Tailored Mock Interview →
          </button>
        </div>
      </div>

      <!-- Skills & Keywords Breakdown -->
      <div class="grid-2">
        
        <div class="card">
          <div class="card-header">
            <h4>✓ Extracted Technical Skills</h4>
            <span class="badge badge-emerald">${result.extractedSkills.length} Found</span>
          </div>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            ${result.extractedSkills.map(s => `
              <span class="badge badge-emerald" style="font-size: 0.85rem; padding: 0.35rem 0.75rem;">${this.escapeHtml(s)}</span>
            `).join('')}
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h4>⚠️ Missing High-Impact Keywords</h4>
            <span class="badge badge-rose">${result.missingKeywords.length} Missing</span>
          </div>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            ${result.missingKeywords.map(m => `
              <span class="badge badge-rose" style="font-size: 0.85rem; padding: 0.35rem 0.75rem;">+ ${this.escapeHtml(m)}</span>
            `).join('')}
          </div>
        </div>

      </div>

      <!-- Tailored Questions Generated for this Resume -->
      <div class="card">
        <div class="card-header">
          <h4>🎯 AI Generated Questions Custom Tailored to Your Profile</h4>
        </div>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          ${(result.tailoredQuestions || []).map((q, idx) => `
            <div style="background: rgba(15, 23, 42, 0.6); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
                <strong style="color: var(--accent-cyan);">Question ${idx + 1}: ${this.escapeHtml(q.title)}</strong>
                <span class="badge badge-primary">${this.escapeHtml(q.category)}</span>
              </div>
              <p style="font-size: 0.9rem; color: var(--text-muted);">${this.escapeHtml(q.description)}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  initListeners() {
    const resumeInput = document.getElementById('rc-resume-input');
    const jdInput = document.getElementById('rc-jd-input');

    document.getElementById('btn-fill-resume-sample')?.addEventListener('click', () => {
      if (resumeInput) {
        resumeInput.value = `Alex Mercer - Senior Software Engineer
Summary: 6+ years experience in Java 21, Spring Boot, Microservices, and REST APIs. Built high-throughput payment pipelines handling 40,000 QPS with PostgreSQL, Redis caching, Docker, and Kafka. Led cloud migration to AWS.
Skills: Java, Spring Boot, Microservices, Docker, Kubernetes, PostgreSQL, Redis, Kafka, AWS, Git, CI/CD.`;
      }
    });

    document.getElementById('btn-fill-jd-sample')?.addEventListener('click', () => {
      if (jdInput) {
        jdInput.value = `Senior Backend Engineer - Distributed Systems
Requirements:
- 5+ years of experience with Java, Spring Boot, and Microservices.
- Expertise with PostgreSQL, Redis caching, and Kafka message streaming.
- Strong knowledge of Kubernetes, System Design, and zero-downtime deployments.`;
      }
    });

    document.getElementById('btn-run-ats-scan')?.addEventListener('click', async () => {
      const resumeText = resumeInput ? resumeInput.value.trim() : '';
      if (!resumeText) {
        alert('Please enter your resume or skills summary.');
        return;
      }

      const scanBtn = document.getElementById('btn-run-ats-scan');
      scanBtn.disabled = true;
      scanBtn.textContent = 'Scanning & Generating Custom Interview...';

      try {
        const jdText = jdInput ? jdInput.value.trim() : '';
        this.analysisResult = await API.analyzeResume(resumeText, jdText);
        
        const container = document.getElementById('ats-results-container');
        if (container) {
          container.innerHTML = this.renderResults(this.analysisResult);
          container.style.display = 'flex';
          
          document.getElementById('btn-launch-tailored-interview')?.addEventListener('click', () => {
            State.setupConfig.resumeText = resumeText;
            State.setupConfig.jobDescriptionText = jdText;
            State.setupConfig.role = this.analysisResult.matchedRole;
            State.setView('setup');
          });
        }
      } catch (e) {
        alert('ATS scan failed: ' + e.message);
      } finally {
        scanBtn.disabled = false;
        scanBtn.textContent = '⚡ Analyze Resume & Generate Mock Interview';
      }
    });
  },

  escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
};
