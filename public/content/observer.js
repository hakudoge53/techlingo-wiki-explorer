
// DOM Observation functionality

(function() {
  /**
   * Set up observer for dynamic content
   * @param {boolean} highlightEnabled - Whether highlighting is enabled
   * @param {Function} processNode - The node processing function
   * @returns {MutationObserver} The mutation observer
   */
  function setupMutationObserver(highlightEnabled, processNode) {
    const observer = new MutationObserver((mutations) => {
      if (highlightEnabled) {
        for (const mutation of mutations) {
          if (mutation.type === 'childList') {
            mutation.addedNodes.forEach(node => {
              if (node.nodeType === 1) { // Element node
                processNode(node);
              }
            });
          }
        }
      }
    });
    
    // Start observing
    observer.observe(document.body, { childList: true, subtree: true });
    
    return observer;
  }

  // Expose our functionality to the global TechLingo namespace
  window.techLingoObserver = {
    setupMutationObserver
  };
})();
