
// Terms management functionality

(function() {
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
            resolve([]);
          }
        });
      } else {
        resolve([]);
      }
    });
  }

  // Expose our functionality to the global TechLingo namespace
  window.techLingoTerms = {
    getTermsFromStorage
  };
})();
