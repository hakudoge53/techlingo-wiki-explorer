
// Terms management functionality

/**
 * Get terms from storage
 * @returns {Promise<Array>} Array of tech terms
 */
export function getTermsFromStorage() {
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
