/**
 * Mermaid Container Renderer
 * Handles Mermaid diagram rendering with fullscreen preview support
 */

// Extend Window interface for mermaid
declare global {
  interface Window {
    mermaid: {
      initialize: (config: MermaidConfig) => void;
      render: (id: string, code: string) => Promise<{ svg: string }>;
    };
  }
}

interface MermaidConfig {
  startOnLoad: boolean;
  theme: string;
  securityLevel: string;
  fontFamily: string;
  flowchart?: {
    useMaxWidth: boolean;
    htmlLabels: boolean;
    curve: string;
  };
}

interface FullscreenModal extends HTMLElement {
  _fitToScreen?: () => void;
}

// UTF-8 safe base64 decode function
function base64ToUtf8(base64: string): string {
  try {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const decoder = new TextDecoder('utf-8');
    return decoder.decode(bytes);
  } catch (error) {
    console.error('Base64 decode failed:', error);
    return atob(base64);
  }
}

// Create fullscreen preview modal
function createFullscreenModal(): FullscreenModal {
  const existingModal = document.getElementById('mermaid-fullscreen-modal') as FullscreenModal;
  if (existingModal) {
    return existingModal;
  }

  const modal = document.createElement('div') as FullscreenModal;
  modal.id = 'mermaid-fullscreen-modal';
  modal.className = 'mermaid-fullscreen-modal';
  modal.innerHTML = `
    <div class="mermaid-fullscreen-backdrop"></div>
    <div class="mermaid-fullscreen-container">
      <div class="mermaid-fullscreen-header">
        <span class="mermaid-fullscreen-title">Mermaid 图表预览</span>
        <div class="mermaid-fullscreen-controls">
          <button class="mermaid-zoom-btn" data-action="zoom-out" title="缩小">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              <line x1="8" y1="11" x2="14" y2="11"/>
            </svg>
          </button>
          <span class="mermaid-zoom-level">100%</span>
          <button class="mermaid-zoom-btn" data-action="zoom-in" title="放大">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              <line x1="11" y1="8" x2="11" y2="14"/>
              <line x1="8" y1="11" x2="14" y2="11"/>
            </svg>
          </button>
          <button class="mermaid-zoom-btn" data-action="zoom-fit" title="适配屏幕">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <path d="M9 3v18M15 3v18M3 9h18M3 15h18"/>
            </svg>
          </button>
          <button class="mermaid-zoom-btn" data-action="zoom-reset" title="重置为100%">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
              <path d="M3 3v5h5"/>
            </svg>
          </button>
          <button class="mermaid-close-btn" title="关闭 (Esc)">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      </div>
      <div class="mermaid-fullscreen-content">
        <div class="mermaid-fullscreen-svg-wrapper"></div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Zoom and drag state
  let currentZoom = 1;
  const zoomStep = 0.25;
  const minZoom = 0.25;
  const maxZoom = 4;

  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let translateX = 0;
  let translateY = 0;

  const backdrop = modal.querySelector('.mermaid-fullscreen-backdrop') as HTMLElement;
  const closeBtn = modal.querySelector('.mermaid-close-btn') as HTMLElement;
  const zoomLevelSpan = modal.querySelector('.mermaid-zoom-level') as HTMLElement;
  const svgWrapper = modal.querySelector('.mermaid-fullscreen-svg-wrapper') as HTMLElement;
  const contentArea = modal.querySelector('.mermaid-fullscreen-content') as HTMLElement;

  function updateTransform(): void {
    zoomLevelSpan.textContent = Math.round(currentZoom * 100) + '%';
    svgWrapper.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentZoom})`;
  }

  function resetPosition(): void {
    translateX = 0;
    translateY = 0;
  }

  function closeModal(): void {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    currentZoom = 1;
    resetPosition();
    updateTransform();
    isDragging = false;
  }

  backdrop.addEventListener('click', closeModal);
  closeBtn.addEventListener('click', closeModal);

  // Mouse drag events
  svgWrapper.addEventListener('mousedown', (e: MouseEvent) => {
    if (e.button !== 0) return;
    isDragging = true;
    startX = e.clientX - translateX;
    startY = e.clientY - translateY;
    svgWrapper.style.cursor = 'grabbing';
    e.preventDefault();
  });

  document.addEventListener('mousemove', (e: MouseEvent) => {
    if (!isDragging || !modal.classList.contains('active')) return;
    translateX = e.clientX - startX;
    translateY = e.clientY - startY;
    updateTransform();
  });

  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      svgWrapper.style.cursor = 'grab';
    }
  });

  // Touch drag support
  let touchStartX = 0;
  let touchStartY = 0;

  svgWrapper.addEventListener('touchstart', (e: TouchEvent) => {
    if (e.touches.length === 1) {
      isDragging = true;
      touchStartX = e.touches[0].clientX - translateX;
      touchStartY = e.touches[0].clientY - translateY;
    }
  }, { passive: true });

  svgWrapper.addEventListener('touchmove', (e: TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    translateX = e.touches[0].clientX - touchStartX;
    translateY = e.touches[0].clientY - touchStartY;
    updateTransform();
  }, { passive: true });

  svgWrapper.addEventListener('touchend', () => {
    isDragging = false;
  });

  // Calculate fit-to-screen scale
  function calculateFitScale(): number {
    const svg = svgWrapper.querySelector('svg');
    if (!svg) return 1;

    const originalTransform = svgWrapper.style.transform;
    svgWrapper.style.transform = 'translate(0px, 0px) scale(1)';

    const svgRect = svg.getBoundingClientRect();
    const contentRect = contentArea.getBoundingClientRect();

    svgWrapper.style.transform = originalTransform;

    const availableWidth = contentRect.width - 80;
    const availableHeight = contentRect.height - 80;

    const scaleX = availableWidth / svgRect.width;
    const scaleY = availableHeight / svgRect.height;
    return Math.min(scaleX, scaleY, 3);
  }

  // Zoom button handlers
  modal.querySelectorAll('.mermaid-zoom-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const action = (btn as HTMLElement).dataset.action;
      if (action === 'zoom-in' && currentZoom < maxZoom) {
        currentZoom = Math.min(currentZoom + zoomStep, maxZoom);
      } else if (action === 'zoom-out' && currentZoom > minZoom) {
        currentZoom = Math.max(currentZoom - zoomStep, minZoom);
      } else if (action === 'zoom-reset') {
        currentZoom = 1;
        resetPosition();
      } else if (action === 'zoom-fit') {
        currentZoom = calculateFitScale();
        resetPosition();
      }
      updateTransform();
    });
  });

  // Keyboard events
  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (!modal.classList.contains('active')) return;

    if (e.key === 'Escape') {
      closeModal();
    } else if (e.key === '+' || e.key === '=') {
      if (currentZoom < maxZoom) {
        currentZoom = Math.min(currentZoom + zoomStep, maxZoom);
        updateTransform();
      }
    } else if (e.key === '-') {
      if (currentZoom > minZoom) {
        currentZoom = Math.max(currentZoom - zoomStep, minZoom);
        updateTransform();
      }
    } else if (e.key === '0') {
      currentZoom = 1;
      resetPosition();
      updateTransform();
    }
  });

  // Mouse wheel zoom
  contentArea.addEventListener('wheel', (e: WheelEvent) => {
    if (!modal.classList.contains('active')) return;
    e.preventDefault();

    if (e.deltaY < 0 && currentZoom < maxZoom) {
      currentZoom = Math.min(currentZoom + zoomStep * 0.5, maxZoom);
    } else if (e.deltaY > 0 && currentZoom > minZoom) {
      currentZoom = Math.max(currentZoom - zoomStep * 0.5, minZoom);
    }
    updateTransform();
  }, { passive: false });

  // Expose fit-to-screen method
  modal._fitToScreen = function(): void {
    currentZoom = calculateFitScale();
    resetPosition();
    updateTransform();
  };

  return modal;
}

