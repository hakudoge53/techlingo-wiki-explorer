
/**
 * Main content script for TechLingo Wiki extension
 */

import { highlightText, removeHighlights } from './highlight.js';
import { getTerms } from './terms.js';
import { setupObserver } from './observer.js';

// State for the extension
let highlightEnabled = false;
let observer = null;

// Function to highlight terms on the page
async function highlightTermsOnPage() {
  // Get the terms from storage
  const terms = await getTerms();
  
  // Highlight them on the page
  highlightText(document.body, terms);
}

// Initialize the extension
function initializeExtension() {
  // Load the user's preference
  chrome.storage.sync.get(['highlightEnabled'], (result) => {
    highlightEnabled = result.highlightEnabled || false;
    
    // If highlighting is enabled, run highlighting immediately
    if (highlightEnabled) {
      highlightTermsOnPage();
    }
    
    // Set up the observer to watch for DOM changes
    observer = setupObserver(highlightEnabled);
  });

  // Listen for messages from the popup
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'toggleHighlight') {
      highlightEnabled = message.enabled;
      
      if (highlightEnabled) {
        highlightTermsOnPage();
      } else {
        removeHighlights();
      }
    }
    sendResponse({ success: true });
    return true;
  });

  // Initial highlight on page load if enabled
  if (highlightEnabled) {
    // Wait for page content to fully load
    window.addEventListener('load', () => {
      highlightTermsOnPage();
    });
  }
}

// Initialize when the script loads
initializeExtension();

// Export for use in other modules
export { highlightTermsOnPage };
