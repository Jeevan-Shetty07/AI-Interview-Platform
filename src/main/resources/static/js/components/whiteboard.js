export const WhiteboardComponent = {
  canvas: null,
  ctx: null,
  isDrawing: false,
  mode: 'select', // 'draw', 'select'
  nodes: [],
  activeNode: null,
  offsetX: 0,
  offsetY: 0,

  render() {
    return `
      <div class="whiteboard-wrapper">
        <div class="whiteboard-toolbar">
          <button class="wb-tool-btn active" id="wb-tool-select">✋ Drag Nodes</button>
          <button class="wb-tool-btn" id="wb-tool-draw">✏️ Free Draw</button>
          <div style="width: 1px; height: 20px; background: var(--border-subtle); margin: 0 4px;"></div>
          <button class="wb-tool-btn" id="btn-add-client">📱 Client</button>
          <button class="wb-tool-btn" id="btn-add-lb">⚖️ Load Balancer</button>
          <button class="wb-tool-btn" id="btn-add-service">⚙️ Microservice</button>
          <button class="wb-tool-btn" id="btn-add-cache">⚡ Redis Cache</button>
          <button class="wb-tool-btn" id="btn-add-db">🗄️ Database</button>
          <button class="wb-tool-btn" id="btn-add-queue">📨 Kafka Queue</button>
          <div style="flex: 1;"></div>
          <button class="wb-tool-btn" id="btn-clear-wb" style="color: var(--accent-rose);">🗑️ Clear</button>
        </div>

        <div class="whiteboard-canvas-area" id="wb-area">
          <canvas id="wb-canvas" width="900" height="600"></canvas>
        </div>
      </div>
    `;
  },

  initListeners() {
    this.canvas = document.getElementById('wb-canvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');

    const area = document.getElementById('wb-area');
    this.canvas.width = area.clientWidth || 800;
    this.canvas.height = area.clientHeight || 500;

    const toolSelect = document.getElementById('wb-tool-select');
    const toolDraw = document.getElementById('wb-tool-draw');

    if (toolSelect && toolDraw) {
      toolSelect.addEventListener('click', () => {
        this.mode = 'select';
        toolSelect.classList.add('active');
        toolDraw.classList.remove('active');
      });

      toolDraw.addEventListener('click', () => {
        this.mode = 'draw';
        toolDraw.classList.add('active');
        toolSelect.classList.remove('active');
      });
    }

    // Node adder buttons
    document.getElementById('btn-add-client')?.addEventListener('click', () => this.addNode('Client Apps', 'node-lb', 40, 80));
    document.getElementById('btn-add-lb')?.addEventListener('click', () => this.addNode('API Gateway / LB', 'node-lb', 180, 80));
    document.getElementById('btn-add-service')?.addEventListener('click', () => this.addNode('Core Service Cluster', 'node-service', 340, 80));
    document.getElementById('btn-add-cache')?.addEventListener('click', () => this.addNode('Redis Distributed Cache', 'node-cache', 520, 40));
    document.getElementById('btn-add-db')?.addEventListener('click', () => this.addNode('PostgreSQL DB Primary', 'node-db', 520, 140));
    document.getElementById('btn-add-queue')?.addEventListener('click', () => this.addNode('Kafka Event Stream', 'node-queue', 340, 200));

    document.getElementById('btn-clear-wb')?.addEventListener('click', () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      document.querySelectorAll('.wb-node').forEach(n => n.remove());
      this.nodes = [];
    });

    // Canvas drawing
    this.canvas.addEventListener('mousedown', (e) => {
      if (this.mode !== 'draw') return;
      this.isDrawing = true;
      const rect = this.canvas.getBoundingClientRect();
      this.ctx.beginPath();
      this.ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
      this.ctx.strokeStyle = '#38bdf8';
      this.ctx.lineWidth = 2;
    });

    this.canvas.addEventListener('mousemove', (e) => {
      if (!this.isDrawing || this.mode !== 'draw') return;
      const rect = this.canvas.getBoundingClientRect();
      this.ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
      this.ctx.stroke();
    });

    this.canvas.addEventListener('mouseup', () => {
      this.isDrawing = false;
    });
  },

  addNode(title, typeClass, defaultX = 100, defaultY = 100) {
    const area = document.getElementById('wb-area');
    if (!area) return;

    const node = document.createElement('div');
    node.className = `wb-node ${typeClass}`;
    node.textContent = title;
    node.style.left = `${defaultX}px`;
    node.style.top = `${defaultY}px`;

    let isDragging = false;
    let startX = 0, startY = 0;

    node.addEventListener('mousedown', (e) => {
      if (this.mode !== 'select') return;
      isDragging = true;
      startX = e.clientX - node.offsetLeft;
      startY = e.clientY - node.offsetTop;
      node.style.zIndex = 100;
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      node.style.left = `${Math.max(10, e.clientX - startX)}px`;
      node.style.top = `${Math.max(10, e.clientY - startY)}px`;
    });

    window.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        node.style.zIndex = 10;
      }
    });

    area.appendChild(node);
    this.nodes.push(node);
  }
};
