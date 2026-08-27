import { State } from './state.js';
import { LandingView } from './views/landing-view.js';
import { SetupView } from './views/setup-view.js';
import { StudioView } from './views/studio-view.js';
import { ReportView } from './views/report-view.js';
import { HistoryView } from './views/history-view.js';
import { QuestionBankView } from './views/question-bank-view.js';
import { ResumeCheckerView } from './views/resume-checker-view.js';

class App {
  constructor() {
    this.mainContainer = document.getElementById('app-view-container');
    this.initRouter();
    this.initNav();
  }

  initRouter() {
    window.addEventListener('hashchange', () => this.handleRoute());
    State.subscribe(() => this.renderCurrentView());
    this.handleRoute();
  }

  handleRoute() {
    const hash = window.location.hash.replace('#', '') || 'landing';
    State.currentView = hash;
    this.renderCurrentView();
    this.updateActiveNav(hash);
  }

  async renderCurrentView() {
    if (!this.mainContainer) return;

    let viewHtml = '';
    let currentViewObj = null;

    switch (State.currentView) {
      case 'setup':
        viewHtml = SetupView.render();
        currentViewObj = SetupView;
        this.mainContainer.className = 'main-view';
        break;
      case 'studio':
        viewHtml = StudioView.render();
        currentViewObj = StudioView;
        this.mainContainer.className = 'main-view main-view-full';
        break;
      case 'report':
        viewHtml = ReportView.render();
        currentViewObj = ReportView;
        this.mainContainer.className = 'main-view';
        break;
      case 'history':
        viewHtml = await HistoryView.render();
        currentViewObj = HistoryView;
        this.mainContainer.className = 'main-view';
        break;
      case 'questions':
        viewHtml = await QuestionBankView.render();
        currentViewObj = QuestionBankView;
        this.mainContainer.className = 'main-view';
        break;
      case 'resume-checker':
        viewHtml = ResumeCheckerView.render();
        currentViewObj = ResumeCheckerView;
        this.mainContainer.className = 'main-view';
        break;
      case 'landing':
      default:
        viewHtml = LandingView.render();
        currentViewObj = LandingView;
        this.mainContainer.className = 'main-view';
        break;
    }

    this.mainContainer.innerHTML = viewHtml;

    if (currentViewObj && typeof currentViewObj.initListeners === 'function') {
      currentViewObj.initListeners();
    }

    window.scrollTo(0, 0);
  }

  initNav() {
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        const view = e.target.getAttribute('data-view');
        if (view) {
          State.setView(view);
        }
      });
    });

    document.getElementById('nav-brand-btn')?.addEventListener('click', () => {
      State.setView('landing');
    });

    document.getElementById('btn-nav-start')?.addEventListener('click', () => {
      State.setView('setup');
    });
  }

  updateActiveNav(activeView) {
    document.querySelectorAll('.nav-link').forEach(link => {
      if (link.getAttribute('data-view') === activeView) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
}

// Bootstrap on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  new App();
});
