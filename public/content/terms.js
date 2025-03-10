
// Terms management functionality

(function() {
  // Create namespace for our extension if it doesn't exist
  window.techLingo = window.techLingo || {};
  
  // Flag to prevent multiple initializations
  let isInitialized = false;
  
  /**
   * Get terms from storage
   * @returns {Promise<Array>} Array of tech terms
   */
  function getTermsFromStorage() {
    return new Promise((resolve) => {
      if (chrome.storage && chrome.storage.local) {
        try {
          chrome.storage.local.get(['techTerms'], (result) => {
            if (result && result.techTerms) {
              console.log('TechLingo Wiki: Loaded', result.techTerms.length, 'terms from storage');
              resolve(result.techTerms);
            } else {
              console.log('TechLingo Wiki: No terms found in storage');
              resolve([]);
            }
          });
        } catch (error) {
          console.error('TechLingo Wiki: Error loading terms from storage', error);
          resolve([]);
        }
      } else {
        console.log('TechLingo Wiki: Storage API not available');
        resolve([]);
      }
    });
  }

  /**
   * Initialize the terms functionality
   */
  function initialize() {
    if (isInitialized) return;
    
    console.log('TechLingo Wiki: Initializing terms module');
    
    // Load terms from storage on startup
    getTermsFromStorage().then(terms => {
      window.techLingo.cachedTerms = terms;
      console.log('TechLingo Wiki: Terms cache initialized with', terms.length, 'terms');
      
      // Dispatch event so other modules know terms are ready
      const event = new CustomEvent('techLingo:termsReady', { detail: { count: terms.length } });
      document.dispatchEvent(event);
    });
    
    isInitialized = true;
  }

  // Expose our functionality to the global TechLingo namespace
  window.techLingo.terms = {
    getTermsFromStorage,
    initialize
  };
  
  // Auto-initialize when loaded
  initialize();
})();
