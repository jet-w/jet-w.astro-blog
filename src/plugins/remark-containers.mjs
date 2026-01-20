import { visit } from 'unist-util-visit';

export function remarkContainers() {
  return (tree, file) => {

    // 首先检查是否有多行容器语法（开始和结束在同一段落）
    visit(tree, 'paragraph', (node, index, parent) => {
      if (!node.children || node.children.length === 0) return;

      const firstChild = node.children[0];
      if (firstChild.type !== 'text') return;

      const fullText = firstChild.value;

      // 检查是否是完整的容器语法在同一段落中（包括可能有格式化内容的情况）
      const containerStartMatch = fullText.match(/^::: (tip|note|warning|danger|info|details)\s*(.*?)(?:\n|$)/);
      if (containerStartMatch) {
        // 检查最后一个子节点是否包含结束标记
        const lastChild = node.children[node.children.length - 1];
        const hasClosingInSameParagraph = lastChild.type === 'text' &&
          (lastChild.value.endsWith(':::') || lastChild.value.match(/\n:::[\s]*$/));

        if (hasClosingInSameParagraph) {
          // 整个容器在同一个段落中，包含格式化内容
          const [, type, titlePart] = containerStartMatch;
          const customTitle = titlePart ? titlePart.trim() : '';
          const title = customTitle || getDefaultTitle(type);

          // 构建内容节点数组
          let contentChildren = [];

          if (node.children.length === 1) {
            // 只有一个子节点：移除开始标记和结束标记，保留中间内容
            let content = fullText
              .replace(/^::: (tip|note|warning|danger|info|details)\s*(.*?)(?:\n|$)/, '')  // 移除开始标记
              .replace(/\n?:::[\s]*$/, '');  // 移除结束标记
            if (content) {
              contentChildren.push({ type: 'text', value: content });
            }
          } else {
            // 多个子节点：第一个和最后一个是 text，中间可能有 strong/emphasis 等
            // 提取第一个 text 节点中开始标记之后的内容
            const firstTextContent = fullText.replace(/^::: (tip|note|warning|danger|info|details)\s*(.*?)(?:\n|$)/, '');
            if (firstTextContent) {
              contentChildren.push({ type: 'text', value: firstTextContent });
            }

            // 添加中间的所有节点（strong、emphasis 等）
            for (let i = 1; i < node.children.length - 1; i++) {
              contentChildren.push(JSON.parse(JSON.stringify(node.children[i])));
            }

            // 移除最后一个 text 节点中的结束标记
            let lastTextContent = lastChild.value.replace(/\n?:::[\s]*$/, '');
            if (lastTextContent) {
              contentChildren.push({ type: 'text', value: lastTextContent });
            }
          }

          // 创建 HTML 开始标签
          const openingHTML = `<div class="container-${type} custom-container" data-container-type="${type}">
<div class="container-title">${title}</div>
<div class="container-content">`;

          const closingHTML = `</div>
</div>`;

          const htmlStartNode = { type: 'html', value: openingHTML };
          const htmlEndNode = { type: 'html', value: closingHTML };

          // 如果有内容，创建段落节点
          let newNodes = [htmlStartNode];
          if (contentChildren.length > 0) {
            newNodes.push({
              type: 'paragraph',
              children: contentChildren
            });
          }
          newNodes.push(htmlEndNode);

          // 替换当前段落
          parent.children.splice(index, 1, ...newNodes);
          return index + newNodes.length;
        }
      }

      // 旧的简单情况：纯文本容器（无格式化）在同一段落
      const completeContainerMatch = fullText.match(/^::: (tip|note|warning|danger|info|details)([^]*?):::$/s);
      if (completeContainerMatch) {
        const [, type, content] = completeContainerMatch;
        const lines = content.trim().split('\n');
        const customTitle = lines.length > 0 ? lines[0].trim() : '';
        const title = customTitle || getDefaultTitle(type);

        // 内容是第一行之后的所有内容
        const contentText = lines.slice(1).join('\n').trim();

        // 创建HTML容器
        const htmlContent = `<div class="container-${type} custom-container" data-container-type="${type}">
<div class="container-title">${title}</div>
<div class="container-content">
<p>${contentText.replace(/\n/g, '</p>\n<p>')}</p>
</div>
</div>`;

        const htmlNode = {
          type: 'html',
          value: htmlContent
        };

        // 替换当前段落
        parent.children[index] = htmlNode;
        return;
      }

      // 检查是否是 tabs 容器开始语法（支持 :::tabs 和 ::: tabs）
      const tabsMatch = firstChild.value.match(/^:::\s*tabs\s*$/m);
      if (tabsMatch) {
        // 寻找 tabs 结束标记
        let endIndex = -1;
        const siblings = parent.children;

        for (let i = index + 1; i < siblings.length; i++) {
          const sibling = siblings[i];
          if (sibling.type === 'paragraph' &&
              sibling.children &&
              sibling.children.length > 0 &&
              sibling.children[0].type === 'text' &&
              sibling.children[0].value.trim() === ':::') {
            endIndex = i;
            break;
          }
        }

        if (endIndex === -1) {
          endIndex = siblings.length;
        }

        // 收集中间的内容
        const contentNodes = siblings.slice(index + 1, endIndex);

        // 创建 tabs 包装器
        const openingHTML = '<div class="tabs-wrapper">';
        const closingHTML = '</div>';

        const htmlNode = {
          type: 'html',
          value: openingHTML
        };

        const closeNode = {
          type: 'html',
          value: closingHTML
        };

        // 替换节点
        const replaceCount = endIndex - index + 1; // +1 包含结束标记
        const newNodes = [htmlNode, ...contentNodes, closeNode];
        siblings.splice(index, replaceCount, ...newNodes);

        return index + newNodes.length;
      }

      // 检查是否匹配容器开始语法（支持标题后直接跟内容，无需空行）
      const containerMatch = firstChild.value.match(/^::: (tip|note|warning|danger|info|details)(.*)$/m);
      if (containerMatch) {
        const [matchedLine, type, titlePart] = containerMatch;
        const customTitle = titlePart ? titlePart.trim() : '';
        const title = customTitle || getDefaultTitle(type);

        // 检查是否标题行后面还有内容（无空行的情况）
        const fullValue = firstChild.value;
        const matchEnd = fullValue.indexOf(matchedLine) + matchedLine.length;
        const remainingContent = fullValue.slice(matchEnd).replace(/^\n/, ''); // 移除开头的换行符

        // 检查是否这个段落只包含开始标签
        const isOnlyStartTag = remainingContent.trim() === '' &&
                              (fullValue.trim() === `:::${type}${titlePart}`.trim() ||
                               fullValue.trim() === `::: ${type}${titlePart}`.trim() ||
                               fullValue.trim() === `::: ${type} ${titlePart}`.trim());

        // 寻找结束标记
        let endIndex = -1;
        const siblings = parent.children;

        // 如果是独立的开始标签，跳过紧接着的空段落
        let searchStart = index + 1;
        if (isOnlyStartTag && searchStart < siblings.length) {
          const nextNode = siblings[searchStart];
          // 如果下一个节点是空段落，跳过它
          if (nextNode.type === 'paragraph' &&
              (!nextNode.children || nextNode.children.length === 0 ||
               (nextNode.children.length === 1 &&
                nextNode.children[0].type === 'text' &&
                nextNode.children[0].value.trim() === ''))) {
            searchStart++;
          }
        }

        // 用于存储开始段落中的剩余内容（无空行情况）
        let inlineContentNodes = [];
        if (!isOnlyStartTag) {
          // 标题行后面直接有内容，需要处理这部分内容
          // 创建内容节点的副本，避免修改原始节点
          let contentChildren = [];

          // 处理第一个文本节点，移除开始标记（只移除第一行的 ::: type title）
          const trimmedRemaining = remainingContent.replace(/^\n/, ''); // 移除开头的换行符
          if (trimmedRemaining !== '') {
            contentChildren.push({ type: 'text', value: trimmedRemaining });
          }

          // 复制其他子节点（strong、emphasis 等）
          for (let i = 1; i < node.children.length; i++) {
            contentChildren.push(JSON.parse(JSON.stringify(node.children[i])));
          }

          // 检查最后一个子节点是否包含结束标记
          let hasClosingTag = false;
          if (contentChildren.length > 0) {
            const lastChild = contentChildren[contentChildren.length - 1];
            if (lastChild.type === 'text') {
              const closingMatch = lastChild.value.match(/([\s\S]*?)\n:::(\s*)$/) ||
                                   lastChild.value.match(/([\s\S]*?):::(\s*)$/);
              if (closingMatch) {
                lastChild.value = closingMatch[1].trimEnd();
                hasClosingTag = true;
                // 如果最后一个文本节点变空了，移除它
                if (!lastChild.value) {
                  contentChildren.pop();
                }
              }
            }
          }

          // 如果有内容，创建段落节点
          if (contentChildren.length > 0) {
            inlineContentNodes.push({
              type: 'paragraph',
              children: contentChildren
            });
          }

          if (hasClosingTag) {
            // 找到了结束标记，不需要继续搜索
            endIndex = index + 1;
          }
        }

        // 如果还没找到结束标记，继续搜索后续节点
        if (endIndex === -1) {
          for (let i = searchStart; i < siblings.length; i++) {
            const sibling = siblings[i];

            // 检查段落类型中是否有结束标记
            if (sibling.type === 'paragraph' &&
                sibling.children &&
                sibling.children.length > 0) {

              // 检查第一个子节点是否是独立的结束标记
              const firstChild = sibling.children[0];
              if (firstChild.type === 'text' && firstChild.value.trim() === ':::') {
                endIndex = i;
                break;
              }

              // 检查最后一个子节点是否包含结束标记
              const lastChild = sibling.children[sibling.children.length - 1];
              if (lastChild.type === 'text') {
                const textValue = lastChild.value;

                // 检查是否包含结束标记（可能在行末，如 "内容\n:::" 或直接 ":::"）
                const closingMatch = textValue.match(/([\s\S]*?)\n:::(\s*)$/) ||
                                     textValue.match(/([\s\S]*?):::(\s*)$/);
                if (closingMatch) {
                  const contentBefore = closingMatch[1].trimEnd();

                  if (contentBefore || sibling.children.length > 1) {
                    // 保留结束标记前的内容
                    lastChild.value = contentBefore;
                    endIndex = i + 1; // 包含这个段落（作为内容的一部分）
                  } else {
                    // 没有内容在结束标记前，这是一个独立的结束标记
                    endIndex = i;
                  }
                  break;
                }
              }

              // 也检查第一个子节点是否以容器开始语法开头（但不是结束标记）
              if (firstChild.type === 'text') {
                const closingMatch = firstChild.value.match(/^([\s\S]*?)\n:::(\s*)$/) ||
                                     firstChild.value.match(/^([\s\S]+?):::(\s*)$/);
                if (closingMatch) {
                  const contentBefore = closingMatch[1].trim();
                  if (contentBefore) {
                    firstChild.value = contentBefore;
                    endIndex = i + 1;
                  } else {
                    endIndex = i;
                  }
                  break;
                }
              }
            }

            // 检查列表中是否包含结束标记
            if (sibling.type === 'list') {
              let foundClosing = false;

              // 遍历列表项查找结束标记
              for (let itemIdx = 0; itemIdx < sibling.children.length; itemIdx++) {
                const listItem = sibling.children[itemIdx];
                if (!listItem.children) continue;

                for (let paraIdx = 0; paraIdx < listItem.children.length; paraIdx++) {
                  const para = listItem.children[paraIdx];
                  if (para.type === 'paragraph' && para.children) {
                    for (let textIdx = 0; textIdx < para.children.length; textIdx++) {
                      const textNode = para.children[textIdx];
                      if (textNode.type === 'text' && textNode.value) {
                        // 检查文本是否包含结束标记（支持 \n::: 或直接 :::）
                        const closingMatch = textNode.value.match(/^([\s\S]*?)\n:::(\s*)$/) ||
                                             textNode.value.match(/^([\s\S]*?):::(\s*)$/);
                        if (closingMatch) {
                          const contentBefore = closingMatch[1].trimEnd();
                          textNode.value = contentBefore;
                          endIndex = i + 1; // 包含这个列表
                          foundClosing = true;
                          break;
                        }
                      }
                    }
                    if (foundClosing) break;
                  }
                }
                if (foundClosing) break;
              }
              if (foundClosing) break;
            }
          }
        }

        if (endIndex === -1) {
          // 如果找不到结束标记，找到下一个容器或者文档末尾
          for (let i = index + 1; i < siblings.length; i++) {
            const sibling = siblings[i];
            if (sibling.type === 'paragraph' &&
                sibling.children &&
                sibling.children[0] &&
                sibling.children[0].type === 'text' &&
                sibling.children[0].value.match(/^::: (tip|note|warning|danger|info|details)/)) {
              endIndex = i;
              break;
            }
          }

          // 如果还是没找到，就到文档末尾
          if (endIndex === -1) {
            endIndex = siblings.length;
          }
        }

        // 收集中间的内容，从正确的起始位置开始
        const contentNodes = [...inlineContentNodes, ...siblings.slice(searchStart, endIndex)];

        // 创建HTML容器
        const openingHTML = `<div class="container-${type} custom-container" data-container-type="${type}">
<div class="container-title">${title}</div>
<div class="container-content">`;

        const closingHTML = `</div>
</div>`;

        const htmlNode = {
          type: 'html',
          value: openingHTML
        };

        const closeNode = {
          type: 'html',
          value: closingHTML
        };

        // 替换节点 - 需要考虑可能跳过的空段落
        const replaceCount = endIndex - index;
        const newNodes = [htmlNode, ...contentNodes, closeNode];
        siblings.splice(index, replaceCount, ...newNodes);

        return index + newNodes.length;
      }
    });
  };
}

function getDefaultTitle(containerType) {
  const titles = {
    tip: '💡 提示',
    note: '📝 注意',
    warning: '⚠️ 警告',
    danger: '🚨 危险',
    info: 'ℹ️ 信息',
    details: '📋 详情'
  };

  return titles[containerType] || containerType.toUpperCase();
}
