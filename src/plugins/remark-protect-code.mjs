/**
 * Remark plugin to protect code blocks from directive processing
 * This plugin runs BEFORE other plugins to replace ::: in code blocks
 * with a placeholder, then a rehype plugin restores them after processing
 */

// Unique placeholder that won't appear in normal content
const COLON_PLACEHOLDER = '___TRIPLE_COLON___';

export function remarkProtectCode() {
  return (tree) => {
    // Visit all code nodes and replace ::: with placeholder
    visitCode(tree);
  };
}

function visitCode(node) {
  if (node.type === 'code' && node.value) {
    // Replace all ::: patterns in code blocks with placeholder
    node.value = node.value.replace(/:::/g, COLON_PLACEHOLDER);
  }

  // Recursively visit children
  if (node.children) {
    for (const child of node.children) {
      visitCode(child);
    }
  }
}

/**
 * Rehype plugin to restore ::: in code blocks after directive processing
 */
export function rehypeRestoreCode() {
  return (tree) => {
    visitElement(tree);
  };
}

function visitElement(node) {
  // Handle text nodes
  if (node.type === 'text' && node.value) {
    node.value = node.value.replace(new RegExp(COLON_PLACEHOLDER, 'g'), ':::');
  }

  // Handle raw HTML nodes
  if (node.type === 'raw' && node.value) {
    node.value = node.value.replace(new RegExp(COLON_PLACEHOLDER, 'g'), ':::');
  }

  // Handle element nodes with properties (like code elements)
  if (node.type === 'element') {
    // Check for text content in code elements
    if (node.children) {
      for (const child of node.children) {
        visitElement(child);
      }
    }
  }

  // Recursively visit children
  if (node.children) {
    for (const child of node.children) {
      visitElement(child);
    }
  }
}

export { COLON_PLACEHOLDER };
