import { visit } from 'unist-util-visit';

export function rehypeCleanContainers() {
  return (tree) => {
    visit(tree, 'text', (node, index, parent) => {
      if (node.value && typeof node.value === 'string') {
        // 清理文本中的容器标记残留
        if (node.value.trim() === ':::') {
          // 如果这个文本节点只包含 :::，移除它
          parent.children.splice(index, 1);
          return index;
        }
        if (node.value.includes(':::')) {
          // 清理包含 ::: 的文本
          node.value = node.value.replace(/:::\s*$/, '').replace(/^\s*:::/, '');
          if (node.value.trim() === '') {
            parent.children.splice(index, 1);
            return index;
          }
        }
      }
    });
  };
}