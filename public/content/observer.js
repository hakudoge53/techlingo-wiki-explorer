
/**
 * DOM observer to detect and highlight new content
 */

import { highlightTermsOnPage } from './main.js';

// Create and start the mutation observer
function setupObserver(highlightEnabled) {
  const observer = new MutationObserver((mutations) => {
    if (highlightEnabled) {
      mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === 1) { // Element node
              highlightTermsOnPage();
            }
          });
        }
      });
    }
  });

  // Start observing the document with the configured parameters
  observer.observe(document.body, { childList: true, subtree: true });
  
  return observer;
}

export { setupObserver };
