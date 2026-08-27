import { State } from '../state.js';
import { API } from '../api.js';

export const HistoryView = {
  historyItems: [],
  summaryStats: null,

  async render() {
    try {
      this.historyItems = await API.getHistory();
      this.summaryStats = await API.getSummaryStats();
    } catch (e) {
      console.warn('Could not load history:', e);
      this.historyItems = [];
    }

    return `
      <div style="display: flex; flex-direction: column; gap: 2rem; max-width: 1100px; margin: 0 auto; padding-bottom: 3rem;">
        
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div class="badge badge-primary" style="margin-bottom: 0.25rem;">PROGRESS TRACKER</div>
            <h2>Interview Performance & Session History</h2>
          </div>
          <button class="btn btn-primary" id="btn-hist-start-new">
            🎙️ Start New Interview
          </button>
        </div>

        <!-- Summary Metric Cards -->
        <div class="grid-3">
          <div class="card">
            <div style="font-size: 0.8rem; color: var(--text-subtle); text-transform: uppercase;">Total Mock Sessions</div>
            <div style="font-size: 2rem; font-weight: 800; color: #fff; margin-top: 0.25rem;">
              ${this.summaryStats ? this.summaryStats.totalInterviews : this.historyItems.length}
            </div>
          </div>

          <div class="card">
            <div style="font-size: 0.8rem; color: var(--text-subtle); text-transform: uppercase;">Average Readiness Score</div>
            <div style="font-size: 2rem; font-weight: 800; color: var(--accent-cyan); margin-top: 0.25rem;">
              ${this.summaryStats && this.summaryStats.averageScore ? this.summaryStats.averageScore + '%' : 'N/A'}
            </div>
          </div>

          <div class="card">
            <div style="font-size: 0.8rem; color: var(--text-subtle); text-transform: uppercase;">Strong Hire Pass Rate</div>
            <div style="font-size: 2rem; font-weight: 800; color: var(--accent-emerald); margin-top: 0.25rem;">
              ${this.summaryStats && this.summaryStats.strongHireRate ? this.summaryStats.strongHireRate : 'N/A'}
            </div>
          </div>
        </div>

        <!-- Sessions List -->
        <div class="card">
          <div class="card-header">
            <h4>Past Interview Reports</h4>
          </div>

          ${this.historyItems.length === 0 ? `
            <div style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
              <div style="font-size: 2.5rem; margin-bottom: 0.75rem;">📋</div>
              <p>No completed interviews yet. Launch your first mock session to start tracking your growth!</p>
              <button class="btn btn-primary btn-sm" id="btn-hist-empty-start" style="margin-top: 1rem;">Start Mock Interview</button>
            </div>
          ` : `
            <div style="display: flex; flex-direction: column; gap: 1rem;">
              ${this.historyItems.map(report => `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 1.25rem; background: rgba(15, 23, 42, 0.6); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); flex-wrap: wrap; gap: 1rem;">
                  <div>
                    <div style="font-weight: 700; font-size: 1.1rem; color: #fff;">${this.escapeHtml(report.role)} (${this.escapeHtml(report.seniority)})</div>
                    <div style="font-size: 0.85rem; color: var(--text-subtle); margin-top: 0.2rem;">
                      Interviewer: <strong>${this.escapeHtml(report.persona).toUpperCase()}</strong> • Date: ${this.escapeHtml(report.createdAt || 'Recent')}
                    </div>
                  </div>

                  <div style="display: flex; align-items: center; gap: 1.5rem;">
                    <div style="text-align: right;">
                      <div style="font-size: 1.35rem; font-weight: 800; color: ${report.overallScore >= 75 ? 'var(--accent-emerald)' : 'var(--accent-amber)'};">${report.overallScore}%</div>
                      <span class="badge ${this.getBadgeClass(report.hireRecommendation)}">${this.escapeHtml(report.hireRecommendation)}</span>
                    </div>

                    <button class="btn btn-secondary btn-sm btn-view-report" data-session-id="${report.sessionId}">
                      View Report →
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          `}

        </div>

      </div>
    `;
  },

  initListeners() {
    document.getElementById('btn-hist-start-new')?.addEventListener('click', () => State.setView('setup'));
    document.getElementById('btn-hist-empty-start')?.addEventListener('click', () => State.setView('setup'));

    document.querySelectorAll('.btn-view-report').forEach(btn => {
      btn.addEventListener('click', async () => {
        const sId = btn.getAttribute('data-session-id');
        try {
          const report = await API.getReport(sId);
          State.latestReport = report;
          State.setView('report');
        } catch (e) {
          alert('Could not open report: ' + e.message);
        }
      });
    });
  },

  getBadgeClass(rec) {
    const r = (rec || '').toLowerCase();
    if (r.includes('strong hire')) return 'badge-emerald';
    if (r.includes('hire')) return 'badge-cyan';
    if (r.includes('lean hire')) return 'badge-amber';
    return 'badge-rose';
  },

  escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
};
