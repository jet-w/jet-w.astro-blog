import { visit } from 'unist-util-visit';

export function remarkContainers() {
  return (tree, file) => {
    // Pre-process: Handle complete containers in a single paragraph
    // This handles cases like:
    // ::: tip
    // Content without blank lines
    // :::
    // Where the entire thing is parsed as one paragraph with text "::: tip\nContent\n:::"
    // Also handles paragraphs with mixed content (text + inline code, etc.)
    visit(tree, 'paragraph', (node, index, parent) => {
      if (!node.children || node.children.length === 0) return;

      const firstChild = node.children[0];
      const lastChild = node.children[node.children.length - 1];

      // First child must be text starting with :::
      if (firstChild.type !== 'text') return;
      // Last child must be text ending with :::
      if (lastChild.type !== 'text') return;

      const firstText = firstChild.value;
      const lastText = lastChild.value;

      // Check if first text starts with ::: type
      const startMatch = firstText.match(/^(:{3,})\s+(tip|note|warning|danger|info|details)([ \t]+[^\n]*)?\n?/);
      if (!startMatch) return;

      // Check if last text ends with :::
      const endMatch = lastText.match(/\n(:{3,})\s*$/);
      if (!endMatch) return;

      // Verify the closing colons match the opening
      const [, openColons, type, titlePart] = startMatch;
      const [, closeColons] = endMatch;
      if (openColons.length !== closeColons.length) return;

      const customTitle = titlePart ? titlePart.trim() : '';
      const title = customTitle || getDefaultTitle(type);

      // Create HTML wrapper
      let openingHTML, closingHTML;
      if (type === 'details') {
        openingHTML = `<details class="container-details custom-container" data-container-type="details">
<summary class="container-title">${title}</summary>
<div class="container-content">`;
        closingHTML = `</div>
</details>`;
      } else {
        openingHTML = `<div class="container-${type} custom-container" data-container-type="${type}">
<div class="container-title">${title}</div>
<div class="container-content">`;
        closingHTML = `</div>
</div>`;
      }

      // Extract content by modifying the first and last text nodes
      // Remove the ::: opening from first text
      const newFirstText = firstText.slice(startMatch[0].length);
      // Remove the ::: closing from last text
      const newLastText = lastText.slice(0, endMatch.index);

      // Build new content children
      const contentChildren = [];
      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];
        if (i === 0) {
          // First child - use trimmed text
          if (node.children.length === 1) {
            // Single text node - extract middle content
            const middleText = newFirstText.slice(0, newFirstText.length - (firstText.length - lastText.length) - endMatch[0].length);
            if (middleText.trim()) {
              contentChildren.push({ ...child, value: middleText.trim() });
            }
          } else if (newFirstText.trim()) {
            contentChildren.push({ ...child, value: newFirstText });
          }
        } else if (i === node.children.length - 1) {
          // Last child - use trimmed text
          if (newLastText.trim()) {
            contentChildren.push({ ...child, value: newLastText });
          }
        } else {
          // Middle children - keep as-is
          contentChildren.push({ ...child });
        }
      }

      // If no content, skip
      if (contentChildren.length === 0) return;

      // Replace with HTML nodes and content paragraph
      const htmlStartNode = { type: 'html', value: openingHTML };
      const contentParagraph = {
        type: 'paragraph',
        children: contentChildren
      };
      const htmlEndNode = { type: 'html', value: closingHTML };

      parent.children.splice(index, 1, htmlStartNode, contentParagraph, htmlEndNode);
      return index + 3;
    });

    // Pre-process: Extract ::: from text nodes where it appears at the end
    // This handles cases where ::: is on a new line but without a blank line separator
    // e.g., in list items: "- content\n:::" gets parsed as single text node

    // Helper function to extract trailing ::: from a text node
    function extractTrailingColons(textNode) {
      const text = textNode.value;
      const trailingMatch = text.match(/\n(:{3,})\s*$/);
      if (trailingMatch) {
        textNode.value = text.slice(0, trailingMatch.index);
        return trailingMatch[1];
      }
      return null;
    }

    // Process list items - ::: might be attached to last list item's text
    // We need to manually iterate because visit() doesn't handle tree modifications well
    function processLists(node, parent, index) {
      if (node.type === 'list' && node.children && node.children.length > 0) {
        // Check the last list item
        const lastItem = node.children[node.children.length - 1];
        if (lastItem.children && lastItem.children.length > 0) {
          // Find the last paragraph in the last list item
          const lastParagraph = lastItem.children[lastItem.children.length - 1];
          if (lastParagraph.type === 'paragraph' && lastParagraph.children) {
            // Check the last text node in that paragraph
            const lastText = lastParagraph.children[lastParagraph.children.length - 1];
            if (lastText.type === 'text') {
              const colons = extractTrailingColons(lastText);
              if (colons && parent) {
                // Create a new paragraph for the ::: after the list
                const closingParagraph = {
                  type: 'paragraph',
                  children: [{ type: 'text', value: colons }]
                };

                // Insert after the list
                parent.children.splice(index + 1, 0, closingParagraph);
                return true; // Indicate we modified the tree
              }
            }
          }
        }
      }

      // Recursively process children
      if (node.children) {
        for (let i = 0; i < node.children.length; i++) {
          if (processLists(node.children[i], node, i)) {
            // Tree was modified, need to re-check
            i++; // Skip the newly inserted node
          }
        }
      }
      return false;
    }
    processLists(tree, null, 0);

    // Process regular paragraphs - extract trailing ::: into separate paragraphs
    // Use a manual loop to handle tree modifications properly
    function processAllParagraphs(node) {
      if (!node.children) return;

      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];

        if (child.type === 'paragraph' && child.children && child.children.length > 0) {
          const lastChild = child.children[child.children.length - 1];
          if (lastChild.type === 'text') {
            const colons = extractTrailingColons(lastChild);
            if (colons) {
              // Create a new paragraph for the :::
              const closingParagraph = {
                type: 'paragraph',
                children: [{ type: 'text', value: colons }]
              };
              // Insert after the current paragraph
              node.children.splice(i + 1, 0, closingParagraph);
              i++; // Skip the newly inserted node
            }
          }
        }

        // Recursively process children (but not listItems - handled separately)
        if (child.type !== 'listItem') {
          processAllParagraphs(child);
        }
      }
    }
    processAllParagraphs(tree);

    // Process containers multiple times to handle nesting (innermost first)
    // Each pass processes containers that don't contain other unprocessed containers
    let maxPasses = 5; // Prevent infinite loops
    for (let pass = 0; pass < maxPasses; pass++) {
      let foundContainers = false;

      // Handle paragraph-based container syntax
      visit(tree, 'paragraph', (node, index, parent) => {
        if (!node.children || node.children.length === 0) return;

        const firstChild = node.children[0];
        if (firstChild.type !== 'text') return;

        const fullText = firstChild.value;

        // Check for container start: :::+ type [title]
        const startMatch = fullText.match(/^(:{3,}) (tip|note|warning|danger|info|details)([ \t]+[^\n]*)?$/m);
        if (startMatch) {
          const [, colons, type, titlePart] = startMatch;
          const colonCount = colons.length;
          const customTitle = titlePart ? titlePart.trim() : '';
          const title = customTitle || getDefaultTitle(type);

          // Find matching closing with exact same number of colons
          let endIndex = -1;
          const siblings = parent.children;
          let nestLevel = 0;
          let hasUnprocessedInner = false;

          for (let i = index + 1; i < siblings.length; i++) {
            const sibling = siblings[i];
            if (sibling.type === 'paragraph' &&
                sibling.children &&
                sibling.children.length > 0 &&
                sibling.children[0].type === 'text') {
              const text = sibling.children[0].value.trim();

              // Check for opening of inner container (fewer colons = more inner)
              const openMatch = text.match(/^(:{3,}) (tip|note|warning|danger|info|details)/);
              if (openMatch) {
                if (openMatch[1].length < colonCount) {
                  // This is an inner container that should be processed first
                  hasUnprocessedInner = true;
                } else if (openMatch[1].length === colonCount) {
                  nestLevel++;
                }
              }

              // Check for closing
              const closeMatch = text.match(/^(:{3,})$/);
              if (closeMatch) {
                if (closeMatch[1].length === colonCount) {
                  if (nestLevel === 0) {
                    endIndex = i;
                    break;
                  } else {
                    nestLevel--;
                  }
                }
              }
            }
          }

          // Skip this container if it has unprocessed inner containers
          if (hasUnprocessedInner) {
            return;
          }

          if (endIndex === -1) {
            return; // No matching close found
          }

          foundContainers = true;
          const contentNodes = siblings.slice(index + 1, endIndex);

          let openingHTML, closingHTML;
          if (type === 'details') {
            openingHTML = `<details class="container-details custom-container" data-container-type="details">
<summary class="container-title">${title}</summary>
<div class="container-content">`;
            closingHTML = `</div>
</details>`;
          } else {
            openingHTML = `<div class="container-${type} custom-container" data-container-type="${type}">
<div class="container-title">${title}</div>
<div class="container-content">`;
            closingHTML = `</div>
</div>`;
          }

          const htmlStartNode = { type: 'html', value: openingHTML };
          const htmlEndNode = { type: 'html', value: closingHTML };

          const replaceCount = endIndex - index + 1;
          const newNodes = [htmlStartNode, ...contentNodes, htmlEndNode];
          siblings.splice(index, replaceCount, ...newNodes);

          return index + newNodes.length;
        }
      });

      // Also process tabs containers in this pass
      visit(tree, 'paragraph', (node, index, parent) => {
        if (!node.children || node.children.length === 0) return;

        const firstChild = node.children[0];
        if (firstChild.type !== 'text') return;

        const tabsMatch = firstChild.value.match(/^:{3,}\s*tabs\s*$/m);
        if (tabsMatch) {
          let endIndex = -1;
          const siblings = parent.children;

          for (let i = index + 1; i < siblings.length; i++) {
            const sibling = siblings[i];
            if (sibling.type === 'paragraph' &&
                sibling.children &&
                sibling.children.length > 0 &&
                sibling.children[0].type === 'text' &&
                /^:{3,}$/.test(sibling.children[0].value.trim())) {
              endIndex = i;
              break;
            }
          }

          if (endIndex === -1) {
            endIndex = siblings.length;
          }

          const contentNodes = siblings.slice(index + 1, endIndex);
          const openingHTML = '<div class="tabs-wrapper">';
          const closingHTML = '</div>';

          const replaceCount = endIndex - index + 1;
          const newNodes = [
            { type: 'html', value: openingHTML },
            ...contentNodes,
            { type: 'html', value: closingHTML }
          ];
          siblings.splice(index, replaceCount, ...newNodes);

          return index + newNodes.length;
        }
      });

      if (!foundContainers) {
        break; // No more containers to process
      }
    }

    // Handle containerDirective nodes created by remark-directive
    visit(tree, 'containerDirective', (node, index, parent) => {
      const type = node.name;
      if (!['tip', 'note', 'warning', 'danger', 'info', 'details'].includes(type)) {
        return;
      }

      // Debug: Log directive node
      if (process.env.DEBUG_CONTAINERS) {
        console.log('DEBUG containerDirective:', type, 'children:', node.children?.length || 0, JSON.stringify(node.children?.map(c => c.type)));
      }

      // Get custom title from directive label (text after ::: type on same line)
      let customTitle = '';
      if (node.data && node.data.directiveLabel) {
        customTitle = node.data.directiveLabel;
      }

      const title = customTitle || getDefaultTitle(type);

      // Create HTML wrapper - use <details>/<summary> for details type
      let openingHTML, closingHTML;
      if (type === 'details') {
        openingHTML = `<details class="container-details custom-container" data-container-type="details">
<summary class="container-title">${title}</summary>
<div class="container-content">`;
        closingHTML = `</div>
</details>`;
      } else {
        openingHTML = `<div class="container-${type} custom-container" data-container-type="${type}">
<div class="container-title">${title}</div>
<div class="container-content">`;
        closingHTML = `</div>
</div>`;
      }

      const htmlStartNode = { type: 'html', value: openingHTML };
      const htmlEndNode = { type: 'html', value: closingHTML };

      const newNodes = [htmlStartNode, ...node.children, htmlEndNode];
      parent.children.splice(index, 1, ...newNodes);

      return index + newNodes.length;
    });

    // Handle leafDirective nodes (single-line directives)
    visit(tree, 'leafDirective', (node, index, parent) => {
      const type = node.name;
      if (!['tip', 'note', 'warning', 'danger', 'info', 'details'].includes(type)) {
        return;
      }

      let customTitle = '';
      if (node.data && node.data.directiveLabel) {
        customTitle = node.data.directiveLabel;
      }

      const title = customTitle || getDefaultTitle(type);

      // Create HTML wrapper - use <details>/<summary> for details type
      let openingHTML, closingHTML;
      if (type === 'details') {
        openingHTML = `<details class="container-details custom-container" data-container-type="details">
<summary class="container-title">${title}</summary>
<div class="container-content">`;
        closingHTML = `</div>
</details>`;
      } else {
        openingHTML = `<div class="container-${type} custom-container" data-container-type="${type}">
<div class="container-title">${title}</div>
<div class="container-content">`;
        closingHTML = `</div>
</div>`;
      }

      const htmlStartNode = { type: 'html', value: openingHTML };
      const htmlEndNode = { type: 'html', value: closingHTML };

      const newNodes = [htmlStartNode, ...node.children, htmlEndNode];
      parent.children.splice(index, 1, ...newNodes);

      return index + newNodes.length;
    });

  };
}

function getDefaultTitle(containerType) {
  // Return the container type with first letter capitalized
  return containerType.charAt(0).toUpperCase() + containerType.slice(1);
}
