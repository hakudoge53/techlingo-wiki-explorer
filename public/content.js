
// This file serves as the entry point for the content script
// It initializes the main functionality from our modular structure

(function() {
  console.log('TechLingo Wiki content script initializing...');
  
  // Import functionality from modules
  function importScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = chrome.runtime.getURL(src);
      script.onload = () => {
        script.remove();
        resolve();
      };
      script.onerror = reject;
      (document.head || document.documentElement).appendChild(script);
    });
  }

  // Load our modules in sequence
  try {
    // Using dynamic script injection since ES modules aren't directly supported in content scripts
    const modules = [
      'content/highlight.js',
      'content/terms.js',
      'content/observer.js',
      'content/main.js'
    ];
    
    // Initialize extension when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initializeExtension);
    } else {
      initializeExtension();
    }
    
    function initializeExtension() {
      console.log('TechLingo Wiki content script initialized');
      
      // Set up message listeners for popup communication
      chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        console.log('Message received:', message);
        
        if (message.action === 'toggleHighlight') {
          // Toggle highlighting based on the message
          if (window.techLingo && window.techLingo.toggleHighlighting) {
            window.techLingo.toggleHighlighting(message.enabled);
            sendResponse({ success: true });
          } else {
            sendResponse({ success: false, error: 'Extension not fully initialized' });
          }
        }
        return true; // Keep the message channel open for async response
      });
      
      // Load user preference
      chrome.storage.sync.get(['highlightEnabled'], (result) => {
        const highlightEnabled = result.highlightEnabled || false;
        console.log('Highlight enabled:', highlightEnabled);
        
        // Initialize global namespace for our extension
        window.techLingo = window.techLingo || {};
        
        // Apply highlighting if enabled when preference is loaded
        if (highlightEnabled && window.techLingo.highlightTerms) {
          window.techLingo.highlightTerms();
        }
      });
    }
  } catch (error) {
    console.error('Error initializing TechLingo Wiki content script:', error);
  }
})();
