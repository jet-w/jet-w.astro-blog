// Mermaid 渲染脚本
console.log('🎯 Mermaid render script loaded');

// 动态加载mermaid库并渲染图表
function loadMermaidAndRender() {
  console.log('🚀 开始检查 mermaid 代码块');
  
  // 检查是否有mermaid代码块
  const mermaidBlocks = document.querySelectorAll('pre code[data-language="mermaid"], pre code.language-mermaid');
  
  console.log(`🔍 找到 ${mermaidBlocks.length} 个mermaid代码块`);
  
  if (mermaidBlocks.length === 0) {
    console.log('❌ 没有找到mermaid代码块');
    return;
  }

  // 动态加载mermaid脚本
  console.log('📥 开始加载 Mermaid 库');
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js';
  script.onload = function() {
    console.log('✅ Mermaid库加载完成');

    // 初始化mermaid
    window.mermaid.initialize({
      startOnLoad: false,
      theme: 'default',
      securityLevel: 'loose'
    });

    console.log('⚙️ Mermaid初始化完成');

    // 处理每个mermaid代码块
    mermaidBlocks.forEach(async function(block, index) {
      try {
        const code = block.textContent.trim();
        const id = 'mermaid-diagram-' + index + '-' + Date.now();

        console.log(`🎨 处理第${index+1}个图表: ${code.substring(0, 30)}...`);

        // 使用mermaid渲染
        const result = await window.mermaid.render(id, code);

        console.log(`🎉 第${index+1}个图表SVG生成成功`);

        // 创建容器
        const container = document.createElement('div');
        container.className = 'mermaid-container';
        container.style.cssText = `
          margin: 1.5rem 0;
          padding: 1rem;
          border: 1px solid #e2e8f0;
          border-radius: 0.5rem;
          background: white;
          overflow-x: auto;
          text-align: center;
        `;
        container.innerHTML = result.svg;

        // 替换原始代码块
        const preElement = block.closest('pre');
        if (preElement && preElement.parentNode) {
          preElement.parentNode.insertBefore(container, preElement);
          preElement.remove();
          console.log(`✨ 第${index+1}个图表渲染成功并替换完成`);
        }
      } catch (error) {
        console.error(`❌ 渲染第${index+1}个图表失败:`, error);
        
        // 显示错误信息
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = 'color: red; padding: 1rem; border: 1px solid red; margin: 1rem 0; background: #fee;';
        errorDiv.innerHTML = `<strong>Mermaid渲染错误:</strong> ${error.message}`;
        
        const preElement = block.closest('pre');
        if (preElement && preElement.parentNode) {
          preElement.parentNode.insertBefore(errorDiv, preElement);
        }
      }
    });
  };

  script.onerror = function() {
    console.error('❌ Mermaid库加载失败');
  };

  document.head.appendChild(script);
}

// 等待DOM加载完成后执行
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadMermaidAndRender);
  console.log('⏳ 等待DOM加载完成...');
} else {
  console.log('📄 DOM已就绪，立即执行');
  loadMermaidAndRender();
}
