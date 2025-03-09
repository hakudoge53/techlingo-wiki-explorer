// Main module for content script functionality

(function() {
  // Create namespace for our extension if it doesn't exist
  window.techLingo = window.techLingo || {};
  
  // Configuration
  let config = {
    highlightEnabled: false,
    termsLoaded: false,
    terms: []
  };

  // Initialize when DOM is fully loaded
  function initialize() {
    console.log('TechLingo Wiki: Initializing content script');
    
    // Get highlighting preference
    if (chrome.storage && chrome.storage.sync) {
      chrome.storage.sync.get(['highlightEnabled'], (result) => {
        config.highlightEnabled = result.highlightEnabled || false;
        console.log('TechLingo Wiki: Highlight setting loaded', config.highlightEnabled);
        
        // Load terms and start processing if highlighting is enabled
        loadTermsAndProcess();
      });
    }

    // Listen for toggle events from the extension popup
    document.addEventListener('techLingo.toggleHighlight', (event) => {
      config.highlightEnabled = event.detail.enabled;
      console.log('TechLingo Wiki: Highlight setting updated', config.highlightEnabled);
      
      if (config.highlightEnabled) {
        // If terms aren't loaded yet, load them now
        if (!config.termsLoaded) {
          loadTermsAndProcess();
        } else {
          // Otherwise just process the page with existing terms
          processPage();
        }
      } else {
        // If highlighting is disabled, remove all existing highlights
        if (window.techLingo.highlight) {
          window.techLingo.highlight.removeAllHighlights();
        }
      }
    });
  }

  // Load terms and process the page
  function loadTermsAndProcess() {
    if (window.techLingo.terms && window.techLingo.terms.getTermsFromStorage) {
      window.techLingo.terms.getTermsFromStorage().then(terms => {
        if (terms && terms.length > 0) {
          config.terms = terms;
          config.termsLoaded = true;
          console.log('TechLingo Wiki: Loaded', terms.length, 'terms');
          
          if (config.highlightEnabled) {
            processPage();
          }
        } else {
          console.log('TechLingo Wiki: No terms found in storage');
        }
      });
    } else {
      console.error('TechLingo Wiki: Terms module not loaded properly');
    }
  }

  // Process the current page
  function processPage() {
    if (!config.highlightEnabled || !config.termsLoaded) {
      return;
    }

    console.log('TechLingo Wiki: Processing page for term highlighting');
    
    // Process the current DOM
    if (window.techLingo.highlight && window.techLingo.highlight.highlightTermsInNode) {
      window.techLingo.highlight.highlightTermsInNode(document.body, config.terms);
      
      // Set up observer for dynamic content
      if (window.techLingo.observer && window.techLingo.observer.setupMutationObserver) {
        window.techLingo.observer.setupMutationObserver(
          config.highlightEnabled,
          (node) => window.techLingo.highlight.highlightTermsInNode(node, config.terms)
        );
      }
    }
  }

  // Initialize when the DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }

  // Expose our public API
  window.techLingo.main = {
    initialize,
    processPage
  };
})();
