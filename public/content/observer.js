
(function() {
  // Create namespace for our extension
  window.techLingo = window.techLingo || {};
  
  // Mutation observer to detect DOM changes
  let observer = null;
  
  // Start observing DOM changes
  function startObserver() {
    if (observer) return; // Already observing
    
    observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach(function(node) {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const terms = window.techLingo.terms.getTerms();
              const settings = window.techLingo.terms.getSettings();
              
              if (settings.enabled && terms && terms.length > 0) {
                window.techLingo.highlight.processNode(node, terms, settings.color);
              }
            }
          });
        }
      });
    });
    
    // Start observing
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    console.log('TechLingo observer started');
  }
  
  // Stop observing DOM changes
  function stopObserver() {
    if (observer) {
      observer.disconnect();
      observer = null;
      console.log('TechLingo observer stopped');
    }
  }
  
  // Make functions accessible
  window.techLingo.observer = {
    startObserver,
    stopObserver
  };
})();
