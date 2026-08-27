import { API } from '../api.js';

export const CodeEditorComponent = {
  activeLanguage: 'javascript',
  currentCode: '',

  render(starterCode = '', language = 'javascript') {
    this.activeLanguage = language;
    this.currentCode = starterCode || '// Write your solution here...\nfunction solution() {\n  \n}';

    return `
      <div class="editor-wrapper">
        <div class="editor-toolbar">
          <div class="editor-toolbar-left">
            <select id="editor-lang-select" style="padding: 0.35rem 0.75rem; font-size: 0.85rem;">
              <option value="javascript" ${language === 'javascript' ? 'selected' : ''}>JavaScript (ES6+)</option>
              <option value="java" ${language === 'java' ? 'selected' : ''}>Java 21</option>
              <option value="python" ${language === 'python' ? 'selected' : ''}>Python 3</option>
              <option value="cpp" ${language === 'cpp' ? 'selected' : ''}>C++ 20</option>
              <option value="sql" ${language === 'sql' ? 'selected' : ''}>PostgreSQL / SQL</option>
            </select>
          </div>
          <div class="editor-toolbar-right">
            <button class="btn btn-secondary btn-sm" id="btn-format-code">Format</button>
            <button class="btn btn-primary btn-sm" id="btn-run-code">
              ▶ Run & Analyze
            </button>
          </div>
        </div>

        <div class="editor-container">
          <div class="editor-line-numbers" id="editor-line-numbers">1</div>
          <textarea class="editor-textarea" id="code-textarea" spellcheck="false">${this.escapeHtml(this.currentCode)}</textarea>
        </div>

        <div class="editor-console">
          <div class="console-header">
            <span>Execution Output & Test Suites</span>
            <span id="console-status-badge" style="color: var(--text-subtle);">Ready</span>
          </div>
          <div class="console-body" id="console-output">Press "Run & Analyze" to simulate execution and complexity...</div>
        </div>
      </div>
    `;
  },

  initListeners(questionId) {
    const textarea = document.getElementById('code-textarea');
    const lineNumbers = document.getElementById('editor-line-numbers');
    const langSelect = document.getElementById('editor-lang-select');
    const runBtn = document.getElementById('btn-run-code');
    const consoleOutput = document.getElementById('console-output');
    const consoleBadge = document.getElementById('console-status-badge');

    if (textarea && lineNumbers) {
      const updateLines = () => {
        const lines = textarea.value.split('\n').length;
        lineNumbers.innerHTML = Array.from({ length: lines }, (_, i) => i + 1).join('<br>');
        this.currentCode = textarea.value;
      };

      textarea.addEventListener('input', updateLines);
      textarea.addEventListener('scroll', () => {
        lineNumbers.scrollTop = textarea.scrollTop;
      });

      // Handle Tab key
      textarea.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
          e.preventDefault();
          const start = textarea.selectionStart;
          const end = textarea.selectionEnd;
          textarea.value = textarea.value.substring(0, start) + '  ' + textarea.value.substring(end);
          textarea.selectionStart = textarea.selectionEnd = start + 2;
          updateLines();
        }
      });

      updateLines();
    }

    if (langSelect) {
      langSelect.addEventListener('change', (e) => {
        this.activeLanguage = e.target.value;
      });
    }

    if (runBtn) {
      runBtn.addEventListener('click', async () => {
        if (!textarea) return;
        consoleBadge.textContent = 'Executing...';
        consoleBadge.style.color = 'var(--accent-amber)';
        consoleOutput.textContent = 'Compiling and executing test harness...';

        try {
          const res = await API.executeCode(textarea.value, this.activeLanguage, questionId);
          consoleBadge.textContent = res.status;
          consoleBadge.style.color = res.status === 'SUCCESS' ? 'var(--accent-emerald)' : 'var(--accent-rose)';

          let resultText = res.output + '\n\n';
          if (res.testResults && res.testResults.length) {
            resultText += '=== Test Results ===\n' + res.testResults.join('\n') + '\n\n';
          }
          if (res.reviewSuggestions && res.reviewSuggestions.length) {
            resultText += '=== AI Code Review ===\n' + res.reviewSuggestions.map(s => '• ' + s).join('\n');
          }
          consoleOutput.textContent = resultText;
        } catch (e) {
          consoleBadge.textContent = 'ERROR';
          consoleBadge.style.color = 'var(--accent-rose)';
          consoleOutput.textContent = 'Failed to execute code: ' + e.message;
        }
      });
    }
  },

  getCode() {
    const textarea = document.getElementById('code-textarea');
    return textarea ? textarea.value : this.currentCode;
  },

  getLanguage() {
    return this.activeLanguage;
  },

  escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
};
