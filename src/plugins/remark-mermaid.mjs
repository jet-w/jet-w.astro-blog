import { visit } from 'unist-util-visit';

// Placeholder used by remark-protect-code plugin
const COLON_PLACEHOLDER = '___TRIPLE_COLON___';

export function remarkMermaid() {
  return (tree) => {
    visit(tree, 'code', (node, index, parent) => {
      const cleanLang = node.lang ? node.lang.trim().toLowerCase() : '';
      if (cleanLang === 'mermaid') {
        // Restore ::: that was replaced by remark-protect-code before Base64 encoding
        const mermaidCode = node.value.trim().replace(new RegExp(COLON_PLACEHOLDER, 'g'), ':::');
        const id = `mermaid-${Math.random().toString(36).slice(2, 11)}`;

        const htmlContent = `<div class="mermaid-container" data-mermaid-source="${escapeBase64(mermaidCode)}" data-id="${id}">
<div class="mermaid-loading">🔄 正在渲染 Mermaid 图表...</div>
<pre class="mermaid-fallback" style="display: none;"><code data-language="mermaid">${escapeHtml(mermaidCode)}</code></pre>
</div>`;

        parent.children[index] = {
          type: 'html',
          value: htmlContent
        };
      }
    });
  };
}

// 辅助函数：HTML 转义
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

// 辅助函数：Base64 编码（用于存储 mermaid 代码）
function escapeBase64(text) {
  try {
    // 在 Node.js 环境中
    return Buffer.from(text).toString('base64');
  } catch (e) {
    // 在浏览器环境中（虽然这个插件在服务端运行）
    return btoa(text);
  }
}