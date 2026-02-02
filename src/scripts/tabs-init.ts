/**
 * Tabs Component Initialization
 * Handles tab switching and keyboard navigation
 */

// Extend Window interface for global switchTab function
declare global {
  interface Window {
    switchTab: (tabsId: string, tabIndex: number) => void;
  }
}

/**
 * Switch to a specific tab
 * @param tabsId - The data-tabs-id of the tabs container
 * @param tabIndex - The index of the tab to switch to
 */
function switchTab(tabsId: string, tabIndex: number): void {
  const tabsContainer = document.querySelector(`[data-tabs-id="${tabsId}"]`);
  if (!tabsContainer) return;

  // Update buttons
  const buttons = tabsContainer.querySelectorAll('.tab-button');
  buttons.forEach((btn, idx) => {
    if (idx === tabIndex) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Update panels
  const panels = tabsContainer.querySelectorAll('.tab-panel');
  panels.forEach((panel, idx) => {
    if (idx === tabIndex) {
      panel.classList.add('active');
    } else {
      panel.classList.remove('active');
    }
  });
}

/**
 * Initialize all tabs containers on the page
 */
function initializeTabs(): void {
  const tabContainers = document.querySelectorAll('.custom-tabs');

  tabContainers.forEach((container) => {
    // Ensure first tab is active by default
    const firstButton = container.querySelector('.tab-button');
    const firstPanel = container.querySelector('.tab-panel');

    if (firstButton && !container.querySelector('.tab-button.active')) {
      firstButton.classList.add('active');
    }

    if (firstPanel && !container.querySelector('.tab-panel.active')) {
      firstPanel.classList.add('active');
    }

    // Add keyboard navigation
    const buttons = container.querySelectorAll('.tab-button');
    buttons.forEach((button, index) => {
      button.addEventListener('keydown', (e: Event) => {
        const keyEvent = e as KeyboardEvent;
        let newIndex = index;

        if (keyEvent.key === 'ArrowRight' || keyEvent.key === 'ArrowDown') {
          keyEvent.preventDefault();
          newIndex = (index + 1) % buttons.length;
        } else if (keyEvent.key === 'ArrowLeft' || keyEvent.key === 'ArrowUp') {
          keyEvent.preventDefault();
          newIndex = (index - 1 + buttons.length) % buttons.length;
        } else if (keyEvent.key === 'Home') {
          keyEvent.preventDefault();
          newIndex = 0;
        } else if (keyEvent.key === 'End') {
          keyEvent.preventDefault();
          newIndex = buttons.length - 1;
        }

        if (newIndex !== index) {
          const tabsId = container.getAttribute('data-tabs-id');
          if (tabsId) {
            switchTab(tabsId, newIndex);
            (buttons[newIndex] as HTMLElement).focus();
          }
        }
      });
    });
  });
}

/**
 * Initialize Tabs functionality
 * Call this function on page load and Astro page transitions
 */
export function initTabs(): void {
  // Expose switchTab globally for onclick handlers
  window.switchTab = switchTab;
  initializeTabs();
}
