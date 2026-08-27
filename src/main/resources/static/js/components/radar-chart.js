export const RadarChartComponent = {
  draw(canvasId, scores = { technical: 75, architecture: 70, problemSolving: 80, communication: 85, behavioral: 75 }) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    const centerX = w / 2;
    const centerY = h / 2;
    const radius = Math.min(centerX, centerY) - 40;

    const labels = [
      'Technical Depth',
      'System Architecture',
      'Problem Solving',
      'Communication',
      'STAR Alignment'
    ];

    const values = [
      scores.technical || 70,
      scores.architecture || 70,
      scores.problemSolving || 70,
      scores.communication || 70,
      scores.behavioral || 70
    ];

    const totalAxes = labels.length;
    const angleSlice = (Math.PI * 2) / totalAxes;

    ctx.clearRect(0, 0, w, h);

    // Draw background concentric polygons (20%, 40%, 60%, 80%, 100%)
    for (let level = 1; level <= 5; level++) {
      const levelRadius = (radius / 5) * level;
      ctx.beginPath();
      for (let i = 0; i < totalAxes; i++) {
        const angle = i * angleSlice - Math.PI / 2;
        const x = centerX + levelRadius * Math.cos(angle);
        const y = centerY + levelRadius * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Draw axis lines and labels
    ctx.font = '11px Inter, sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (let i = 0; i < totalAxes; i++) {
      const angle = i * angleSlice - Math.PI / 2;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.stroke();

      // Label positioning
      const labelX = centerX + (radius + 24) * Math.cos(angle);
      const labelY = centerY + (radius + 20) * Math.sin(angle);
      ctx.fillText(labels[i], labelX, labelY);
    }

    // Draw Candidate Score Polygon
    ctx.beginPath();
    for (let i = 0; i < totalAxes; i++) {
      const score = Math.max(10, Math.min(100, values[i]));
      const pointRadius = (radius * score) / 100;
      const angle = i * angleSlice - Math.PI / 2;
      const x = centerX + pointRadius * Math.cos(angle);
      const y = centerY + pointRadius * Math.sin(angle);

      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();

    // Fill gradient
    const grad = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, radius);
    grad.addColorStop(0, 'rgba(99, 102, 241, 0.6)');
    grad.addColorStop(1, 'rgba(6, 182, 212, 0.25)');
    ctx.fillStyle = grad;
    ctx.fill();

    ctx.strokeStyle = '#818cf8';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Draw points on vertices
    for (let i = 0; i < totalAxes; i++) {
      const score = Math.max(10, Math.min(100, values[i]));
      const pointRadius = (radius * score) / 100;
      const angle = i * angleSlice - Math.PI / 2;
      const x = centerX + pointRadius * Math.cos(angle);
      const y = centerY + pointRadius * Math.sin(angle);

      ctx.beginPath();
      ctx.arc(x, y, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = '#38bdf8';
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  }
};
