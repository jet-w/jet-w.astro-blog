import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';

mermaid.initialize({
  startOnLoad: false,
  theme: 'default',
  securityLevel: 'loose',
  fontFamily: 'ui-sans-serif, system-ui, sans-serif'
});

async function initMermaid() {
  console.log('🎯 Mermaid init: 开始查找mermaid代码块');

  // Handle plugin-generated mermaid-wrapper elements (base64 encoded)
  const wrappers = document.querySelectorAll('.mermaid-wrapper');
  console.log(`🎯 找到 ${wrappers.length} 个 mermaid-wrapper`);

  for (const wrapper of wrappers) {
    try {
      const base64Data = wrapper.getAttribute('data-mermaid');
      const mermaidCode = atob(base64Data);
      const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
      const { svg } = await mermaid.render(id, mermaidCode);
      wrapper.innerHTML = `<div class="mermaid-container">${svg}</div>`;
      console.log('✅ 成功渲染mermaid-wrapper图表');
    } catch (error) {
      console.error('❌ Mermaid渲染错误:', error);
    }
  }

  // Handle div.mermaid-code elements (plain text content)
  const mermaidDivs = document.querySelectorAll('div.mermaid-code');
  console.log(`🎯 找到 ${mermaidDivs.length} 个 mermaid-code divs`);

  for (let i = 0; i < mermaidDivs.length; i++) {
    const mermaidDiv = mermaidDivs[i];
    try {
      const mermaidCode = mermaidDiv.textContent.trim();
      console.log(`🎯 处理第${i+1}个mermaid-code div:`, mermaidCode.substring(0, 50));

      const id = `mermaid-div-${i}`;
      const { svg } = await mermaid.render(id, mermaidCode);

      // Create new container with proper styling
      const container = document.createElement('div');
      container.className = 'mermaid-container my-6 p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700';
      container.innerHTML = svg;

      // Replace the mermaid-code div
      mermaidDiv.parentNode.replaceChild(container, mermaidDiv);
      console.log('✅ 成功替换并渲染mermaid div图表');
    } catch (error) {
      console.error('❌ Mermaid div渲染错误:', error);
    }
  }

  // Handle text and plain code blocks that contain mermaid content (marked with %%mermaid)
  const textBlocks = document.querySelectorAll('pre code[data-language="text"], pre code.language-text, pre code:not([data-language]):not([class*="language-"])');
  console.log(`🎯 找到 ${textBlocks.length} 个 text/plain代码块`);

  for (let i = 0; i < textBlocks.length; i++) {
    const codeBlock = textBlocks[i];
    const content = codeBlock.textContent.trim();

    if (content.startsWith('%%mermaid')) {
      try {
        // Remove the %%mermaid marker and get the actual mermaid code
        const mermaidCode = content.substring('%%mermaid'.length).trim();
        console.log(`🎯 处理第${i+1}个mermaid文本块:`, mermaidCode.substring(0, 50));

        const id = `mermaid-text-${i}`;
        const { svg } = await mermaid.render(id, mermaidCode);

        const container = document.createElement('div');
        container.className = 'mermaid-container my-6 p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700';
        container.innerHTML = svg;

        const preElement = codeBlock.closest('pre');
        if (preElement) {
          preElement.parentNode.replaceChild(container, preElement);
          console.log('✅ 成功替换并渲染mermaid文本图表');
        }
      } catch (error) {
        console.error('❌ Mermaid文本渲染错误:', error);
      }
    }
  }

  // Handle regular mermaid code blocks directly (including auto-detected ones)
  const codeBlocks = document.querySelectorAll('pre code[data-language="mermaid"], pre code.language-mermaid, code[class*="language-mermaid"]');
  console.log(`🎯 找到 ${codeBlocks.length} 个 mermaid代码块`);

  for (let i = 0; i < codeBlocks.length; i++) {
    const codeBlock = codeBlocks[i];
    try {
      let mermaidCode = codeBlock.textContent.trim();
      console.log(`🎯 处理第${i+1}个代码块:`, mermaidCode.substring(0, 50));

      // Check if this was originally a %%mermaid block and remove the marker
      if (mermaidCode.startsWith('%%mermaid')) {
        mermaidCode = mermaidCode.substring('%%mermaid'.length).trim();
        console.log('🎯 检测到%%mermaid标记，移除后的代码:', mermaidCode.substring(0, 50));
      }

      const id = `mermaid-direct-${i}`;
      const { svg } = await mermaid.render(id, mermaidCode);

      const container = document.createElement('div');
      container.className = 'mermaid-container my-6 p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700';
      container.innerHTML = svg;

      const preElement = codeBlock.closest('pre');
      if (preElement) {
        preElement.parentNode.replaceChild(container, preElement);
        console.log('✅ 成功替换并渲染mermaid图表');
      }
    } catch (error) {
      console.error('❌ Mermaid直接渲染错误:', error);
    }
  }

  console.log('🎯 Mermaid初始化完成');
}

// 确保在页面加载后执行
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initMermaid, 100);
  });
} else {
  setTimeout(initMermaid, 100);
}