import { State } from '../state.js';
import { RadarChartComponent } from '../components/radar-chart.js';

export const ReportView = {
  render() {
    const report = State.latestReport;
    if (!report) {
      return `
        <div style="text-align: center; padding: 4rem;">
          <h2>No interview report available</h2>
          <button class="btn btn-primary" id="btn-report-to-setup" style="margin-top: 1rem;">Take an Interview</button>
        </div>
      `;
    }

    const verdictClass = this.getVerdictClass(report.hireRecommendation);
    const circumference = 2 * Math.PI * 52;
    const strokeOffset = circumference - (circumference * report.overallScore) / 100;

    return `
      <div class="report-container">
        
        <!-- Action Header -->
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div class="badge badge-emerald" style="margin-bottom: 0.25rem;">EVALUATION COMPLETE</div>
            <h2>Interview Performance & Hiring Assessment</h2>
          </div>
          <div style="display: flex; gap: 0.75rem;">
            <button class="btn btn-secondary" id="btn-print-report">🖨️ Print / Save PDF</button>
            <button class="btn btn-primary" id="btn-new-interview">🔄 Start New Interview</button>
          </div>
        </div>

        <!-- Hero Verdict Card -->
        <div class="report-hero-card">
          
          <!-- Score Ring -->
          <div class="score-ring-wrap">
            <svg class="score-ring-svg" viewBox="0 0 120 120">
              <circle class="score-ring-bg" cx="60" cy="60" r="52" />
              <circle class="score-ring-bar" cx="60" cy="60" r="52" 
                stroke-dasharray="${circumference}" 
                stroke-dashoffset="${strokeOffset}" />
            </svg>
            <div class="score-ring-text">${report.overallScore}</div>
            <div class="score-ring-label">SCORE</div>
          </div>

          <!-- Verdict Details -->
          <div>
            <div class="verdict-badge-large ${verdictClass}">
              ★ ${this.escapeHtml(report.hireRecommendation)}
            </div>
            <h3 style="margin-bottom: 0.5rem;">${this.escapeHtml(report.candidateName)} • ${this.escapeHtml(report.role)}</h3>
            <p style="font-size: 1rem; color: var(--text-main); line-height: 1.5;">
              ${this.escapeHtml(report.verdictSummary)}
            </p>
          </div>

          <!-- Candidate Metadata -->
          <div style="background: rgba(15, 23, 42, 0.6); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); display: flex; flex-direction: column; gap: 0.5rem; min-width: 200px;">
            <div style="font-size: 0.8rem; color: var(--text-subtle);">SESSION METRICS</div>
            <div><strong>Seniority:</strong> ${this.escapeHtml(report.seniority)}</div>
            <div><strong>Interviewer:</strong> ${this.escapeHtml(report.persona).toUpperCase()}</div>
            <div><strong>Avg Pace:</strong> ${report.paceWpmAvg} WPM</div>
            <div><strong>Total Fillers:</strong> ${report.fillerWordsTotal} words</div>
          </div>

        </div>

        <!-- Radar & Metric Breakdown Grid -->
        <div class="radar-section-grid">
          
          <!-- Radar Chart Card -->
          <div class="card" style="display: flex; flex-direction: column; align-items: center;">
            <div class="card-header" style="width: 100%;">
              <h4>Competency Radar</h4>
              <span class="badge badge-primary">5 Core Dimensions</span>
            </div>
            <div class="radar-canvas-container">
              <canvas id="competency-radar-canvas" width="360" height="300"></canvas>
            </div>
          </div>

          <!-- Linear Score Bars -->
          <div class="card">
            <div class="card-header">
              <h4>Detailed Competency Breakdown</h4>
            </div>

            <div class="metric-row">
              <div class="metric-header">
                <span>Technical Accuracy & Depth</span>
                <span style="color: var(--primary-light);">${report.technicalDepthScore}%</span>
              </div>
              <div class="metric-bar-bg">
                <div class="metric-bar-fill" style="width: ${report.technicalDepthScore}%; background: linear-gradient(90deg, #6366f1, #818cf8);"></div>
              </div>
            </div>

            <div class="metric-row">
              <div class="metric-header">
                <span>System Architecture & Scale</span>
                <span style="color: var(--accent-cyan);">${report.systemArchitectureScore}%</span>
              </div>
              <div class="metric-bar-bg">
                <div class="metric-bar-fill" style="width: ${report.systemArchitectureScore}%; background: linear-gradient(90deg, #06b6d4, #38bdf8);"></div>
              </div>
            </div>

            <div class="metric-row">
              <div class="metric-header">
                <span>Problem Solving & Algorithms</span>
                <span style="color: var(--accent-emerald);">${report.problemSolvingScore}%</span>
              </div>
              <div class="metric-bar-bg">
                <div class="metric-bar-fill" style="width: ${report.problemSolvingScore}%; background: linear-gradient(90deg, #10b981, #34d399);"></div>
              </div>
            </div>

            <div class="metric-row">
              <div class="metric-header">
                <span>Verbal Communication & Structure</span>
                <span style="color: var(--accent-amber);">${report.communicationScore}%</span>
              </div>
              <div class="metric-bar-bg">
                <div class="metric-bar-fill" style="width: ${report.communicationScore}%; background: linear-gradient(90deg, #f59e0b, #fbbf24);"></div>
              </div>
            </div>

            <div class="metric-row">
              <div class="metric-header">
                <span>STAR Behavioral Alignment</span>
                <span style="color: var(--accent-purple);">${report.behavioralStarScore}%</span>
              </div>
              <div class="metric-bar-bg">
                <div class="metric-bar-fill" style="width: ${report.behavioralStarScore}%; background: linear-gradient(90deg, #a855f7, #c084fc);"></div>
              </div>
            </div>

          </div>

        </div>

        <!-- Question-by-Question Deep Dive -->
        <div>
          <div class="card-header">
            <h3>Question-by-Question AI Critique</h3>
            <span style="font-size: 0.9rem; color: var(--text-muted);">${(report.questionEvaluations || []).length} Evaluated Questions</span>
          </div>

          <div id="question-accordions">
            ${(report.questionEvaluations || []).map((evalItem, idx) => `
              <div class="question-accordion-item">
                <div class="accordion-header" data-index="${idx}">
                  <div style="display: flex; align-items: center; gap: 0.75rem;">
                    <span class="badge badge-primary">Q${idx + 1}</span>
                    <span style="font-weight: 700;">${this.escapeHtml(evalItem.questionTitle)}</span>
                  </div>
                  <div style="display: flex; align-items: center; gap: 1rem;">
                    <span style="font-weight: 800; color: ${evalItem.score >= 70 ? 'var(--accent-emerald)' : 'var(--accent-rose)'};">${evalItem.score}/100</span>
                    <span>▼</span>
                  </div>
                </div>

                <div class="accordion-body">
                  
                  <!-- Candidate Answer -->
                  <div>
                    <strong style="color: var(--text-subtle); font-size: 0.8rem; text-transform: uppercase;">Candidate Answer / Transcript:</strong>
                    <p style="background: rgba(0,0,0,0.3); padding: 0.85rem; border-radius: var(--radius-sm); margin-top: 0.35rem; font-style: italic; color: #cbd5e1;">
                      "${this.escapeHtml(evalItem.candidateAnswer || 'No verbal answer recorded.')}"
                    </p>
                  </div>

                  ${evalItem.candidateCode ? `
                    <div>
                      <strong style="color: var(--text-subtle); font-size: 0.8rem; text-transform: uppercase;">Submitted Code:</strong>
                      <pre style="background: #090d16; padding: 0.85rem; border-radius: var(--radius-sm); margin-top: 0.35rem; font-family: var(--font-mono); font-size: 0.85rem; color: #38bdf8; overflow-x: auto;"><code>${this.escapeHtml(evalItem.candidateCode)}</code></pre>
                    </div>
                  ` : ''}

                  <!-- Key Strengths -->
                  <div class="feedback-pill-box feedback-strength">
                    <strong style="color: var(--accent-emerald);">✓ Key Strengths:</strong>
                    <ul style="padding-left: 1.25rem; margin-top: 0.35rem; color: #e2e8f0;">
                      ${(evalItem.strengths || []).map(s => `<li>${this.escapeHtml(s)}</li>`).join('')}
                    </ul>
                  </div>

                  <!-- Areas for Improvement -->
                  <div class="feedback-pill-box feedback-gap">
                    <strong style="color: var(--accent-rose);">⚠️ Areas for Improvement:</strong>
                    <ul style="padding-left: 1.25rem; margin-top: 0.35rem; color: #e2e8f0;">
                      ${(evalItem.areasForImprovement || []).map(a => `<li>${this.escapeHtml(a)}</li>`).join('')}
                    </ul>
                  </div>

                  <!-- Benchmark Ideal Answer -->
                  <div class="feedback-pill-box feedback-ideal">
                    <strong style="color: var(--primary-light);">💡 Ideal Benchmark Model Answer:</strong>
                    <p style="margin-top: 0.35rem; color: #e2e8f0; line-height: 1.5;">
                      ${this.escapeHtml(evalItem.idealAnswer)}
                    </p>
                  </div>

                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 4-Week Actionable Study Plan -->
        <div class="card" style="background: linear-gradient(135deg, rgba(30, 41, 59, 0.4) 0%, rgba(15, 23, 42, 0.8) 100%);">
          <div class="card-header">
            <h4>📅 4-Week Personalized Study & Interview Preparation Plan</h4>
          </div>
          <div class="grid-2">
            ${(report.actionableStudyPlan || []).map((step, i) => `
              <div style="background: rgba(15, 23, 42, 0.6); padding: 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle); display: flex; gap: 0.75rem;">
                <div style="font-size: 1.3rem;">📌</div>
                <div>
                  <div style="font-weight: 700; color: #fff; margin-bottom: 0.25rem;">Milestone ${i + 1}</div>
                  <div style="font-size: 0.9rem; color: var(--text-muted);">${this.escapeHtml(step)}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

      </div>
    `;
  },

  initListeners() {
    const report = State.latestReport;
    if (!report) {
      document.getElementById('btn-report-to-setup')?.addEventListener('click', () => State.setView('setup'));
      return;
    }

    // Draw Radar Chart
    setTimeout(() => {
      RadarChartComponent.draw('competency-radar-canvas', {
        technical: report.technicalDepthScore,
        architecture: report.systemArchitectureScore,
        problemSolving: report.problemSolvingScore,
        communication: report.communicationScore,
        behavioral: report.behavioralStarScore
      });
    }, 100);

    // Print Report
    document.getElementById('btn-print-report')?.addEventListener('click', () => {
      window.print();
    });

    // Start New Interview
    document.getElementById('btn-new-interview')?.addEventListener('click', () => {
      State.setView('setup');
    });

    // Accordion Toggle
    document.querySelectorAll('.accordion-header').forEach(header => {
      header.addEventListener('click', () => {
        const body = header.nextElementSibling;
        if (body.style.display === 'none') {
          body.style.display = 'flex';
          header.querySelector('span:last-child').textContent = '▲';
        } else {
          body.style.display = 'none';
          header.querySelector('span:last-child').textContent = '▼';
        }
      });
    });
  },

  getVerdictClass(recommendation) {
    const rec = (recommendation || '').toLowerCase();
    if (rec.includes('strong hire')) return 'verdict-strong-hire';
    if (rec.includes('lean hire')) return 'verdict-lean-hire';
    if (rec.includes('hire')) return 'verdict-hire';
    return 'verdict-no-hire';
  },

  escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
};
