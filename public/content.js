
console.log('TechLingo Wiki content script loaded');

// Initialize highlighting options with default values
let highlightOptions = {
  enabled: true,
  color: '#9b87f5',
};

// Listen for messages from the extension popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Message received in content script:', message);
  
  if (message.action === 'updateHighlightSettings') {
    // Update highlight settings
    highlightOptions.enabled = message.settings.enabled;
    highlightOptions.color = message.settings.color;
    
    console.log('Updated highlight settings:', highlightOptions);
    
    // Apply or remove highlighting based on the new settings
    if (highlightOptions.enabled) {
      applyHighlighting();
    } else {
      removeHighlighting();
    }
    
    sendResponse({ success: true });
    return true;
  }
  
  // Legacy support for the old toggle action
  if (message.action === 'toggleHighlight') {
    highlightOptions.enabled = message.enabled;
    
    if (highlightOptions.enabled) {
      applyHighlighting();
    } else {
      removeHighlighting();
    }
    
    sendResponse({ success: true });
    return true;
  }
});

// Import and initialize the scripts from the content directory
try {
  importScripts(
    chrome.runtime.getURL('content/terms.js'),
    chrome.runtime.getURL('content/highlight.js'),
    chrome.runtime.getURL('content/observer.js'),
    chrome.runtime.getURL('content/main.js')
  );
  
  // Wait for the DOM to be fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeTechLingo);
  } else {
    initializeTechLingo();
  }
} catch (e) {
  console.error('TechLingo Wiki: Error loading scripts', e);
}

// Main initialization function
function initializeTechLingo() {
  console.log('TechLingo Wiki: Initializing');
  
  // Check if highlighting is enabled in the user settings
  if (highlightOptions.enabled) {
    applyHighlighting();
  }
  
  // Set up the mutation observer to watch for new content
  setupMutationObserver();
}

// Function to apply highlighting
function applyHighlighting() {
  console.log('Applying highlighting with color:', highlightOptions.color);
  
  try {
    // Get all text nodes in the document
    const textNodes = getTextNodes(document.body);
    
    // Highlight tech terms in the text nodes
    highlightTermsInNodes(textNodes, techTermsArray, highlightOptions.color);
  } catch (e) {
    console.error('TechLingo Wiki: Error applying highlighting', e);
  }
}

// Function to remove highlighting
function removeHighlighting() {
  console.log('Removing highlighting');
  
  try {
    // Get all tech term span elements
    const techTermSpans = document.querySelectorAll('.tech-term-highlight');
    
    // Remove each span by replacing it with its text content
    techTermSpans.forEach(span => {
      const textNode = document.createTextNode(span.textContent || '');
      span.parentNode?.replaceChild(textNode, span);
    });
  } catch (e) {
    console.error('TechLingo Wiki: Error removing highlighting', e);
  }
}
