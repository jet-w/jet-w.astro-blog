// 简单的mermaid渲染脚本，不使用ES模块
(function() {
    console.log('🎯 Simple Mermaid: 初始化开始');

    // 检查mermaid是否已经加载
    function waitForMermaid() {
        if (window.mermaid) {
            console.log('✅ Mermaid库已加载');
            initializeMermaid();
        } else {
            console.log('⏳ 等待Mermaid库加载...');
            setTimeout(waitForMermaid, 100);
        }
    }

    function initializeMermaid() {
        window.mermaid.initialize({
            startOnLoad: false,
            theme: 'default',
            securityLevel: 'loose'
        });

        processMermaidBlocks();
    }

    function processMermaidBlocks() {
        console.log('🎯 开始处理mermaid代码块');

        // 查找所有mermaid代码块
        const codeBlocks = document.querySelectorAll('pre code[data-language="mermaid"], pre code.language-mermaid');
        console.log(`🎯 找到 ${codeBlocks.length} 个mermaid代码块`);

        codeBlocks.forEach(async (codeBlock, index) => {
            try {
                let mermaidCode = codeBlock.textContent.trim();
                console.log(`🎯 处理第${index+1}个代码块:`, mermaidCode.substring(0, 50));

                // 移除%%mermaid标记（如果存在）
                if (mermaidCode.startsWith('%%mermaid')) {
                    mermaidCode = mermaidCode.substring('%%mermaid'.length).trim();
                    console.log('🎯 移除%%mermaid标记后:', mermaidCode.substring(0, 50));
                }

                const id = `mermaid-simple-${index}-${Date.now()}`;

                // 使用mermaid.render方法
                const { svg } = await window.mermaid.render(id, mermaidCode);

                // 创建容器
                const container = document.createElement('div');
                container.className = 'mermaid-container';
                container.style.cssText = 'margin: 1.5rem 0; padding: 1rem; border: 1px solid #e2e8f0; border-radius: 0.5rem; background: white;';
                container.innerHTML = svg;

                // 替换原始代码块
                const preElement = codeBlock.closest('pre');
                if (preElement && preElement.parentNode) {
                    preElement.parentNode.insertBefore(container, preElement);
                    preElement.style.display = 'none';
                    console.log(`✅ 第${index+1}个图表渲染成功`);
                }
            } catch (error) {
                console.error(`❌ 渲染第${index+1}个图表时出错:`, error);
            }
        });

        console.log('🎯 Mermaid处理完成');
    }

    // 加载mermaid库
    function loadMermaid() {
        console.log('📥 开始加载Mermaid库');
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js';
        script.onload = function() {
            console.log('✅ Mermaid库加载完成');
            waitForMermaid();
        };
        script.onerror = function() {
            console.error('❌ Mermaid库加载失败');
        };
        document.head.appendChild(script);
    }

    // 启动函数
    function start() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', loadMermaid);
        } else {
            loadMermaid();
        }
    }

    start();
})();