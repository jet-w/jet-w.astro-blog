/**
 * Tabs component initialization script
 * Handles tab switching functionality
 */

// Global function for tab switching (called from onclick handlers)
window.switchTab = function(tabsId, tabIndex) {
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
};

// Initialize all tabs on page load
document.addEventListener('DOMContentLoaded', function() {
  initializeTabs();
});

// Re-initialize on Astro page navigation (for view transitions)
document.addEventListener('astro:page-load', function() {
  initializeTabs();
});

function initializeTabs() {
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
      button.addEventListener('keydown', (e) => {
        let newIndex = index;

        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          newIndex = (index + 1) % buttons.length;
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          newIndex = (index - 1 + buttons.length) % buttons.length;
        } else if (e.key === 'Home') {
          e.preventDefault();
          newIndex = 0;
        } else if (e.key === 'End') {
          e.preventDefault();
          newIndex = buttons.length - 1;
        }

        if (newIndex !== index) {
          const tabsId = container.getAttribute('data-tabs-id');
          window.switchTab(tabsId, newIndex);
          buttons[newIndex].focus();
        }
      });
    });
  });
}
