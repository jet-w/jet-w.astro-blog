import { visit } from 'unist-util-visit';

export function remarkContainers() {
  return (tree, file) => {
    // Pre-process: Handle containers that span across multiple sibling nodes
    // This handles cases like:
    // ::: tip Title
    // Content text here
    // - list item 1
    // - list item 2
    // :::
    // Where the container starts in one paragraph, has sibling nodes (lists, etc),
    // and the closing ::: may be in a later text node
    function processMultiNodeContainers(tree) {
      visit(tree, 'paragraph', (node, index, parent) => {
        if (!node.children || node.children.length === 0) return;
        if (!parent || !parent.children) return;

        const firstChild = node.children[0];
        if (firstChild.type !== 'text') return;

        const firstText = firstChild.value;

        // Check if first text starts with ::: type [title]
        // Allow content to follow on subsequent lines within this paragraph
        const startMatch = firstText.match(/^(:{3,})\s+(tip|note|warning|danger|info|details)([ \t]+[^\n]*)?\n?/);
        if (!startMatch) return;

        const [fullMatch, openColons, type, titlePart] = startMatch;
        const colonCount = openColons.length;
        const customTitle = titlePart ? titlePart.trim() : '';
        const title = customTitle || getDefaultTitle(type);

        // Now we need to find the closing ::: which could be:
        // 1. At the end of this same paragraph's text
        // 2. In a sibling paragraph
        // 3. Inside a text node in a list item (no blank line before :::)

        const siblings = parent.children;
        let endIndex = -1;
        let endNodeInfo = null; // { siblingIndex, childPath, closeMatch }

        // First check if closing is in the same paragraph
        const lastChild = node.children[node.children.length - 1];
        if (lastChild.type === 'text') {
          const closeInSame = lastChild.value.match(/\n(:{3,})\s*$/);
          if (closeInSame && closeInSame[1].length === colonCount) {
            // Closing is in the same paragraph - handle as single paragraph container
            endNodeInfo = { type: 'same-paragraph', closeMatch: closeInSame };
          }
        }

        if (!endNodeInfo) {
          // Search through siblings for the closing :::
          for (let i = index + 1; i < siblings.length; i++) {
            const sibling = siblings[i];

            // Check if sibling is a paragraph with just :::
            if (sibling.type === 'paragraph' &&
                sibling.children &&
                sibling.children.length === 1 &&
                sibling.children[0].type === 'text') {
              const text = sibling.children[0].value.trim();
              const closeMatch = text.match(/^(:{3,})$/);
              if (closeMatch && closeMatch[1].length === colonCount) {
                endIndex = i;
                endNodeInfo = { type: 'sibling-paragraph', siblingIndex: i };
                break;
              }
            }

            // Check if closing ::: is embedded in a text node (e.g., after a list item)
            // This happens when there's no blank line before :::
            if (sibling.type === 'list' && sibling.children) {
              // Check the last item of the list
              const lastItem = sibling.children[sibling.children.length - 1];
              if (lastItem.children) {
                const lastItemPara = lastItem.children[lastItem.children.length - 1];
                if (lastItemPara.type === 'paragraph' && lastItemPara.children) {
                  const lastText = lastItemPara.children[lastItemPara.children.length - 1];
                  if (lastText.type === 'text') {
                    const closeMatch = lastText.value.match(/\n(:{3,})\s*$/);
                    if (closeMatch && closeMatch[1].length === colonCount) {
                      endIndex = i;
                      endNodeInfo = {
                        type: 'in-list',
                        siblingIndex: i,
                        lastText: lastText,
                        closeMatch: closeMatch
                      };
                      break;
                    }
                  }
                }
              }
            }
          }
        }

        if (!endNodeInfo) return; // No closing found

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

        const htmlStartNode = { type: 'html', value: openingHTML };
        const htmlEndNode = { type: 'html', value: closingHTML };

        if (endNodeInfo.type === 'same-paragraph') {
          // Handle single paragraph container
          const lastChild = node.children[node.children.length - 1];
          const newFirstText = firstText.slice(fullMatch.length);
          const newLastText = lastChild.value.slice(0, endNodeInfo.closeMatch.index);

          const contentChildren = [];
          for (let i = 0; i < node.children.length; i++) {
            const child = node.children[i];
            if (i === 0) {
              if (node.children.length === 1) {
                // Single text node
                const middleText = newFirstText.slice(0, newFirstText.length - (firstText.length - lastChild.value.length) - endNodeInfo.closeMatch[0].length);
                if (middleText.trim()) {
                  contentChildren.push({ ...child, value: middleText.trim() });
                }
              } else if (newFirstText.trim()) {
                contentChildren.push({ ...child, value: newFirstText });
              }
            } else if (i === node.children.length - 1) {
              if (newLastText.trim()) {
                contentChildren.push({ ...child, value: newLastText });
              }
            } else {
              contentChildren.push({ ...child });
            }
          }

          if (contentChildren.length === 0) return;

          const contentParagraph = { type: 'paragraph', children: contentChildren };
          parent.children.splice(index, 1, htmlStartNode, contentParagraph, htmlEndNode);
          return index + 3;

        } else if (endNodeInfo.type === 'sibling-paragraph') {
          // Closing is in a sibling paragraph
          // Extract content from opening paragraph (after the ::: line)
          const newFirstText = firstText.slice(fullMatch.length);
          const contentNodes = [];

          // Add remaining content from opening paragraph if any
          if (newFirstText.trim() || node.children.length > 1) {
            const newParaChildren = [];
            if (newFirstText.trim()) {
              newParaChildren.push({ ...firstChild, value: newFirstText });
            }
            for (let i = 1; i < node.children.length; i++) {
              newParaChildren.push({ ...node.children[i] });
            }
            if (newParaChildren.length > 0) {
              contentNodes.push({ type: 'paragraph', children: newParaChildren });
            }
          }

          // Add all siblings between opening and closing
          for (let i = index + 1; i < endIndex; i++) {
            contentNodes.push(siblings[i]);
          }

          const replaceCount = endIndex - index + 1;
          const newNodes = [htmlStartNode, ...contentNodes, htmlEndNode];
          parent.children.splice(index, replaceCount, ...newNodes);
          return index + newNodes.length;

        } else if (endNodeInfo.type === 'in-list') {
          // Closing ::: is inside the last list item
          // Remove the closing from the text node
          endNodeInfo.lastText.value = endNodeInfo.lastText.value.slice(0, endNodeInfo.closeMatch.index);

          // Extract content from opening paragraph
          const newFirstText = firstText.slice(fullMatch.length);
          const contentNodes = [];

          if (newFirstText.trim() || node.children.length > 1) {
            const newParaChildren = [];
            if (newFirstText.trim()) {
              newParaChildren.push({ ...firstChild, value: newFirstText });
            }
            for (let i = 1; i < node.children.length; i++) {
              newParaChildren.push({ ...node.children[i] });
            }
            if (newParaChildren.length > 0) {
              contentNodes.push({ type: 'paragraph', children: newParaChildren });
            }
          }

          // Add all siblings including the list (which now has the ::: removed)
          for (let i = index + 1; i <= endIndex; i++) {
            contentNodes.push(siblings[i]);
          }

          const replaceCount = endIndex - index + 1;
          const newNodes = [htmlStartNode, ...contentNodes, htmlEndNode];
          parent.children.splice(index, replaceCount, ...newNodes);
          return index + newNodes.length;
        }
      });
    }

    // Run the multi-node container processor
    processMultiNodeContainers(tree);

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

      // Get custom title from directive label
      // remark-directive v4 may store label in different places:
      // 1. node.data.directiveLabel (standard location)
      // 2. node.children[0] as a paragraph with the label text
      let customTitle = '';
      let contentChildren = node.children || [];

      // Check node.data.directiveLabel first (standard remark-directive behavior)
      if (node.data && node.data.directiveLabel) {
        customTitle = node.data.directiveLabel;
      }
      // Check if first child is a paragraph that contains just the title text
      // This happens when label is on same line: ::: warning Title Here
      else if (contentChildren.length > 0) {
        const firstChild = contentChildren[0];
        // If first child is paragraph with single text node, it might be the title
        if (firstChild.type === 'paragraph' &&
            firstChild.children &&
            firstChild.children.length === 1 &&
            firstChild.children[0].type === 'text') {
          const text = firstChild.children[0].value.trim();
          // Check if this looks like a title (single line, no markdown formatting)
          // and the directive has more children (actual content)
          if (!text.includes('\n') && contentChildren.length > 1) {
            customTitle = text;
            contentChildren = contentChildren.slice(1); // Remove title from content
          }
        }
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

      const newNodes = [htmlStartNode, ...contentChildren, htmlEndNode];
      parent.children.splice(index, 1, ...newNodes);

      return index + newNodes.length;
    });

    // Handle leafDirective nodes (single-line directives)
    visit(tree, 'leafDirective', (node, index, parent) => {
      const type = node.name;
      if (!['tip', 'note', 'warning', 'danger', 'info', 'details'].includes(type)) {
        return;
      }

      // Get custom title from directive label
      let customTitle = '';
      let contentChildren = node.children || [];

      if (node.data && node.data.directiveLabel) {
        customTitle = node.data.directiveLabel;
      }
      // Check if first child is a text node that could be the title
      else if (contentChildren.length > 0) {
        const firstChild = contentChildren[0];
        if (firstChild.type === 'text') {
          const text = firstChild.value.trim();
          if (!text.includes('\n') && contentChildren.length > 1) {
            customTitle = text;
            contentChildren = contentChildren.slice(1);
          }
        }
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

      const newNodes = [htmlStartNode, ...contentChildren, htmlEndNode];
      parent.children.splice(index, 1, ...newNodes);

      return index + newNodes.length;
    });

  };
}

function getDefaultTitle(containerType) {
  // Return the container type with first letter capitalized
  return containerType.charAt(0).toUpperCase() + containerType.slice(1);
}