// Open fullscreen preview
function openFullscreen(svgContent: string): void {
  const modal = createFullscreenModal();
  const svgWrapper = modal.querySelector('.mermaid-fullscreen-svg-wrapper') as HTMLElement;

  svgWrapper.innerHTML = svgContent;
  svgWrapper.style.transform = 'translate(0px, 0px) scale(1)';
  svgWrapper.style.cursor = 'grab';

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  requestAnimationFrame(() => {
    if (modal._fitToScreen) {
      modal._fitToScreen();
    }
  });
}

// Create fullscreen button
function createFullscreenButton(): HTMLButtonElement {
  const btn = document.createElement('button');
  btn.className = 'mermaid-fullscreen-btn';
  btn.title = '全屏预览';
  btn.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
    </svg>
  `;
  return btn;
}

// Load mermaid from CDN
function loadMermaidFromCDN(): Promise<void> {
  return new Promise((resolve, reject) => {
    // Check if already loaded
    if (window.mermaid) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load mermaid from CDN'));
    document.head.appendChild(script);
  });
}

// Render all Mermaid containers
async function renderMermaidContainers(): Promise<void> {
  const mermaidContainers = document.querySelectorAll('.mermaid-container[data-mermaid-source]');

  if (mermaidContainers.length === 0) {
    return;
  }

  try {
    // Load mermaid from CDN
    await loadMermaidFromCDN();

    // Initialize mermaid with Chinese font support
    window.mermaid.initialize({
      startOnLoad: false,
      theme: 'default',
      securityLevel: 'loose',
      fontFamily: '"Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif',
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
        curve: 'basis'
      }
    });

    // Process each container
    for (let index = 0; index < mermaidContainers.length; index++) {
      const container = mermaidContainers[index] as HTMLElement;

      try {
        const base64Code = container.getAttribute('data-mermaid-source');
        if (!base64Code) continue;

        const id = container.getAttribute('data-id') || `mermaid-${Date.now()}-${index}`;
        const mermaidCode = base64ToUtf8(base64Code);

        // Render mermaid diagram
        const result = await window.mermaid.render(id, mermaidCode);

        // Create rendered container
        const renderedDiv = document.createElement('div');
        renderedDiv.className = 'mermaid-rendered';
        renderedDiv.style.cssText = [
          'margin: 1.5rem 0',
          'padding: 1rem',
          'border: 1px solid #e2e8f0',
          'border-radius: 0.5rem',
          'background: white',
          'overflow-x: auto',
          'text-align: center',
          'position: relative'
        ].join('; ');
        renderedDiv.innerHTML = result.svg;

        // Add fullscreen button
        const fullscreenBtn = createFullscreenButton();
        fullscreenBtn.addEventListener('click', () => {
          openFullscreen(result.svg);
        });
        renderedDiv.appendChild(fullscreenBtn);

        // Replace loading placeholder
        const loadingDiv = container.querySelector('.mermaid-loading');
        if (loadingDiv) {
          container.replaceChild(renderedDiv, loadingDiv);
        } else {
          container.appendChild(renderedDiv);
        }

      } catch (error) {
        console.error(`Mermaid render error for container ${index + 1}:`, error);

        // Show error message
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = 'color: red; padding: 1rem; border: 1px solid red; margin: 1rem 0; background: #fee;';
        errorDiv.innerHTML = `<strong>Mermaid渲染错误:</strong> ${(error as Error).message}`;

        const loadingDiv = container.querySelector('.mermaid-loading');
        if (loadingDiv) {
          container.replaceChild(errorDiv, loadingDiv);
        }

        // Show fallback code block
        const fallback = container.querySelector('.mermaid-fallback') as HTMLElement;
        if (fallback) {
          fallback.style.display = 'block';
        }
      }
    }
  } catch (error) {
    console.error('Failed to load mermaid library:', error);
  }
}

/**
 * Initialize Mermaid renderer
 * Call this function on page load and Astro page transitions
 */
export function initMermaidRenderer(): void {
  renderMermaidContainers();
}
