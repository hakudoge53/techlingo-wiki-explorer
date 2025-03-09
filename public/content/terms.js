
// Terms management functionality

// Get terms from storage
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

export { getTermsFromStorage };
