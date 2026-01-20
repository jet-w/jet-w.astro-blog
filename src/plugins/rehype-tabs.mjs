import { visit } from 'unist-util-visit';
import { toText } from 'hast-util-to-text';

/**
 * Rehype plugin to transform :::tabs containers into interactive tabs
 *
 * This works on the HTML AST after remark-directive has converted
 * :::tabs into <div> elements
 */
export function rehypeTabs() {
  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      if (!parent || index === undefined) return;

      // Look for divs that contain @tab markers (including tabs-wrapper from remark-containers)
      if (node.tagName !== 'div') return;

      // Check if this is a tabs-wrapper div
      const isTabsWrapper = node.properties?.className?.includes('tabs-wrapper');

      // Check if this div contains @tab paragraphs
      const children = node.children || [];
      const tabMarkers = [];

      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child.type === 'element' && child.tagName === 'p') {
          const text = getTextContent(child).trim();
          const tabMatch = text.match(/^@tab\s+(.+)$/);
          if (tabMatch) {
            tabMarkers.push({ index: i, title: tabMatch[1].trim() });
          }
        }
      }

      // If we found @tab markers, transform this into tabs
      if (tabMarkers.length === 0) return;

      // Generate unique ID
      const tabsId = `tabs-${Math.random().toString(36).substring(2, 11)}`;

      // Build tabs structure
      const tabsContent = [];

      for (let i = 0; i < tabMarkers.length; i++) {
        const startIdx = tabMarkers[i].index;
        const endIdx = i < tabMarkers.length - 1 ? tabMarkers[i + 1].index : children.length;

        // Collect content between this @tab and the next (excluding the @tab paragraph itself)
        const content = children.slice(startIdx + 1, endIdx);

        tabsContent.push({
          title: tabMarkers[i].title,
          content: content
        });
      }

      // Create new tabs structure
      const tabButtons = tabsContent.map((tab, idx) => ({
        type: 'element',
        tagName: 'button',
        properties: {
          className: idx === 0 ? ['tab-button', 'active'] : ['tab-button'],
          'data-tab-index': idx,
          onclick: `switchTab('${tabsId}', ${idx})`
        },
        children: [{ type: 'text', value: tab.title }]
      }));

      const tabPanels = tabsContent.map((tab, idx) => ({
        type: 'element',
        tagName: 'div',
        properties: {
          className: idx === 0 ? ['tab-panel', 'active'] : ['tab-panel'],
          'data-tab-panel': idx
        },
        children: tab.content
      }));

      // Build the tabs container
      const tabsContainer = {
        type: 'element',
        tagName: 'div',
        properties: {
          className: ['custom-tabs'],
          'data-tabs-id': tabsId
        },
        children: [
          {
            type: 'element',
            tagName: 'div',
            properties: { className: ['tabs-header'] },
            children: tabButtons
          },
          {
            type: 'element',
            tagName: 'div',
            properties: { className: ['tabs-content'] },
            children: tabPanels
          }
        ]
      };

      // Replace the original node
      parent.children[index] = tabsContainer;
    });
  };
}

function getTextContent(node) {
  if (node.type === 'text') return node.value || '';
  if (node.children) {
    return node.children.map(getTextContent).join('');
  }
  return '';
}
