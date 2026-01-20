// 简化的 Mermaid 容器渲染脚本
console.log('🎯 Mermaid Container Script loaded');

// UTF-8 安全的 base64 解码函数
function base64ToUtf8(base64) {
  try {
    // 使用 TextDecoder 处理 UTF-8 字符
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const decoder = new TextDecoder('utf-8');
    return decoder.decode(bytes);
  } catch (error) {
    console.error('Base64 解码失败:', error);
    // 回退到原始方法
    return atob(base64);
  }
}

// 创建全屏预览模态框
function createFullscreenModal() {
  // 如果已存在则返回
  if (document.getElementById('mermaid-fullscreen-modal')) {
    return document.getElementById('mermaid-fullscreen-modal');
  }

  const modal = document.createElement('div');
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

  // 绑定事件
  let currentZoom = 1;
  const zoomStep = 0.25;
  const minZoom = 0.25;
  const maxZoom = 4;

  // 拖动相关状态
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let translateX = 0;
  let translateY = 0;

  const backdrop = modal.querySelector('.mermaid-fullscreen-backdrop');
  const closeBtn = modal.querySelector('.mermaid-close-btn');
  const zoomLevelSpan = modal.querySelector('.mermaid-zoom-level');
  const svgWrapper = modal.querySelector('.mermaid-fullscreen-svg-wrapper');
  const contentArea = modal.querySelector('.mermaid-fullscreen-content');

  function updateTransform() {
    zoomLevelSpan.textContent = Math.round(currentZoom * 100) + '%';
    svgWrapper.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentZoom})`;
  }

  function resetPosition() {
    translateX = 0;
    translateY = 0;
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    currentZoom = 1;
    resetPosition();
    updateTransform();
    isDragging = false;
  }

  backdrop.addEventListener('click', closeModal);
  closeBtn.addEventListener('click', closeModal);

  // 鼠标拖动事件
  svgWrapper.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return; // 只响应左键
    isDragging = true;
    startX = e.clientX - translateX;
    startY = e.clientY - translateY;
    svgWrapper.style.cursor = 'grabbing';
    e.preventDefault();
  });

  document.addEventListener('mousemove', (e) => {
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

  // 触摸拖动支持（移动设备）
  let touchStartX = 0;
  let touchStartY = 0;

  svgWrapper.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      isDragging = true;
      touchStartX = e.touches[0].clientX - translateX;
      touchStartY = e.touches[0].clientY - translateY;
    }
  }, { passive: true });

  svgWrapper.addEventListener('touchmove', (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    translateX = e.touches[0].clientX - touchStartX;
    translateY = e.touches[0].clientY - touchStartY;
    updateTransform();
  }, { passive: true });

  svgWrapper.addEventListener('touchend', () => {
    isDragging = false;
  });

  // 计算适配屏幕的缩放比例
  function calculateFitScale() {
    const svg = svgWrapper.querySelector('svg');
    if (!svg) return 1;

    // 先重置变换以获取原始尺寸
    const originalTransform = svgWrapper.style.transform;
    svgWrapper.style.transform = 'translate(0px, 0px) scale(1)';

    const svgRect = svg.getBoundingClientRect();
    const contentRect = contentArea.getBoundingClientRect();

    // 恢复变换
    svgWrapper.style.transform = originalTransform;

    const availableWidth = contentRect.width - 80;
    const availableHeight = contentRect.height - 80;

    const scaleX = availableWidth / svgRect.width;
    const scaleY = availableHeight / svgRect.height;
    return Math.min(scaleX, scaleY, 3); // 最大不超过 300%
  }

  modal.querySelectorAll('.mermaid-zoom-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const action = btn.dataset.action;
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

  // 键盘事件
  document.addEventListener('keydown', (e) => {
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

  // 鼠标滚轮缩放
  modal.querySelector('.mermaid-fullscreen-content').addEventListener('wheel', (e) => {
    if (!modal.classList.contains('active')) return;
    e.preventDefault();

    if (e.deltaY < 0 && currentZoom < maxZoom) {
      currentZoom = Math.min(currentZoom + zoomStep * 0.5, maxZoom);
    } else if (e.deltaY > 0 && currentZoom > minZoom) {
      currentZoom = Math.max(currentZoom - zoomStep * 0.5, minZoom);
    }
    updateTransform();
  }, { passive: false });

  // 暴露适配屏幕的方法供外部调用
  modal._fitToScreen = function() {
    currentZoom = calculateFitScale();
    resetPosition();
    updateTransform();
  };

  return modal;
}

// 打开全屏预览
function openFullscreen(svgContent) {
  const modal = createFullscreenModal();
  const svgWrapper = modal.querySelector('.mermaid-fullscreen-svg-wrapper');

  svgWrapper.innerHTML = svgContent;
  svgWrapper.style.transform = 'translate(0px, 0px) scale(1)';
  svgWrapper.style.cursor = 'grab';

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  // 等待 DOM 渲染完成后自动适配屏幕
  requestAnimationFrame(() => {
    if (modal._fitToScreen) {
      modal._fitToScreen();
    }
  });
}

// 创建全屏按钮
function createFullscreenButton() {
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

function renderMermaidContainers() {
  console.log('🚀 开始检查 mermaid 容器');

  // 查找所有新格式的mermaid容器
  const mermaidContainers = document.querySelectorAll('.mermaid-container[data-mermaid-source]');
  console.log('🔍 找到 ' + mermaidContainers.length + ' 个mermaid容器');

  if (mermaidContainers.length === 0) {
    console.log('❌ 没有找到mermaid容器');
    return;
  }

  // 动态加载mermaid库
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js';
  script.onload = function() {
    console.log('✅ Mermaid库加载完成');

    // 初始化mermaid，支持中文字符
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

    // 处理每个容器
    mermaidContainers.forEach(async function(container, index) {
      try {
        const base64Code = container.getAttribute('data-mermaid-source');
        const id = container.getAttribute('data-id') || ('mermaid-' + index);

        console.log('🎨 处理第' + (index+1) + '个容器, ID: ' + id);

        // UTF-8 安全的 base64 解码
        const mermaidCode = base64ToUtf8(base64Code);
        console.log('📝 Mermaid代码: ' + mermaidCode.slice(0, 50) + '...');

        // 渲染mermaid图表
        const result = await window.mermaid.render(id, mermaidCode);

        // 创建渲染后的容器
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

        // 添加全屏按钮
        const fullscreenBtn = createFullscreenButton();
        fullscreenBtn.addEventListener('click', () => {
          openFullscreen(result.svg);
        });
        renderedDiv.appendChild(fullscreenBtn);

        // 替换加载提示
        const loadingDiv = container.querySelector('.mermaid-loading');
        if (loadingDiv) {
          container.replaceChild(renderedDiv, loadingDiv);
        } else {
          container.appendChild(renderedDiv);
        }

        console.log('✨ 第' + (index+1) + '个图表渲染成功');

      } catch (error) {
        console.error('❌ 渲染第' + (index+1) + '个图表失败:', error);

        // 显示错误信息
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = 'color: red; padding: 1rem; border: 1px solid red; margin: 1rem 0; background: #fee;';
        errorDiv.innerHTML = '<strong>Mermaid渲染错误:</strong> ' + error.message;

        const loadingDiv = container.querySelector('.mermaid-loading');
        if (loadingDiv) {
          container.replaceChild(errorDiv, loadingDiv);
        }

        // 显示fallback代码块
        const fallback = container.querySelector('.mermaid-fallback');
        if (fallback) {
          fallback.style.display = 'block';
        }
      }
    });
  };

  script.onerror = function() {
    console.error('❌ Mermaid库加载失败');
  };

  document.head.appendChild(script);
}

// 启动渲染
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderMermaidContainers);
} else {
  renderMermaidContainers();
}