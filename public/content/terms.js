
(function() {
  // Create namespace for our extension
  window.techLingo = window.techLingo || {};
  
  // Terms data storage
  let techTerms = [];
  let highlightSettings = {
    enabled: true,
    color: '#9b87f5'
  };
  
  // Load terms and settings from storage
  function loadTermsAndSettings() {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.local.get(['techTerms', 'highlightSettings'], function(data) {
        if (data.techTerms) {
          techTerms = data.techTerms;
          console.log('Loaded terms:', techTerms.length);
        }
        
        if (data.highlightSettings) {
          highlightSettings = data.highlightSettings;
          console.log('Loaded highlight settings:', highlightSettings);
        }
        
        // Apply highlighting if enabled
        if (highlightSettings.enabled && techTerms.length > 0) {
          window.techLingo.highlight.processPage(techTerms, highlightSettings.color);
        }
      });
    }
  }
  
  // Listen for messages from extension
  function setupMessageListener() {
    if (typeof chrome !== 'undefined' && chrome.runtime) {
      chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
        console.log('Content script received message:', message);
        
        if (message.action === 'updateHighlightSettings') {
          highlightSettings = message.settings;
          
          if (highlightSettings.enabled) {
            // Re-highlight with new settings
            window.techLingo.highlight.processPage(techTerms, highlightSettings.color);
          } else {
            // Remove highlighting
            window.techLingo.highlight.removeAllHighlights();
          }
          
          // Save settings to storage
          if (chrome.storage) {
            chrome.storage.local.set({ highlightSettings: highlightSettings });
          }
          
          sendResponse({ success: true });
        } else if (message.action === 'toggleHighlight') {
          highlightSettings.enabled = message.enabled;
          
          if (highlightSettings.enabled) {
            window.techLingo.highlight.processPage(techTerms, highlightSettings.color);
          } else {
            window.techLingo.highlight.removeAllHighlights();
          }
          
          // Save settings to storage
          if (chrome.storage) {
            chrome.storage.local.set({ highlightSettings: highlightSettings });
          }
          
          sendResponse({ success: true });
        }
        
        return true; // Keep the message channel open for async responses
      });
    }
  }
  
  // Setup context menu functionality for right-click
  function setupContextMenu() {
    document.addEventListener('contextmenu', function(event) {
      const selection = window.getSelection();
      if (selection && selection.toString().trim()) {
        // Store the selected text temporarily
        if (typeof chrome !== 'undefined' && chrome.runtime) {
          chrome.runtime.sendMessage({
            action: 'lookupTerm',
            term: selection.toString().trim()
          });
        }
      }
    });
  }
  
  // Initialize everything
  function initialize() {
    loadTermsAndSettings();
    setupMessageListener();
    setupContextMenu();
  }
  
  // Make functions accessible to other scripts
  window.techLingo.terms = {
    initialize,
    getTerms: () => techTerms,
    getSettings: () => highlightSettings
  };
  
  // Initialize on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }
})();
