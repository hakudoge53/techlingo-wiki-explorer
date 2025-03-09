
// Terms management functionality

(function() {
  // Create namespace for our extension if it doesn't exist
  window.techLingo = window.techLingo || {};
  
  /**
   * Get terms from storage
   * @returns {Promise<Array>} Array of tech terms
   */
  function getTermsFromStorage() {
    return new Promise((resolve) => {
      if (chrome.storage && chrome.storage.local) {
        chrome.storage.local.get(['techTerms'], (result) => {
          if (result.techTerms) {
            resolve(result.techTerms);
          } else {
            console.log('TechLingo Wiki: No terms found in storage');
            resolve([]);
          }
        });
      } else {
        console.log('TechLingo Wiki: Storage API not available');
        resolve([]);
      }
    });
  }

  // Expose our functionality to the global TechLingo namespace
  window.techLingo.terms = {
    getTermsFromStorage
  };
})();
