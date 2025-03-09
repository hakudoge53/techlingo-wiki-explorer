
// DOM Observation functionality

(function() {
  // Create namespace for our extension if it doesn't exist
  window.techLingo = window.techLingo || {};
  
  let currentObserver = null;

  /**
   * Set up observer for dynamic content
   * @param {boolean} highlightEnabled - Whether highlighting is enabled
   * @param {Function} processNode - The node processing function
   * @returns {MutationObserver} The mutation observer
   */
  function setupMutationObserver(highlightEnabled, processNode) {
    // Disconnect any existing observer
    if (currentObserver) {
      currentObserver.disconnect();
    }

    // If highlighting is not enabled, don't observe
    if (!highlightEnabled) {
      return null;
    }

    // Create a new observer
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === 1) { // Element node
              processNode(node);
            }
          });
        }
      }
    });
    
    // Start observing
    observer.observe(document.body, { 
      childList: true, 
      subtree: true 
    });
    
    // Store the current observer
    currentObserver = observer;
    
    return observer;
  }

  // Expose our functionality to the global TechLingo namespace
  window.techLingo.observer = {
    setupMutationObserver
  };
})();
