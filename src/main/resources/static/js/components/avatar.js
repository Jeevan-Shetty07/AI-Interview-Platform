/**
 * Dynamic SVG AI Interviewer Avatar Component
 */
export const AvatarComponent = {
  renderAvatar(personaKey = 'sarah', isSpeaking = false) {
    const p = personaKey.toLowerCase();
    
    // Hair, skin and accent colors per persona
    let skinColor = '#fed7aa';
    let hairColor = '#1e1b4b';
    let suitColor = '#312e81';
    let accentGlow = '#6366f1';
    let glasses = false;

    if (p === 'sarah') { // FAANG Bar Raiser
      skinColor = '#fcd34d';
      hairColor = '#0f172a';
      suitColor = '#0f172a';
      accentGlow = '#06b6d4';
      glasses = true;
    } else if (p === 'david') { // VP / CTO
      skinColor = '#fed7aa';
      hairColor = '#64748b';
      suitColor = '#1e293b';
      accentGlow = '#f59e0b';
    } else if (p === 'maya') { // HR / Behavioral
      skinColor = '#fbcfe8';
      hairColor = '#831843';
      suitColor = '#4c0519';
      accentGlow = '#f43f5e';
    }

    const mouthAnim = isSpeaking ? `
      <animate attributeName="ry" values="2; 8; 3; 10; 2" dur="0.35s" repeatCount="indefinite" />
      <animate attributeName="rx" values="8; 11; 7; 12; 8" dur="0.35s" repeatCount="indefinite" />
    ` : '';

    const eyeBlinkAnim = `
      <animate attributeName="ry" values="3.5; 3.5; 0.2; 3.5" keyTimes="0; 0.85; 0.9; 1" dur="4s" repeatCount="indefinite" />
    `;

    return `
      <svg class="persona-avatar-svg" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="glow-${p}" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="${accentGlow}" stop-opacity="0.3"/>
            <stop offset="100%" stop-color="${accentGlow}" stop-opacity="0"/>
          </radialGradient>
          <filter id="shadow-${p}">
            <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="rgba(0,0,0,0.5)"/>
          </filter>
        </defs>

        <!-- Ambient Halo -->
        <circle cx="80" cy="80" r="72" fill="url(#glow-${p})" />

        <!-- Base Head & Neck -->
        <path d="M 68 105 L 68 125 L 92 125 L 92 105 Z" fill="${skinColor}" />
        <path d="M 35 155 C 35 125, 125 125, 125 155 Z" fill="${suitColor}" filter="url(#shadow-${p})" />
        
        <!-- Shirt Collar -->
        <polygon points="80,135 65,125 95,125" fill="#f8fafc" />
        <polygon points="80,142 74,125 86,125" fill="${accentGlow}" />

        <!-- Face Base -->
        <ellipse cx="80" cy="80" rx="34" ry="40" fill="${skinColor}" filter="url(#shadow-${p})" />

        <!-- Hair Back/Base -->
        <path d="M 44 80 C 44 42, 116 42, 116 80 C 116 88, 110 50, 80 50 C 50 50, 44 88, 44 80 Z" fill="${hairColor}" />

        <!-- Eyes -->
        <ellipse cx="68" cy="78" rx="3.5" ry="3.5" fill="#0f172a">
          ${eyeBlinkAnim}
        </ellipse>
        <ellipse cx="92" cy="78" rx="3.5" ry="3.5" fill="#0f172a">
          ${eyeBlinkAnim}
        </ellipse>
        
        <!-- Eyebrows -->
        <path d="M 62 70 Q 68 68 74 71" stroke="${hairColor}" stroke-width="2.5" fill="none" stroke-linecap="round" />
        <path d="M 86 71 Q 92 68 98 70" stroke="${hairColor}" stroke-width="2.5" fill="none" stroke-linecap="round" />

        ${glasses ? `
          <!-- Glasses -->
          <rect x="60" y="71" width="16" height="13" rx="3" fill="none" stroke="#e2e8f0" stroke-width="2" />
          <rect x="84" y="71" width="16" height="13" rx="3" fill="none" stroke="#e2e8f0" stroke-width="2" />
          <line x1="76" y1="77" x2="84" y2="77" stroke="#e2e8f0" stroke-width="2" />
        ` : ''}

        <!-- Nose -->
        <path d="M 80 81 L 78 88 L 83 88" stroke="rgba(0,0,0,0.2)" stroke-width="1.8" fill="none" stroke-linecap="round" />

        <!-- Mouth with speaking animation -->
        <ellipse id="avatar-mouth" cx="80" cy="100" rx="8" ry="2.5" fill="#be123c">
          ${mouthAnim}
        </ellipse>
      </svg>
    `;
  },

  updateSpeakingState(containerId, personaKey, isSpeaking) {
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = this.renderAvatar(personaKey, isSpeaking);
    }
  }
};
